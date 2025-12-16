from sqlmodel import create_engine, Session
from fastapi import Depends
import os
from dotenv import load_dotenv
load_dotenv()

try:
    from .models import User, Task
except ImportError:
    from models import User, Task

# Get database URL from environment variable, with a default for development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# Determine if we're using SQLite for proper connection handling
if DATABASE_URL.startswith("sqlite"):
    # For SQLite, disable pooling and enable check_same_thread for development
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        connect_args={"check_same_thread": False}  # Required for SQLite in FastAPI
    )
else:
    # For PostgreSQL and other databases, use default settings
    engine = create_engine(DATABASE_URL, echo=False)


def create_db_and_tables():
    """
    Creates all database tables based on SQLModel models.
    This function should be called on application startup.
    """
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)


def get_db_session():
    """
    Dependency that provides a database session for FastAPI endpoints.
    The session is automatically closed when the request is completed.
    """
    with Session(engine) as session:
        yield session