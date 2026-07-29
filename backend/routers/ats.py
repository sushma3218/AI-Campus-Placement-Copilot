from fastapi import APIRouter

router = APIRouter()


@router.get("/ats")
def ats():
    return {
        "message": "ATS module ready"
    }