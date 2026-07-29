from fastapi import FastAPI
from llm import ask_llm
from routers.resume import router as resume_router
from routers.interview import router as interview_router
from routers.ats import router as ats_router
from models.schemas import ChatRequest, ChatResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(ats_router)


@app.get("/")
def home():
    return {
        "message": "AI Campus Placement Copilot Backend Running"
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    return ChatResponse(
        response=ask_llm(request.prompt)
    )