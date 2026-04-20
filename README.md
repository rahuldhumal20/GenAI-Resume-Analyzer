# 🚀 GenAI Resume Analyzer

## 📌 Overview
GenAI Resume Analyzer is an AI-powered ATS-style resume screening system that evaluates candidates against job descriptions using Large Language Models.

The system supports both:

✅ Web UI (React + FastAPI)  
✅ Batch / Command Line Mode (Multiple resumes)

It performs:

- Resume parsing from PDF
- Skill extraction
- Job description matching
- Candidate scoring
- Matched vs Missing skills detection
- Explainable AI recommendations
- Candidate ranking support

---

# ⚙️ Tech Stack

## Frontend
- React (Vite)
- Axios

## Backend
- FastAPI
- Python

## AI / LLM
- LangChain
- Groq (LLaMA 3.3)
- LangSmith

## PDF Processing
- PyPDF

---

# 🧠 Features

## ✅ Dynamic Resume Analysis
Upload a PDF resume and paste any Job Description for analysis.

## ✅ Skill Matching
Detects:

- Matched Skills
- Missing Skills

## ✅ Hybrid Candidate Scoring
Generates realistic candidate score:

0–100

Based on:
- Skill Match
- Experience
- Penalties for skill gaps

## ✅ Candidate Classification
- STRONG
- AVERAGE
- WEAK

## ✅ Explainable AI
Returns:
- Strengths
- Weaknesses
- Recommendation

## ✅ Batch Processing (CLI)
Add multiple resumes into:

```text
resumes/
```

and run:

```bash
python main.py
```

Automatically evaluates all resumes.

## ✅ Web UI
Upload Resume + Paste Job Description + Analyze instantly.

---

# 🔄 Architecture

```text
Resume PDF
   ↓
Extraction
   ↓
Matching
   ↓
Scoring
   ↓
Explanation
   ↓
UI / CLI Output
```

---


# 🚀 Installation

## 1 Clone Repository

```bash
git clone https://github.com/yourusername/GenAI-Resume-Analyzer.git

cd GenAI-Resume-Analyzer
```

---

## 2 Backend Setup

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 3 Create .env

```env
GROQ_API_KEY=your_groq_key

LANGCHAIN_API_KEY=your_langsmith_key

LANGCHAIN_TRACING_V2=true

LANGCHAIN_PROJECT=resume-screening
```

---

# 🖥 Run Backend API

```bash
uvicorn main:app --reload
```

Backend runs:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Move to frontend:

```bash
cd ai-resume-ui
```

Install:

```bash
npm install
```

Run React:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 📦 Command Line Mode (Batch Processing)

Add resumes into:

```text
resumes/
```

Run:

```bash
python main.py
```

Example:

```text
Resume: Rahul Resume.pdf

Score: 85

Category: STRONG
```

---

# 🌐 Web UI Usage

1. Upload Resume PDF

2. Paste Job Description

3. Click Analyze

4. Get:

- Score
- Category
- Matched Skills
- Missing Skills
- AI Recommendation

---

# 📊 Sample API Response

```json
{
 "score":85,
 "category":"STRONG",
 "matched_skills":[
   "React",
   "Node.js",
   "MongoDB"
 ],
 "missing_skills":[
   "Docker"
 ]
}
```

---

# 📈 Scoring Logic

| Factor | Weight |
|--------|--------|
| Skill Match | 60% |
| Experience | 30% |
| Penalties | Applied |

---

# 🔥 Usage Modes

## Mode 1 — Web Application
React UI + FastAPI

## Mode 2 — Command Line
Batch screening using:

```bash
python main.py
```

---

# 🚀 Future Improvements
- Multi-candidate ranking dashboard
- Resume history / archives
- Deployment (Vercel + Render)
- Full ATS dashboard

---

# 👨‍💻 Author

Rahul Pravin Dhumal

---