"""
This file is to convert the knowledge base's chunks into embeddings
then save the embeddings into vector DB
"""

from openai import OpenAI
from dotenv import load_dotenv
import chromadb
from functions import readtextfiles, chunksplitter
import numpy as np
import os
import json
import uuid
# Load environment variables from .env file
load_dotenv()
MODEL_STUDIO_API_KEY = os.getenv('MODEL_STUDIO_API_KEY')
chromaclient = chromadb.HttpClient(host="localhost", port=8000)
textdocspath = "./knowledge_base"
text_data = readtextfiles(textdocspath)
all_docs = []
for n, k in text_data.items():
    print(n)
exit()
metadatas = [
    {"grant_name": None},
    {"grant_name": "Industry4WRD Intervention Fund"},
    {"grant_name": "Program Geran Pemadanan Change Upgrade Product (CUP)"},
    {"grant_name": "Program Geran Pemadanan Change Upgrade Product (CUP)"},
    {"grant_name": "MSME Digital Grant"},
    {"grant_name": "CIP Spark"},
    {"grant_name": ""},
    {"grant_name": ""},
    {"grant_name": ""},
    {"grant_name": ""},
    {"grant_name": ""}

]
for doc in text_data.values():
    all_docs.append(doc)

COLLECTION_NAME = "grant"
print("********************************************")
print("Printing all existing collections in ChromaDB:")
for collection_name in chromaclient.list_collections():
    print(collection_name)
print("********************************************")
if any(collection_name == COLLECTION_NAME for collection_name in chromaclient.list_collections()):
    chromaclient.delete_collection(COLLECTION_NAME)
    print("Deleted existing collection!")

collection = chromaclient.get_or_create_collection(name=COLLECTION_NAME, metadata={"hnsw:space": "cosine"}  )

client = OpenAI(
    api_key=MODEL_STUDIO_API_KEY,
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
)

def getembeddings(documents):
    completion = client.embeddings.create(
        model="text-embedding-v3",
        input=documents,
        dimensions=768,
        encoding_format="float"
    )
    data_dict = json.loads(completion.model_dump_json())
    embeddings = data_dict["data"]
    emb_list = []
    for emb_dict in embeddings:
        emb = emb_dict["embedding"]
        emb_list.append(emb)
    return emb_list

documents = []
embeddings = []
for filename, text in text_data.items():
    if len(documents) < 10:
        print(f"Processing file `{filename}`...")
        documents.append(text)
    else:
        emb_list = getembeddings(documents)
        embeddings.append(emb_list)
        documents = [text]
if len(documents) != 0:
    emb_list = getembeddings(documents)
    embeddings.append(emb_list)
embs_flattened = []
for emb_list in embeddings:
    for emb in emb_list:
        embs_flattened.append(emb)

ids = [str(uuid.uuid4()) for _ in embs_flattened]
collection.add(
    ids=ids,
    documents=all_docs,
    embeddings=embs_flattened,
    metadatas=metadatas
)
print(f"Saved embeddings into collection `{COLLECTION_NAME}`")