from fastapi import APIRouter, Response, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from routers.chat import get_documents
from services.ats_service import calculate_skills_analysis
from services.llm_analysis import analyze_resume_feedback
from services.pdf_report_service import generate_pdf_report
from llm import generate_interview_questions

router = APIRouter(tags=["Report"])


class ReportPayload(BaseModel):
    skills_found: Optional[List[str]] = None
    missing_skills: Optional[List[str]] = None
    strengths: Optional[List[str]] = None
    areas_to_improve: Optional[List[str]] = None
    interview_questions: Optional[str] = None


@router.post("/download-report")
def download_report(payload: Optional[ReportPayload] = None):
    resume_text, job_description = get_documents()

    skills_found = payload.skills_found if payload and payload.skills_found is not None else []
    missing_skills = payload.missing_skills if payload and payload.missing_skills is not None else []
    strengths = payload.strengths if payload and payload.strengths is not None else []
    areas_to_improve = payload.areas_to_improve if payload and payload.areas_to_improve is not None else []
    interview_questions = payload.interview_questions if payload and payload.interview_questions is not None else ""

    # Fallback to computing from stored documents if empty
    if not skills_found and resume_text and job_description:
        skill_res = calculate_skills_analysis(resume_text, job_description)
        skills_found = skill_res.get("skills", [])
        missing_skills = skill_res.get("missing_skills", [])

    if not strengths and resume_text and job_description:
        fb = analyze_resume_feedback(resume_text, job_description)
        strengths = fb.get("strengths", [])
        areas_to_improve = fb.get("areas_to_improve", [])

    if not interview_questions and resume_text and job_description:
        interview_questions = generate_interview_questions(resume_text, job_description)

    pdf_bytes = generate_pdf_report(
        skills_found=skills_found,
        missing_skills=missing_skills,
        strengths=strengths,
        areas_to_improve=areas_to_improve,
        interview_questions=interview_questions
    )

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=AI_Placement_Analysis_Report.pdf"
        }
    )
