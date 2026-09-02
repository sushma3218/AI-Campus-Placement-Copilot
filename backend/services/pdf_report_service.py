import fitz  # PyMuPDF


def generate_pdf_report(skills_found: list, missing_skills: list, strengths: list, areas_to_improve: list, interview_questions: str) -> bytes:
    """Generates a styled placement analysis PDF report using PyMuPDF."""
    doc = fitz.open()

    page = doc.new_page(width=595, height=842)  # A4 standard size
    margin = 40
    width = 595 - (2 * margin)

    # Title Banner Background
    rect_banner = fitz.Rect(margin, 40, 595 - margin, 110)
    page.draw_rect(rect_banner, color=(0.1, 0.2, 0.45), fill=(0.1, 0.2, 0.45))

    page.insert_text(
        fitz.Point(margin + 20, 75),
        "AI Campus Placement Copilot",
        fontsize=20,
        color=(1, 1, 1),
        fontname="helv-bold"
    )
    page.insert_text(
        fitz.Point(margin + 20, 95),
        "Comprehensive Placement & Skill Analysis Report",
        fontsize=11,
        color=(0.85, 0.9, 1),
        fontname="helv"
    )

    y = 135

    def add_heading(text):
        nonlocal y, page
        if y > 750:
            page = doc.new_page(width=595, height=842)
            y = 50
        page.insert_text(
            fitz.Point(margin, y),
            text,
            fontsize=14,
            color=(0.1, 0.25, 0.5),
            fontname="helv-bold"
        )
        y += 6
        page.draw_line(fitz.Point(margin, y), fitz.Point(margin + width, y), color=(0.7, 0.8, 0.9), width=1)
        y += 18

    def add_bullets(items, badge_color=(0, 0.5, 0)):
        nonlocal y, page
        for item in items:
            if y > 780:
                page = doc.new_page(width=595, height=842)
                y = 50
            page.draw_circle(fitz.Point(margin + 10, y - 4), 3, color=badge_color, fill=badge_color)
            
            rect = fitz.Rect(margin + 22, y - 10, margin + width, y + 30)
            rc = page.insert_textbox(rect, item, fontsize=10, fontname="helv", color=(0.2, 0.2, 0.2))
            lines_est = max(1, len(item) // 70 + 1)
            y += lines_est * 14 + 6

    # 1. Skills Found
    add_heading("1. Skills Found in Resume")
    if skills_found:
        skills_text = ", ".join(skills_found)
        rect = fitz.Rect(margin, y - 5, margin + width, y + 40)
        page.insert_textbox(rect, skills_text, fontsize=10, fontname="helv", color=(0.1, 0.45, 0.1))
        y += max(20, (len(skills_text) // 80 + 1) * 14 + 10)
    else:
        page.insert_text(fitz.Point(margin, y), "No direct matches identified.", fontsize=10, color=(0.5, 0.5, 0.5))
        y += 20

    # 2. Missing Skills
    add_heading("2. Missing Target Job Skills")
    if missing_skills:
        missing_text = ", ".join(missing_skills)
        rect = fitz.Rect(margin, y - 5, margin + width, y + 40)
        page.insert_textbox(rect, missing_text, fontsize=10, fontname="helv", color=(0.7, 0.2, 0.1))
        y += max(20, (len(missing_text) // 80 + 1) * 14 + 10)
    else:
        page.insert_text(fitz.Point(margin, y), "Candidate satisfies all extracted JD skills!", fontsize=10, color=(0, 0.5, 0))
        y += 20

    # 3. Candidate Strengths
    add_heading("3. Key Strengths")
    add_bullets(strengths if strengths else ["Solid technical alignment with core job description requirement."], badge_color=(0.1, 0.5, 0.2))

    # 4. Areas to Improve
    add_heading("4. Actionable Areas to Improve")
    add_bullets(areas_to_improve if areas_to_improve else ["Tailor project bullet points with measurable STAR metrics."], badge_color=(0.8, 0.4, 0))

    # 5. Tailored Interview Guide
    add_heading("5. Custom Interview Preparation Guide")
    if interview_questions:
        lines = interview_questions.split("\n")
        for line in lines[:30]:  # Limit output for neat print layout
            line_str = line.strip()
            if not line_str:
                continue
            if y > 780:
                page = doc.new_page(width=595, height=842)
                y = 50
            if line_str.startswith("#") or line_str.startswith("1.") or line_str.startswith("2.") or line_str.startswith("3."):
                page.insert_text(fitz.Point(margin, y), line_str, fontsize=11, fontname="helv-bold", color=(0.15, 0.25, 0.4))
                y += 16
            else:
                rect = fitz.Rect(margin + 10, y - 10, margin + width, y + 25)
                rc = page.insert_textbox(rect, line_str, fontsize=9, fontname="helv", color=(0.25, 0.25, 0.25))
                y += 14

    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes
