from fastapi import APIRouter, UploadFile, File
from llm import match_resume, generate_interview_questions
from services.pdf_service import extract_text_from_pdf
from services.jd_service import load_job_description

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    pdf_bytes = await file.read()

    resume_text = extract_text_from_pdf(pdf_bytes)
    job_description = load_job_description()

    ats_result = match_resume(resume_text, job_description)
    interview_questions = generate_interview_questions(
        resume_text,
        job_description
    )

    return {
        "filename": file.filename,
        "ats_analysis": ats_result,
        "interview_questions": interview_questions
    }