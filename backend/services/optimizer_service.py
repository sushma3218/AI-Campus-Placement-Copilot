from llm import ask_llm
from prompts import OPTIMIZER_PROMPT


def optimize_resume(option: str, resume_text: str, job_description: str) -> dict:
    """Generates tailored resume improvements based on selected option."""
    option_titles = {
        "summary": "Improved Executive Summary",
        "skills": "Categorized & Tailored Skills Section",
        "projects": "STAR-Formatted Project Highlights",
        "tailor": "Targeted Keyword Resume Bullet Points",
        "cover_letter": "Personalized Cover Letter"
    }

    title = option_titles.get(option, "Resume Improvement Proposal")

    prompt = f"""
{OPTIMIZER_PROMPT.format(option=option)}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    content = ask_llm(prompt)

    return {
        "title": title,
        "content": content
    }
