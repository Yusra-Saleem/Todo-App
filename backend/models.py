from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import DateTime, func
from typing import Optional, List
from datetime import datetime
import uuid


# TaskBase for Pydantic schema used in API
class TaskBase(SQLModel):
    title: str = Field(max_length=255, description="Title of the task")
    description: Optional[str] = Field(default=None, description="Optional description of the task")
    completed: bool = Field(default=False, description="Completion status of the task")


# User model
class User(SQLModel, table=True):
    __tablename__ = "users"

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True,
        description="Unique identifier for the user (UUID format)"
    )
    email: str = Field(
        max_length=255,
        unique=True,
        description="User's email address"
    )
    hashed_password: str = Field(
        max_length=255,
        description="Hashed password for the user"
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="Timestamp when the record was created"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="Timestamp when the record was last updated"
    )
    tasks: List["Task"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={
            "cascade": "all, delete-orphan"
        }
    )


# Task SQLModel class with foreign key to User
class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        primary_key=True,
        description="Unique identifier for the task (UUID format)"
    )
    user_id: str = Field(
        foreign_key="users.id",
        index=True,  # Add index for efficient querying
        description="ID of the user who owns this task"
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="Timestamp when the record was created"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="Timestamp when the record was last updated"
    )
    user: User = Relationship(back_populates="tasks")

    def update_timestamp(self):
        """Method to update the updated_at timestamp."""
        self.updated_at = datetime.utcnow()

    def toggle_completion(self) -> bool:
        """
        Toggles the completion status of the task.
        Returns the new completion status.
        """
        self.completed = not self.completed
        self.update_timestamp()
        return self.completed