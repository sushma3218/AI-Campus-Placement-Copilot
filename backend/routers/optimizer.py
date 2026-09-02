from fastapi import APIRouter, HTTPException
from models.schemas import OptimizeRequest, OptimizeResponse
from routers.chat import get_documents
from services.optimizer_service import optimize_resume

router = APIRouter(tags=["Optimizer"])


@router.post("/optimize-resume", response_model=OptimizeResponse)
def optimize(request: OptimizeRequest):
    resume_text, job_description = get_documents()

    if not resume_text and not job_description:
        raise HTTPException(
            status_code=400,
            detail="No uploaded Resume or Job Description found. Please upload documents first."
        )

    result = optimize_resume(
        option=request.option,
        resume_text=resume_text,
        job_description=job_description
    )

    return OptimizeResponse(
        title=result["title"],
        content=result["content"]
    )
