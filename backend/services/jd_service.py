def load_job_description():
    with open("jd.txt", "r", encoding="utf-8") as file:
        return file.read()