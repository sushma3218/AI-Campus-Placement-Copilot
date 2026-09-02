import json
import ollama
from prompts import RESUME_ANALYZER_PROMPT, INTERVIEW_PROMPT


def ask_llm(prompt: str):
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response["message"]["content"]


def analyze_resume(resume_text):
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": f"{RESUME_ANALYZER_PROMPT}\n\nResume:\n{resume_text}"
            }
        ]
    )
    return response["message"]["content"]


def match_resume(resume_text, job_description):
    prompt = f"""
{RESUME_ANALYZER_PROMPT}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        format="json"
    )

    content = response["message"]["content"]

    try:
        return json.loads(content)
    except Exception:
        print("LLM Output:", content)

        return {
            "ats_score": 0,
            "skills": [],
            "missing_skills": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
        }

def generate_interview_questions(resume_text, job_description):
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": f"""{INTERVIEW_PROMPT}

Resume:
{resume_text}

Job Description:
{job_description}
"""
            }
        ]
    )

    return response["message"]["content"]