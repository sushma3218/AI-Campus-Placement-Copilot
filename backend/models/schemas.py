from typing import List, Optional
from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


class OptimizeRequest(BaseModel):
    option: str  # summary, skills, projects, tailor, cover_letter


class OptimizeResponse(BaseModel):
    title: str
    content: str


class MockInterviewEvaluateRequest(BaseModel):
    question: str
    user_answer: str


class MockInterviewEvaluateResponse(BaseModel):
    score: int
    fluency_feedback: str
    feedback: str
    ideal_answer: str


class SkillsAnalysis(BaseModel):
    skills: List[str]
    missing_skills: List[str]


class AnalysisFeedback(BaseModel):
    strengths: List[str]
    areas_to_improve: List[str]


class AnalysisResponse(BaseModel):
    filename: str
    skills_analysis: SkillsAnalysis
    feedback: AnalysisFeedback
    interview_questions: str