import os
import json
import re

from dotenv import load_dotenv
from pypdf import PdfReader
from typing import List

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from langchain_groq import ChatGroq

from chains.extraction_chain import get_extraction_chain
from chains.matching_chain import get_matching_chain
from chains.explanation_chain import get_explanation_chain


# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI()

# React Vite CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://your-netlify-site.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Environment
# -----------------------------
load_dotenv()


# -----------------------------
# LLM
# -----------------------------
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    seed=42
)


# -----------------------------
# Chains
# -----------------------------
extraction_chain = get_extraction_chain(llm)
matching_chain = get_matching_chain(llm)
explanation_chain = get_explanation_chain(llm)


# -----------------------------
# Job Description
# -----------------------------
job_description = """
Hiring Full Stack Developer.

Skills Required:
- JavaScript
- React.js
- Node.js
- Express.js
- REST APIs
- MongoDB
- JWT Authentication

Experience:
- 1–3 years

Good to have:
- FastAPI / Python
- Deployment (Netlify, Render)
"""


# -----------------------------
# Helpers
# -----------------------------
def load_pdf(file_path):
    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        extracted_text = page.extract_text()
        if extracted_text:
            text += extracted_text

    return text


def calculate_score(extracted, match_result):

    try:
        cleaned = match_result.strip()

        if "```" in cleaned:
            cleaned = cleaned.split("```")[1]

            if cleaned.startswith("json"):
                cleaned = cleaned.replace("json", "").strip()

        data = json.loads(cleaned)

        matched_count = len(
            data.get("matched_skills", [])
        )

        missing_count = len(
            data.get("missing_skills", [])
        )

    except Exception:
        matched_count = 0
        missing_count = 0

    # Skill Score (60)
    if matched_count + missing_count > 0:
        skill_score = (
            matched_count /
            (matched_count + missing_count)
        ) * 60
    else:
        skill_score = 30

    # Experience Score (30)
    exp_match = re.search(
        r'(\d+(\.\d+)?)\s*years',
        extracted.lower()
    )

    experience = (
        float(exp_match.group(1))
        if exp_match else 1
    )

    if experience >= 3:
        exp_score = 30
    elif experience >= 2:
        exp_score = 25
    elif experience >= 1:
        exp_score = 20
    else:
        exp_score = 15

    # Penalty
    penalty = 0

    if experience < 2:
        penalty = 5

    total_score = int(
        skill_score +
        exp_score -
        penalty
    )

    # Cap
    if total_score > 95:
        total_score = 95

    return total_score


def analyze_resume_file(file_path,job_description):

    resume_text = load_pdf(file_path)

    # Step 1 Extraction
    extracted = extraction_chain.invoke({
        "resume": resume_text
    })

    # Step 2 Matching
    match_result = matching_chain.invoke({
        "candidate": extracted,
        "job_description": job_description
    })

    try:
        cleaned = match_result.strip()

        if "```" in cleaned:
            cleaned = cleaned.split("```")[1]

            if cleaned.startswith("json"):
                cleaned = cleaned.replace(
                    "json",""
                ).strip()

        match_data = json.loads(
            cleaned
        )

        matched_skills = match_data.get(
            "matched_skills",
            []
        )

        missing_skills = match_data.get(
            "missing_skills",
            []
        )

    except:
        matched_skills=[]
        missing_skills=[]

    # Step 3 Scoring
    score = calculate_score(
        extracted,
        match_result
    )

    # Classification
    if score >= 80:
        category = "STRONG"

    elif score >= 50:
        category = "AVERAGE"

    else:
        category = "WEAK"

    # Step 4 Explanation
    explanation = explanation_chain.invoke({
        "candidate": extracted,
        "matching": match_result,
        "score": f"Score: {score}"
    })

    return {
        "score": score,
        "category": category,
        "explanation": explanation,
        "matched_skills":matched_skills,
        "missing_skills":missing_skills
    }


# -----------------------------
# API Endpoint for React UI
# -----------------------------
@app.post("/analyze")
async def analyze_resume(
resume: UploadFile = File(...),
job_description: str = Form(...)
):

    contents = await resume.read()

    temp_path = "temp.pdf"

    with open(temp_path, "wb") as f:
        f.write(contents)

    result = analyze_resume_file(
        temp_path,
        job_description
    )

    return result


# -----------------------------
# Batch Mode (CLI)
# -----------------------------
if __name__ == "__main__":

    folder_path = "resumes"

    if os.path.exists(folder_path):

        resume_files = [
            os.path.join(
                folder_path,
                file
            )
            for file in os.listdir(folder_path)
            if file.endswith(".pdf")
        ]

        for file_path in resume_files:

            file_name = os.path.basename(
                file_path
            )

            result = analyze_resume_file(
                file_path,
                job_description
            )

            print("\n======================")
            print(
                f"Resume: {file_name}"
            )
            print(
                f"Score: {result['score']}"
            )
            print(
                f"Category: {result['category']}"
            )

            print(
                "\n--- Explanation ---"
            )

            print(
                result["explanation"]
            )

            print("\nMatched Skills:")
            print(result["matched_skills"])

            print("\nMissing Skills:")
            print(result["missing_skills"])