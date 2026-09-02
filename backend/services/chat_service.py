from llm import ask_llm
from prompts import CHAT_SYSTEM_PROMPT


def resume_chat(question: str, resume_text: str, job_description: str) -> str:
    """Answers user queries grounded strictly in the provided resume and job description context."""
    if not resume_text and not job_description:
        return "Please upload your Resume and Job Description first so I can answer your questions accurately."

    prompt = f"""{CHAT_SYSTEM_PROMPT.format(resume_text=resume_text, job_description=job_description)}

User Question:
{question}
"""

    return ask_llm(prompt)