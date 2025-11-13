from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx # type: ignore
import os

router = APIRouter()
# OLLAMA_API = os.getenv("OLLAMA_API", "http://localhost:11434")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise Exception("GROQ_API_KEY environment variable is not set.")

class ChatRequest(BaseModel):
    prompt: str

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama3-8b-8192",
                    "messages": [
                        {"role": "system", "content": "You are Orbit, an intelligent AI assistant."},
                        {"role": "user", "content": request.prompt}
                    ],
                    "temperature": 0.7,
                }
            )
            response.raise_for_status()
            data = response.json()
            reply_text = data["choices"][0]["message"]["content"]
            return {"reply": reply_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
