from services.pdf_service import extract_text_from_pdf

def extract_jd_text(file_bytes):
    if file_bytes.startswith(b'%PDF'):
        return extract_text_from_pdf(file_bytes)
    try:
        return file_bytes.decode("utf-8")
    except:
        try:
            return extract_text_from_pdf(file_bytes)
        except:
            return ""