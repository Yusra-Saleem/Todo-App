# Quickstart: Database Schema Implementation

## Overview
This quickstart guide will help you implement the database layer for the multi-user Todo application using SQLModel with FastAPI.

## Prerequisites
- Python 3.11+
- FastAPI
- SQLModel
- python-jose[cryptography] (for security)
- Neon Serverless PostgreSQL database

## Files to Create

### 1. `/backend/models.py`
This file will contain the SQLModel classes for User and Task with proper relationships:

```python
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
import uuid
from datetime import datetime

# TimeStampedModel mixin for created_at and updated_at
class TimeStampedModel(SQLModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# User model
class User(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(sa_column_kwargs={"unique": True})
    tasks: List["Task"] = Relationship(back_populates="user")

# TaskBase for Pydantic schema used in API
class TaskBase(SQLModel):
    title: str = Field(max_length=100)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)

# Task SQLModel class with foreign key to User
class Task(TaskBase, TimeStampedModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="tasks")
```

### 2. `/backend/database.py`
This file will contain the database engine initialization and the `create_db_and_tables()` function:

```python
from sqlmodel import create_engine
from .models import User, Task

# Database URL from environment variable
DATABASE_URL = "postgresql://username:password@localhost/dbname"  # Will be configured via env var

engine = create_engine(DATABASE_URL, echo=False)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

## Integration
Call the `create_db_and_tables()` function in your main application startup sequence in `/backend/main.py`:

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from .database import create_db_and_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
```

## Key Implementation Notes
- Use UUIDs for primary keys to ensure uniqueness and security
- Implement proper foreign key relationships to maintain data integrity
- Use the TimeStampedModel mixin to automatically handle created_at and updated_at timestamps
- Ensure user isolation by always verifying user_id when accessing tasks
- Follow security best practices for data access and validation