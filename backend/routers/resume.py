from fastapi import APIRouter, UploadFile, File, HTTPException
from llm import generate_interview_questions
from services.pdf_service import extract_text_from_pdf
from services.jd_upload_service import extract_jd_text
from services.ats_service import calculate_skills_analysis
from services.llm_analysis import analyze_resume_feedback
from routers.chat import set_documents

router = APIRouter(tags=["Resume"])


@router.post("/upload-resume")
async def upload_resume(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
    try:
        resume_bytes = await resume.read()
        jd_bytes = await jd.read()

        resume_text = extract_text_from_pdf(resume_bytes)
        job_description = extract_jd_text(jd_bytes)

        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract readable text from Resume PDF.")

        # Save uploaded documents into global memory context for chatbot & optimizer
        set_documents(resume_text, job_description)

        # Dynamic skill analysis (skills found & missing skills)
        skills_result = calculate_skills_analysis(resume_text, job_description)

        # LLM feedback (strengths & areas to improve)
        feedback_result = analyze_resume_feedback(resume_text, job_description)

        # Customized interview question set
        interview_questions = generate_interview_questions(resume_text, job_description)

        return {
            "filename": resume.filename,
            "skills_analysis": skills_result,
            "feedback": feedback_result,
            "interview_questions": interview_questions
        }
    except Exception as e:
        print(f"Error during upload_resume: {e}")
        raise HTTPException(status_code=500, detail=str(e))