from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TaskCreate(BaseModel):
    """
    Input model for creating new tasks, containing only the fields that users can specify.
    """
    title: str = Field(..., min_length=1, max_length=255, description="Task title (1-255 characters)")
    description: Optional[str] = Field(None, max_length=1000, description="Optional task description (up to 1000 characters)")


class TaskRead(BaseModel):
    """
    Response model for reading tasks, containing all task fields for display.
    """
    id: str
    title: str = Field(..., max_length=255)
    is_completed: bool
    created_at: datetime
    updated_at: datetime
    user_id: str

    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy/SQLModel objects


class TaskUpdate(BaseModel):
    """
    Request model for updating tasks, containing optional fields for partial updates.
    All fields are optional to support partial updates.
    """
    title: Optional[str] = Field(None, max_length=255, description="Task title (max 255 characters)")
    description: Optional[str] = Field(None, description="Optional task description")
    is_completed: Optional[bool] = Field(None, description="Completion status")


class TaskResponse(BaseModel):
    """
    Response model for task creation, containing all task fields including ID and timestamps.
    """
    id: str
    title: str
    description: Optional[str]
    user_id: str
    created_at: str
    updated_at: str
    completed: bool = False