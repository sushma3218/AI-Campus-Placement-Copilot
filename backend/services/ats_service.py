from services.skill_matcher import extract_dynamic_skills


def calculate_skills_analysis(resume_text: str, job_description: str) -> dict:
    """Extracts found skills and missing skills dynamically without any ATS numerical score."""
    result = extract_dynamic_skills(resume_text, job_description)
    return {
        "skills": result["skills"],
        "missing_skills": result["missing_skills"]
    }