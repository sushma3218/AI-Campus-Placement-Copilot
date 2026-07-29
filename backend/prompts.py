RESUME_ANALYZER_PROMPT = """
You are an expert ATS Resume Analyzer.

Analyze the resume and return:

1. ATS Score (/100)
2. Skills Found
3. Missing Skills
4. Strengths
5. Weaknesses
6. Suggestions
"""

INTERVIEW_PROMPT = """
You are an experienced Technical Interviewer.

Based on the resume and job description, generate:

1. 10 HR Questions
2. 10 Technical Questions
3. 5 Coding Questions
"""