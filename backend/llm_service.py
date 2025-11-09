from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx # type: ignore
import os

router = APIRouter()
OLLAMA_API = os.getenv("OLLAMA_API", "http://localhost:11434")

class ChatRequest(BaseModel):
    prompt: str

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{OLLAMA_API}/api/generate",
                json={
                    "model": "phi3",
                    "prompt": f"You are Orbit, an intelligent AI assistant.\nHarsh: {request.prompt}\nOrbit:",
                    "stream": False
                },
                timeout=180
            )
            response.raise_for_status()
            data = response.json()
            return {"reply": data.get("response", "No reply.")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
