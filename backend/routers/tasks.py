from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated, List
from datetime import datetime
from sqlmodel import Session, select, func
from uuid import UUID
from fastapi import Query

try:
    from .schemas.task import TaskCreate, TaskResponse
    from .core.dependencies import get_current_user_id
    from ..database import get_db_session
    from ..models import Task, User
    from .schemas.task import TaskRead, TaskUpdate
except ImportError:
    from schemas.task import TaskCreate, TaskResponse
    from core.dependencies import get_current_user_id
    from database import get_db_session
    from models import Task, User
    from schemas.task import TaskRead, TaskUpdate


router = APIRouter(prefix="/api", tags=["tasks"])


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_create: TaskCreate,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db_session: Session = Depends(get_db_session)
):
    """
    Create a new task for the authenticated user.
    The user ID is automatically extracted from the JWT token and assigned to the task.
    """
    # Validate inputs
    if not task_create.title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title is required and cannot be empty"
        )

    # Verify that the user exists before creating the task
    user = db_session.exec(select(User).where(User.id == current_user_id)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Create the task object with user_id from JWT token
    task = Task(
        title=task_create.title,
        description=task_create.description,
        user_id=current_user_id,  # This comes from the JWT token, not the request body
        completed=False,
    )

    # Add and commit to database
    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)

    # Convert SQLModel object to response format
    response = TaskResponse(
        id=task.id,
        title=task.title,
        description=task.description,
        user_id=task.user_id,
        created_at=task.created_at.isoformat(),
        updated_at=task.updated_at.isoformat(),
        completed=task.completed
    )

    return response


# Define a response model for paginated tasks
from pydantic import BaseModel

class PaginatedTasksResponse(BaseModel):
    """
    Response model for paginated tasks.
    """
    data: List[TaskRead]
    pagination: dict

@router.get("/tasks", response_model=PaginatedTasksResponse, status_code=status.HTTP_200_OK)
async def get_tasks(
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db_session: Session = Depends(get_db_session),
    page: int = Query(1, ge=1, description="Page number for pagination"),
    limit: int = Query(50, ge=1, le=100, description="Number of tasks per page")
):
    """
    Retrieve paginated tasks for the authenticated user, sorted by creation date (newest first).
    """
    # Calculate offset for pagination
    offset = (page - 1) * limit

    # Query to get paginated tasks for the authenticated user, sorted by creation date (newest first)
    statement = select(Task).where(Task.user_id == current_user_id).order_by(Task.created_at.desc()).offset(offset).limit(limit)
    tasks = db_session.exec(statement).all()

    # Count total tasks for the user to calculate pagination metadata
    total_count_statement = select(Task).where(Task.user_id == current_user_id)
    count_result = db_session.exec(select(func.count(Task.id)).where(Task.user_id == current_user_id))
    total_count = count_result.one()

    # Convert SQLModel objects to response format
    response_tasks = []
    for task in tasks:
        response_task = TaskRead(
            id=task.id,
            title=task.title,
            is_completed=task.completed,  # Using 'completed' from Task model
            created_at=task.created_at,
            updated_at=task.updated_at,
            user_id=task.user_id
        )
        response_tasks.append(response_task)

    # Calculate pagination metadata
    total_pages = (total_count + limit - 1) // limit
    has_next = page < total_pages
    has_prev = page > 1

    pagination = {
        "page": page,
        "limit": limit,
        "total": total_count,
        "pages": total_pages,
        "has_next": has_next,
        "has_prev": has_prev
    }

    return PaginatedTasksResponse(data=response_tasks, pagination=pagination)


@router.put("/tasks/{task_id}", response_model=TaskRead, status_code=status.HTTP_200_OK)
async def update_task(
    task_id: str,
    task_update: TaskUpdate,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db_session: Session = Depends(get_db_session)
):
    """
    Update an existing task for the authenticated user.
    Only updates the fields provided in the request (partial updates).
    Enforces ownership verification by checking that the task belongs to the authenticated user.
    """
    # Verify that the task exists and belongs to the authenticated user in a single query
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
    db_task = db_session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or you do not have permission to update this task"
        )

    # Prepare the update data by only updating fields that are provided
    update_data = task_update.dict(exclude_unset=True)

    # Update only the fields that were provided in the request
    for field, value in update_data.items():
        # Map the field names from the API (is_completed) to the model (completed)
        if field == "is_completed":
            setattr(db_task, "completed", value)
        else:
            setattr(db_task, field, value)

    # Update the updated_at timestamp
    db_task.updated_at = datetime.now()

    # Commit changes to database
    db_session.add(db_task)
    db_session.commit()
    db_session.refresh(db_task)

    # Convert SQLModel object to response format
    response = TaskRead(
        id=db_task.id,
        title=db_task.title,
        is_completed=db_task.completed,  # Using 'completed' from Task model
        created_at=db_task.created_at,
        updated_at=db_task.updated_at,
        user_id=db_task.user_id
    )

    return response


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db_session: Session = Depends(get_db_session)
):
    """
    Delete an existing task that belongs to the authenticated user.
    Enforces ownership verification by checking that the task belongs to the authenticated user.
    """
    # Verify that the task exists and belongs to the authenticated user in a single query
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
    db_task = db_session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or you do not have permission to delete this task"
        )

    # Delete the task from the database
    db_session.delete(db_task)
    db_session.commit()

    # Return 204 No Content as required by the specification
    return


@router.patch("/tasks/{task_id}/complete", response_model=TaskRead, status_code=status.HTTP_200_OK)
async def toggle_task_completion(
    task_id: str,
    current_user_id: Annotated[str, Depends(get_current_user_id)],
    db_session: Session = Depends(get_db_session)
):
    """
    Toggle the completion status of a task that belongs to the authenticated user.
    Enforces ownership verification by checking that the task belongs to the authenticated user.
    """
    # Verify that the task exists and belongs to the authenticated user in a single query
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user_id)
    db_task = db_session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or you do not have permission to update this task"
        )

    # Toggle the completion status
    db_task.completed = not db_task.completed
    # Update the updated_at timestamp
    db_task.updated_at = datetime.now()

    # Commit changes to database
    db_session.add(db_task)
    db_session.commit()
    db_session.refresh(db_task)

    # Convert SQLModel object to response format
    response = TaskRead(
        id=db_task.id,
        title=db_task.title,
        is_completed=db_task.completed,  # Using 'completed' from Task model
        created_at=db_task.created_at,
        updated_at=db_task.updated_at,
        user_id=db_task.user_id
    )

    return response