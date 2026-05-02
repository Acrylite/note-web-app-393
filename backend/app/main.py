from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.app.core.firebase_config import init_firebase_admin
from backend.app.routers import auth, note, todo

# startup / shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_firebase_admin()
    yield

# app
app = FastAPI(
    title="To-Do App API",
    version="1.0.0",
    lifespan=lifespan,
)

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(auth.router)
app.include_router(note.router)
app.include_router(todo.router)

# health check
@app.get("/")
def root():
    return {"status": "ok"}