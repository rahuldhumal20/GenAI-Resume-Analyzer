from langchain_groq import ChatGroq
from dotenv import load_dotenv

from chains.extraction_chain import get_extraction_chain
from chains.matching_chain import get_matching_chain

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)

# Chains
extraction_chain = get_extraction_chain(llm)
matching_chain = get_matching_chain(llm)

# Sample Resume
resume = """
John Doe
Skills: Python, Machine Learning, SQL
Worked 3 years as Data Analyst
Used tools: Pandas, NumPy
"""

# Job Description
job_description = """
Looking for a Data Scientist with:
- Python
- Machine Learning
- Deep Learning
- SQL
- Experience with TensorFlow
"""

# Step 1: Extraction
extracted = extraction_chain.invoke({"resume": resume})

print("\n--- Extracted Data ---")
print(extracted)

# Step 2: Matching
match_result = matching_chain.invoke({
    "candidate": extracted,
    "job_description": job_description
})

print("\n--- Matching Result ---")
print(match_result)