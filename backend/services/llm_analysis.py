import json
import re
from llm import ask_llm


def analyze_resume_feedback(resume_text: str, job_description: str) -> dict:
    """Analyzes strengths, constructive areas to improve, improvised summary, and JD tailored bullet points."""
    prompt = f"""
You are a senior technical recruiter and campus hiring mentor.

Analyze the candidate's resume against the target job description.

Return ONLY valid JSON with no markdown wrapping or preamble:
{{
    "strengths": [
        "Strong experience with Python and FastAPI backend development matching core role requirements.",
        "Demonstrated hands-on projects showing practical software engineering principles."
    ],
    "areas_to_improve": [
        "Include measurable impact metrics (e.g., latency reduction, test coverage, user scale) in project descriptions.",
        "Highlight hands-on cloud and containerization experience (Docker/AWS) as requested in the JD."
    ],
    "improvised_summary": "Results-oriented Software Engineer proficient in Python, FastAPI, and scalable backend architecture. Experienced in delivering end-to-end web applications, optimizing API performance, and applying modern software practices to solve complex domain challenges aligned with target role requirements.",
    "tailored_content": [
        "Engineered scalable RESTful microservices with FastAPI and Python, accelerating data retrieval speed by 35% and ensuring seamless API integration.",
        "Designed and implemented modular backend services incorporating clean architecture principles, robust validation, and automated testing.",
        "Collaborated on full-stack feature delivery, aligning candidate technical projects directly with target job description requirements and business goals."
    ]
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = ask_llm(prompt)

    try:
        clean_json = response.strip()
        if clean_json.startswith("```"):
            clean_json = re.sub(r"^```(?:json)?\n?", "", clean_json)
            clean_json = re.sub(r"\n?```$", "", clean_json)

        data = json.loads(clean_json)
        return {
            "strengths": data.get("strengths", []),
            "areas_to_improve": data.get("areas_to_improve", data.get("weaknesses", []) + data.get("suggestions", [])),
            "improvised_summary": data.get("improvised_summary", "Results-oriented Software Engineer proficient in technical problem solving, clean backend architecture, and targeted domain development aligned with job requirements."),
            "tailored_content": data.get("tailored_content", [
                "Developed high-performance backend components using modern software frameworks, optimizing application execution and system reliability.",
                "Structured complex project codebases for scalability, maintainability, and alignment with target role competencies.",
                "Quantified key performance outcomes and domain contributions to demonstrate measurable technical impact."
            ])
        }
    except Exception as e:
        print(f"Error parsing LLM feedback: {e}")
        return {
            "strengths": [
                "Technical skills align with key project requirements.",
                "Relevant academic and project background."
            ],
            "areas_to_improve": [
                "Highlight key metrics and quantitative outcomes in project bullet points.",
                "Tailor resume summary to emphasize target role keywords."
            ],
            "improvised_summary": "Motivated Software Developer with strong foundation in core technical frameworks and problem-solving. Adept at building clean, reliable software solutions tailored to target organization requirements.",
            "tailored_content": [
                "Architected core application logic and backend services targeting key requirements from the job specification.",
                "Optimized database queries and API response structure to enhance user experience and processing efficiency.",
                "Implemented unit tests and modular code patterns ensuring robust code quality and reliability."
            ]
        }