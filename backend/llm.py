import json
import os
import google.generativeai as genai
from prompts import RESUME_ANALYZER_PROMPT, INTERVIEW_PROMPT

# Configure Gemini API
# It will automatically use the GEMINI_API_KEY environment variable
api_key = os.environ.get("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY environment variable not set!")

# Use Gemini 1.5 Flash as it is fast and free
model = genai.GenerativeModel('gemini-1.5-flash')

def ask_llm(prompt: str):
    response = model.generate_content(prompt)
    return response.text


def analyze_resume(resume_text):
    prompt = f"{RESUME_ANALYZER_PROMPT}\n\nResume:\n{resume_text}"
    response = model.generate_content(prompt)
    return response.text


def match_resume(resume_text, job_description):
    prompt = f"""
{RESUME_ANALYZER_PROMPT}

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY valid JSON. No markdown formatting.
"""

    response = model.generate_content(prompt)
    content = response.text

    # Clean up markdown code blocks if the model returns them
    if content.startswith("```json"):
        content = content.replace("```json", "", 1)
    if content.endswith("```"):
        content = content[:content.rfind("```")]
    
    content = content.strip()

    try:
        return json.loads(content)
    except Exception:
        print("LLM Output Error:", content)

        return {
            "ats_score": 0,
            "skills": [],
            "missing_skills": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
        }

def generate_interview_questions(resume_text, job_description):
    prompt = f"""{INTERVIEW_PROMPT}

Resume:
{resume_text}

Job Description:
{job_description}
"""
    response = model.generate_content(prompt)
    return response.text