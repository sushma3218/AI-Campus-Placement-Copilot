from fastapi import APIRouter, HTTPException
from models.schemas import MockInterviewEvaluateRequest, MockInterviewEvaluateResponse
from routers.chat import get_documents
from services.mock_interview_service import evaluate_mock_answer

router = APIRouter(tags=["Interview"])


@router.post("/evaluate-answer", response_model=MockInterviewEvaluateResponse)
def evaluate_answer(request: MockInterviewEvaluateRequest):
    resume_text, job_description = get_documents()

    if not request.question or not request.user_answer:
        raise HTTPException(status_code=400, detail="Question and answer must be provided.")

    evaluation = evaluate_mock_answer(
        question=request.question,
        user_answer=request.user_answer,
        resume_text=resume_text,
        job_description=job_description
    )

    return MockInterviewEvaluateResponse(
        score=evaluation["score"],
        fluency_feedback=evaluation["fluency_feedback"],
        feedback=evaluation["feedback"],
        ideal_answer=evaluation["ideal_answer"]
    )