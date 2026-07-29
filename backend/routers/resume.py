from fastapi import APIRouter, UploadFile, File
from llm import match_resume, generate_interview_questions
import fitz

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    pdf_bytes = await file.read()

    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    resume_text = ""

    for page in doc:
        resume_text += page.get_text()

    with open("jd.txt", "r", encoding="utf-8") as f:
        job_description = f.read()

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