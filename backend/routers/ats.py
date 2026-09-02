from fastapi import APIRouter
from routers.chat import get_documents
from services.ats_service import calculate_skills_analysis

router = APIRouter(tags=["ATS"])


@router.get("/skills-analysis")
def get_skills_analysis():
    resume_text, job_description = get_documents()
    return calculate_skills_analysis(resume_text, job_description)