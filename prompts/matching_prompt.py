from langchain_core.prompts import PromptTemplate

matching_prompt = PromptTemplate.from_template("""
You are an AI recruiter.

Compare the candidate's profile with the job description.

Rules:
- Only use provided data
- Do NOT assume skills
- Be strict and accurate

Candidate Profile:
{candidate}

Job Description:
{job_description}

Output format:
Matched Skills: []
Missing Skills: []
Match Summary:
""")