from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm_service import router as llm_router

# ---------------------------------------------------
# 🚀 Orbit AI Backend - Entry Point
# ---------------------------------------------------
app = FastAPI(title="Orbit AI Backend")

# Enable CORS for Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change to ["http://localhost:4200"] later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include LLM routes
app.include_router(llm_router)

@app.get("/")
def root():
    return {"message": "🚀 Orbit AI backend is running!"}
