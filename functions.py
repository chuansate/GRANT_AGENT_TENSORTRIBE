import os
import re
import ollama
from langchain.agents import initialize_agent, Tool
from langchain_community.chat_models import ChatQwen
from langchain.agents.agent_types import AgentType
from langchain.tools import tool

def readtextfiles(path):
    """
    returns a dictory where keys are textfile names, and values are their contents
    """
    text_contents = {}
    directory = os.path.join(path)
    print(f"Reading text files at path `{directory}`...")
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            file_path = os.path.join(directory, filename)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
            
            text_contents[filename] = content
    
    return text_contents

def chunksplitter(text, chunk_size=300):
    """
    returns a list of chunks, where each chunk is just a sentence of words (at most there are `chunk_size` words)
    
    eg:
    ```
    chunks = chunksplitter("I love you! and you love me!", chunk_size=2)
    print(chunks)
    ```
    
    will give you the results:

    ```
    ['I love', 'you! and', 'you love', 'me!']
    ```
    """
    words = re.findall(r'\S+', text)  # splitting a text into words (punctuations attached to the words if exists)
    chunks = []
    current_chunk = []
    word_count = 0

    for word in words:
        current_chunk.append(word)
        word_count += 1

        if word_count >= chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            word_count = 0
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks

def getembedding(chunks):
    embeds = ollama.embed(model="nomic-embed-text", input=chunks)
    return embeds.get('embeddings', [])

@tool
def fill_grant_form(data: str) -> str:
    """Fills out a grant form based on used data and returns a summary."""
    return f"Filled grant form with data: {data}"

def embed_query(query: str):
    return ollama.embed(model="nomic-embed-text", input=query)['embeddings']

def get_grant_agent():
    llm = ChatQwen(model="qwen-plus", temperature=0)

    # wrap the form filler function in a tool
    tools = [
        Tool(
            name="fill_grant_form",
            func=fill_grant_form,
            description="Fills a grant form based on user provided information."
        )
    ]
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=True,
    )

    return agent