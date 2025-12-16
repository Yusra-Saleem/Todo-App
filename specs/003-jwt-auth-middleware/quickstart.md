# Quickstart: JWT Authentication Implementation

## Overview
This guide explains how to implement JWT authentication in the FastAPI backend using reusable security dependencies.

## Prerequisites
- Python 3.11+
- FastAPI framework
- python-jose library
- Shared `BETTER_AUTH_SECRET` configured

## Implementation Steps

### 1. Install Dependencies
Add the following to your `requirements.txt`:
```
python-jose[cryptography]
```

### 2. Create Security Module (`backend/core/security.py`)
```python
from datetime import datetime
from typing import Optional
from fastapi import HTTPException, status
from jose import JWTError, jwt, ExpiredSignatureError
from backend.core.config import settings


def verify_token(token: str) -> Optional[str]:
    """
    Verify a JWT token and return the user ID if valid.
    
    Args:
        token: JWT token string to verify
        
    Returns:
        User ID (sub claim) if token is valid, None otherwise
    """
    try:
        # Decode the token using the shared secret
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=["HS256"]
        )
        
        # Extract user ID from the 'sub' claim
        user_id = payload.get("sub")
        if user_id is None:
            return None
            
        # Check if the token is expired
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            return None
            
        return user_id
    except ExpiredSignatureError:
        # Token has expired
        return None
    except JWTError:
        # Invalid token
        return None
    except Exception:
        # Other error occurred
        return None
```

### 3. Create Dependencies Module (`backend/core/dependencies.py`)
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from .security import verify_token


security = HTTPBearer()


def get_current_user_id(token: HTTPBearer = Depends(security)) -> str:
    """
    FastAPI dependency that validates JWT token and returns user ID.
    
    Args:
        token: HTTPBearer token from Authorization header
        
    Returns:
        User ID from the validated token
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    user_id = verify_token(token.credentials)
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user_id
```

### 4. Using the Authentication in Endpoints
```python
from fastapi import FastAPI, Depends
from backend.core.dependencies import get_current_user_id

app = FastAPI()

@app.get("/protected-endpoint")
def protected_route(user_id: str = Depends(get_current_user_id)):
    return {"message": f"Hello user {user_id}, you are authenticated!"}
```

## Testing the Implementation
1. Generate a valid JWT token using Better Auth
2. Make a request with the token in the Authorization header: `Authorization: Bearer <token>`
3. Verify that authenticated requests succeed and unauthenticated requests return 401

## Error Handling
- Invalid tokens return HTTP 401 Unauthorized
- Expired tokens return HTTP 401 Unauthorized
- Missing tokens return HTTP 401 Unauthorized