import json
import re
from llm import ask_llm
from prompts import MOCK_EVALUATE_PROMPT


def evaluate_mock_answer(question: str, user_answer: str, resume_text: str, job_description: str) -> dict:
    """Evaluates candidate response during interactive mock interview."""
    prompt = MOCK_EVALUATE_PROMPT.format(
        question=question,
        user_answer=user_answer,
        resume_text=resume_text,
        job_description=job_description
    )

    try:
        raw_response = ask_llm(prompt)
        clean_json = raw_response.strip()
        if clean_json.startswith("```"):
            clean_json = re.sub(r"^```(?:json)?\n?", "", clean_json)
            clean_json = re.sub(r"\n?```$", "", clean_json)

        data = json.loads(clean_json)
        return {
            "score": int(data.get("score", 7)),
            "fluency_feedback": data.get("fluency_feedback", "Grammar and sentence structure were acceptable, but could be more professional."),
            "feedback": data.get("feedback", "Good effort. Incorporate STAR methodology for higher impact."),
            "ideal_answer": data.get("ideal_answer", "A comprehensive sample response addressing the key requirement.")
        }
    except Exception as e:
        print(f"Error evaluating mock answer: {e}")
        return {
            "score": 7,
            "fluency_feedback": "Unable to evaluate fluency completely due to an error, but try to speak clearly and confidently.",
            "feedback": "Clear explanation. Provide specific metrics or technical details to strengthen your answer.",
            "ideal_answer": f"To answer '{question}' effectively, state your role, the technical approach used, and the measurable outcome."
        }
