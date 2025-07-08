from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routers import threats, analyze

app = FastAPI(title="Threat Intelligence Dashboard API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(threats.router)
app.include_router(analyze.router)
