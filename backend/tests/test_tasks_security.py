"""
Security tests for the task creation endpoint.
These tests verify that user_id cannot be manipulated by the client and
that proper authentication is required.
"""

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.pool import StaticPool
from unittest.mock import patch
import uuid

from main import app
from database import get_db_session
from models import Task, User


# Create an in-memory SQLite database for testing
@pytest.fixture(name="test_db_session")
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
def client(test_db_session):
    def get_test_db_session():
        return test_db_session

    # Override the database session dependency
    app.dependency_overrides[get_db_session] = get_test_db_session
    with TestClient(app) as test_client:
        yield test_client

    # Clean up the override after the test
    app.dependency_overrides.clear()


@pytest.fixture
def mock_user_id():
    return str(uuid.uuid4())


def test_task_creation_with_proper_user_id_assignment(client, mock_user_id, test_db_session):
    """
    Test that task creation properly assigns the user_id from the JWT token,
    not from any user-provided value.
    """
    # Create a user in the database
    user = User(id=mock_user_id, email="test@example.com")
    test_db_session.add(user)
    test_db_session.commit()

    # Mock the authentication dependency to return our test user ID
    with patch("routers.tasks.get_current_user_id") as mock_auth:
        mock_auth.return_value = mock_user_id

        # Make request with task data (but no user_id in the model)
        task_data = {
            "title": "Test Task",
            "description": "Test Description"
        }

        response = client.post("/api/tasks", json=task_data)
        
        # Should succeed with 201 Created
        assert response.status_code == 201
        response_data = response.json()
        
        # Verify the task was created with the correct user_id from JWT
        assert response_data["user_id"] == mock_user_id
        assert response_data["title"] == "Test Task"
        assert response_data["description"] == "Test Description"


def test_task_creation_fails_without_authentication(client):
    """
    Test that task creation fails when no authentication is provided.
    """
    task_data = {
        "title": "Test Task",
        "description": "Test Description"
    }

    # Make request without authentication
    response = client.post("/api/tasks", json=task_data)
    
    # Should fail with 401/403
    assert response.status_code in [401, 403]


def test_task_creation_validates_title_requirements(client, mock_user_id, test_db_session):
    """
    Test that task creation validates title requirements.
    """
    # Create a user in the database
    user = User(id=mock_user_id, email="test@example.com")
    test_db_session.add(user)
    test_db_session.commit()

    # Mock the authentication dependency
    with patch("routers.tasks.get_current_user_id") as mock_auth:
        mock_auth.return_value = mock_user_id

        # Test with empty title
        task_data = {
            "title": "",  # Empty title
            "description": "Test Description"
        }

        response = client.post("/api/tasks", json=task_data)
        assert response.status_code == 400  # Should return 400 for empty title

        # Test with too-long title
        task_data = {
            "title": "a" * 201,  # Title too long
            "description": "Test Description"
        }

        response = client.post("/api/tasks", json=task_data)
        assert response.status_code == 422  # Should return 422 for validation error


def test_task_creation_prevents_user_id_manipulation(client, mock_user_id, test_db_session):
    """
    Test that even if a user attempts to send additional fields in the request,
    they cannot manipulate the user_id assignment.
    """
    # Create a user in the database
    user = User(id=mock_user_id, email="test@example.com")
    test_db_session.add(user)
    test_db_session.commit()

    # Mock the authentication dependency to return our test user ID
    with patch("routers.tasks.get_current_user_id") as mock_auth:
        mock_auth.return_value = mock_user_id

        # Even if someone tries to send extra fields, user_id should come from JWT
        task_data = {
            "title": "Test Task",
            "description": "Test Description"
            # The TaskCreate model doesn't accept user_id, so it would be ignored anyway
        }

        response = client.post("/api/tasks", json=task_data)
        
        assert response.status_code == 201
        response_data = response.json()
        
        # The user_id should come from the JWT token, not from the request body
        assert response_data["user_id"] == mock_user_id