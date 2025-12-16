"""
Test cases for the GET /api/tasks endpoint to validate:
1. Authentication: Unauthenticated requests return 401
2. Data isolation: Users only see their own tasks
"""
import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, select
from ..models import Task, User
from ..core.security import create_access_token
from uuid import uuid4

def test_get_tasks_unauthenticated(client: TestClient):
    """Test that unauthenticated requests to GET /api/tasks return 401"""
    response = client.get("/api/tasks")
    assert response.status_code == 401
    assert "detail" in response.json()


def test_get_tasks_authenticated_empty(client: TestClient, session: Session, user: User):
    """Test that authenticated users can retrieve their tasks (none in this case)"""
    # Create a token for the test user
    token = create_access_token(data={"sub": user.id})
    
    # Make authenticated request
    response = client.get(
        "/api/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 0  # No tasks for new user


def test_get_tasks_authenticated_with_data(client: TestClient, session: Session, user: User):
    """Test that authenticated users can retrieve their own tasks"""
    # Create a few tasks for the user
    task1 = Task(title="Task 1", user_id=user.id, completed=False)
    task2 = Task(title="Task 2", user_id=user.id, completed=True)
    session.add(task1)
    session.add(task2)
    session.commit()
    
    # Create a token for the test user
    token = create_access_token(data={"sub": user.id})
    
    # Make authenticated request
    response = client.get(
        "/api/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    
    # Verify that the tasks belong to the authenticated user
    for task in data:
        assert task["user_id"] == user.id
        # Verify expected fields are present
        assert "id" in task
        assert "title" in task
        assert "is_completed" in task
        assert "created_at" in task
        assert "updated_at" in task


def test_get_tasks_data_isolation(client: TestClient, session: Session):
    """Test that users can only see their own tasks, not others' tasks"""
    # Create two users
    user1 = User(email=f"user1_{uuid4()}@example.com")
    user2 = User(email=f"user2_{uuid4()}@example.com")
    session.add(user1)
    session.add(user2)
    session.commit()
    
    # Create tasks for user1
    task1_user1 = Task(title="User1 Task 1", user_id=user1.id, completed=False)
    task2_user1 = Task(title="User1 Task 2", user_id=user1.id, completed=True)
    session.add(task1_user1)
    session.add(task2_user1)
    
    # Create tasks for user2
    task1_user2 = Task(title="User2 Task 1", user_id=user2.id, completed=False)
    session.add(task1_user2)
    session.commit()
    
    # Get token for user1
    token_user1 = create_access_token(data={"sub": user1.id})
    
    # Get tasks as user1
    response_user1 = client.get(
        "/api/tasks",
        headers={"Authorization": f"Bearer {token_user1}"}
    )
    
    assert response_user1.status_code == 200
    user1_tasks = response_user1.json()
    assert len(user1_tasks) == 2
    
    # Verify user1 only sees their own tasks
    for task in user1_tasks:
        assert task["user_id"] == user1.id
        assert task["title"] in ["User1 Task 1", "User1 Task 2"]
    

def test_get_tasks_sorted_by_created_at(client: TestClient, session: Session, user: User):
    """Test that tasks are returned sorted by creation date (newest first)"""
    # Create tasks in chronological order (oldest first)
    task1 = Task(title="Oldest task", user_id=user.id, completed=False)
    task2 = Task(title="Middle task", user_id=user.id, completed=True)
    task3 = Task(title="Newest task", user_id=user.id, completed=False)
    
    # Manually set created_at to ensure specific order
    from datetime import datetime, timedelta
    task1.created_at = datetime.now() - timedelta(hours=2)
    task2.created_at = datetime.now() - timedelta(hours=1)
    task3.created_at = datetime.now()
    
    session.add(task1)
    session.add(task2)
    session.add(task3)
    session.commit()
    
    # Get token for the user
    token = create_access_token(data={"sub": user.id})
    
    # Get tasks
    response = client.get(
        "/api/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) == 3
    
    # Verify tasks are sorted by created_at (newest first)
    assert tasks[0]["title"] == "Newest task"
    assert tasks[1]["title"] == "Middle task"
    assert tasks[2]["title"] == "Oldest task"