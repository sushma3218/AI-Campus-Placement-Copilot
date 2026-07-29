from fastapi import FastAPI
from llm import ask_llm

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "AI Campus Placement Copilot Backend Running"
    }


@app.get("/chat")
def chat(prompt: str):
    answer = ask_llm(prompt)

    return {
        "response": answer
    }