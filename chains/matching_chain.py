from langchain_core.output_parsers import StrOutputParser
from prompts.matching_prompt import matching_prompt

def get_matching_chain(llm):
    return matching_prompt | llm | StrOutputParser()