from fastapi import FastAPI
from llm import ask_llm
from routers.resume import router as resume_router
from routers.interview import router as interview_router
from routers.ats import router as ats_router

app = FastAPI()

app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(ats_router)


@app.get("/")
def home():
    return {
        "message": "AI Campus Placement Copilot Backend Running"
    }


@app.get("/chat")
def chat(prompt: str):
    return {
        "response": ask_llm(prompt)
    }