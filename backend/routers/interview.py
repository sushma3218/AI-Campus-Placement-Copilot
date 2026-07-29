from fastapi import APIRouter

router = APIRouter()


@router.get("/interview")
def interview():
    return {
        "message": "Interview module ready"
    }