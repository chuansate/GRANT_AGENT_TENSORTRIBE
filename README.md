# grant-agent-tensortribe

# Setup Backend Env and VectorDB
1. `conda create -n grantOllama python==3.10`
2. `conda activate grantOllama`
- `pip install ollama`
- `pip install chromadb`

# Run VectorDB
1. Make sure your terminal is cd to project folder, then run <br>
- `chroma run --path ./vectorDB` for listening to localhost only
- `chroma run --host 0.0.0.0 --path ./vectorDB` to expose the server to entire network

# Run FastAPI server
1. `uvicorn server:app --reload --host 0.0.0.0 --port 8200` if ur server file is named `server.py`