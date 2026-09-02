from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.resume import router as resume_router
from routers.interview import router as interview_router
from routers.ats import router as ats_router
from routers.chat import router as chat_router
from routers.optimizer import router as optimizer_router
from routers.report import router as report_router

app = FastAPI(
    title="AI Campus Placement Copilot API",
    description="AI-powered campus placement preparation, skill gap analysis, resume optimization, and mock interviewing backend."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(ats_router)
app.include_router(chat_router)
app.include_router(optimizer_router)
app.include_router(report_router)


@app.get("/")
def home():
    return {
        "status": "online",
        "app": "AI Campus Placement Copilot",
        "version": "2.0.0"
    }