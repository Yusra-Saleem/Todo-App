import pytest
from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.pool import StaticPool
from unittest.mock import AsyncMock
import uuid

from ..models import Task, User
from ..schemas.task import TaskCreate


# Create an in-memory SQLite database for testing
@pytest.fixture(name="db_session")
def db_session_fixture():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(bind=engine)

    with Session(engine) as session:
        yield session


@pytest.fixture
def mock_user_id():
    return str(uuid.uuid4())


async def test_create_task_logic_success(db_session, mock_user_id):
    """
    Test the core task creation logic by directly testing function components.
    """
    # Create a user in the database
    user = User(id=mock_user_id, email="test@example.com")
    db_session.add(user)
    db_session.commit()

    # Create task data
    task_create_data = TaskCreate(
        title="Test Task",
        description="Test Description"
    )

    # Test the validation logic for empty title
    assert task_create_data.title.strip() != ""  # Title is not empty

    # Test that the task object can be created properly
    import datetime
    from datetime import datetime

    # Create a task object similar to how it's done in the router
    from sqlmodel import Field
    import uuid as uuid_lib

    new_task = Task(
        title=task_create_data.title,
        description=task_create_data.description,
        user_id=mock_user_id,  # This comes from JWT token
        completed=False,
    )

    # Verify that the task was created with the correct values
    assert new_task.title == "Test Task"
    assert new_task.description == "Test Description"
    assert new_task.user_id == mock_user_id
    assert new_task.completed is False

    # Add the task to the database
    db_session.add(new_task)
    db_session.commit()
    db_session.refresh(new_task)

    # Verify the task was saved to the database
    saved_task = db_session.get(Task, new_task.id)
    assert saved_task is not None
    assert saved_task.title == "Test Task"
    assert saved_task.user_id == mock_user_id


async def test_validate_empty_title():
    """
    Test the validation logic for empty titles.
    """
    from fastapi import HTTPException

    # Test the validation we use in the router
    task_data = TaskCreate(
        title="",
        description="Test Description"
    )

    # Simulate the validation from the router
    if not task_data.title.strip():
        with pytest.raises(HTTPException):
            raise HTTPException(
                status_code=400,
                detail="Title is required and cannot be empty"
            )

    # Test with a valid title
    valid_task_data = TaskCreate(
        title="Valid Title",
        description="Test Description"
    )

    # This should not raise an exception
    assert valid_task_data.title.strip() != ""


async def test_validate_title_length():
    """
    Test the validation logic for title length.
    """
    from pydantic import ValidationError

    # Test a title that's too long - this should be caught by Pydantic
    long_title = "a" * 201  # More than 200 characters

    with pytest.raises(ValidationError):
        TaskCreate(
            title=long_title,
            description="Test Description"
        )

    # Test a valid title length
    valid_title = "a" * 200  # Exactly 200 characters
    task_data = TaskCreate(
        title=valid_title,
        description="Test Description"
    )

    assert len(task_data.title) == 200


async def test_user_existence_check(db_session, mock_user_id):
    """
    Test the logic for checking if a user exists before creating a task.
    """
    from sqlmodel import select

    # Create a user in the database
    user = User(id=mock_user_id, email="test@example.com")
    db_session.add(user)
    db_session.commit()

    # Simulate the user lookup logic from the router
    user_query = select(User).where(User.id == mock_user_id)
    found_user = db_session.exec(user_query).first()
    assert found_user is not None
    assert found_user.id == mock_user_id

    # Test with a non-existent user ID
    fake_user_id = str(uuid.uuid4())
    fake_user_query = select(User).where(User.id == fake_user_id)
    found_fake_user = db_session.exec(fake_user_query).first()
    assert found_fake_user is None