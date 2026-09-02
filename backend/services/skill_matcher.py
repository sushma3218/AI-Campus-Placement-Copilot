import json
import re
from llm import ask_llm

FALLBACK_SKILLS = [
    "Python", "Java", "C", "C++", "C#", "Go", "Rust", "TypeScript", "JavaScript",
    "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express", "FastAPI", "Django", "Flask",
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "SQLite",
    "Docker", "Kubernetes", "AWS", "Google Cloud Platform", "GCP", "Azure", "Cloud Run", "Cloud Functions",
    "Git", "GitHub", "GitLab", "CI/CD", "REST APIs", "GraphQL", "Microservices",
    "TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "Pandas", "NumPy", "NLP", "LLMs",
    "HTML", "CSS", "TailwindCSS", "Material UI", "Bootstrap"
]


def extract_skills_deterministic(text: str, candidate_skills: list) -> list:
    """Check presence of candidate skills in text deterministically using regex/substring matching."""
    text_lower = text.lower()
    matched = set()

    for skill in candidate_skills:
        skill_clean = skill.strip()
        if not skill_clean:
            continue
        # Check word boundary, handling special characters like C++, C#, Node.js properly
        pattern = r'(?<![a-zA-Z0-9])' + re.escape(skill_clean.lower()) + r'(?![a-zA-Z0-9])'
        if re.search(pattern, text_lower):
            matched.add(skill_clean)

    return sorted(list(matched))


def extract_dynamic_skills(resume_text: str, job_description: str) -> dict:
    """Dynamically extracts skills using LLM + deterministic Python matching."""
    prompt = f"""
You are an expert ATS skill extractor.
Analyze the provided Resume and Job Description. Extract all technical skills, frameworks, tools, languages, and domain competencies mentioned.

Return ONLY a valid JSON object:
{{
    "jd_skills": ["Python", "FastAPI", "Docker", "AWS"],
    "resume_skills": ["Python", "FastAPI", "React", "Git"]
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""
    try:
        raw_response = ask_llm(prompt)
        # Clean JSON markdown fences if present
        clean_json = raw_response.strip()
        if clean_json.startswith("```"):
            clean_json = re.sub(r"^```(?:json)?\n?", "", clean_json)
            clean_json = re.sub(r"\n?```$", "", clean_json)

        data = json.loads(clean_json)
        jd_skills_raw = data.get("jd_skills", [])
        resume_skills_raw = data.get("resume_skills", [])
    except Exception as e:
        print(f"Dynamic skill extraction parsing fallback: {e}")
        jd_skills_raw = extract_skills_deterministic(job_description, FALLBACK_SKILLS)
        resume_skills_raw = extract_skills_deterministic(resume_text, FALLBACK_SKILLS)

    # Standardize skill names (preserve original casing where possible)
    skill_map = {}
    for s in jd_skills_raw + resume_skills_raw + FALLBACK_SKILLS:
        if isinstance(s, str) and s.strip():
            skill_map[s.strip().lower()] = s.strip()

    # Deterministic matching against resume text
    skills_found = []
    missing_skills = []

    for s_raw in jd_skills_raw:
        if not isinstance(s_raw, str):
            continue
        s_clean = s_raw.strip()
        if not s_clean:
            continue

        # Check if present in resume text deterministically OR present in resume_skills
        pattern = r'(?<![a-zA-Z0-9])' + re.escape(s_clean.lower()) + r'(?![a-zA-Z0-9])'
        in_resume_text = bool(re.search(pattern, resume_text.lower()))
        in_resume_skills = any(s_clean.lower() == r.lower() for r in resume_skills_raw if isinstance(r, str))

        if in_resume_text or in_resume_skills:
            skills_found.append(s_clean)
        else:
            missing_skills.append(s_clean)

    for r_raw in resume_skills_raw:
        if isinstance(r_raw, str) and r_raw.strip():
            skills_found.append(r_raw.strip())

    # Deduplicate and sort
    skills_found_unique = sorted(list(set(skills_found)), key=lambda x: x.lower())
    missing_skills_unique = sorted(list(set(missing_skills)), key=lambda x: x.lower())

    return {
        "skills": skills_found_unique,
        "missing_skills": missing_skills_unique
    }