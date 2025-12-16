"""
Authentication Middleware Implementation
=======================================

This file demonstrates the JWT authentication middleware implementation.
It uses the reusable `get_current_user_id` dependency to protect routes
and ensure only authenticated users can access protected endpoints.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import database
from core.dependencies import get_current_user_id
from routers import tasks
from routers.auth import router as auth_router
from dotenv import load_dotenv
load_dotenv()


def create_db_and_tables():
    database.create_db_and_tables()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the auth and tasks routers
app.include_router(auth_router)
app.include_router(tasks.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}


@app.get("/test/auth")
def test_auth(user_id: str = Depends(get_current_user_id)):
    """
    Test route that requires authentication to confirm the dependency is working.
    """
    return {"message": f"Successfully authenticated user {user_id}"}


@app.get("/user/profile")
def get_user_profile(user_id: str = Depends(get_current_user_id)):
    """
    Example protected endpoint that returns user context automatically.
    """
    return {
        "user_id": user_id,
        "message": f"User {user_id} profile accessed successfully"
    }


@app.get("/user/settings")
def get_user_settings(user_id: str = Depends(get_current_user_id)):
    """
    Second protected endpoint using the same dependency pattern to demonstrate consistency.
    """
    return {
        "user_id": user_id,
        "settings": {"theme": "dark", "notifications": True},
        "message": f"Settings for user {user_id} accessed successfully"
    }