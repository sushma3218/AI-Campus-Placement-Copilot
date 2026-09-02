from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from services.chat_service import resume_chat

router = APIRouter(tags=["Chat"])

stored_resume_text = ""
stored_job_description = ""


def set_documents(resume: str, jd: str):
    global stored_resume_text, stored_job_description
    stored_resume_text = resume
    stored_job_description = jd


def get_documents():
    return stored_resume_text, stored_job_description


@router.post("/resume-chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = resume_chat(
        request.question,
        stored_resume_text,
        stored_job_description
    )
    return ChatResponse(answer=answer)