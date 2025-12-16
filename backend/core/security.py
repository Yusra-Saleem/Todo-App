from datetime import datetime
from fastapi import HTTPException, status
from jose import jwt, JWTError, ExpiredSignatureError
from typing import Optional

from .config import settings


def verify_token(token: str) -> Optional[str]:
    """
    Verify a JWT token using the shared secret and return the user ID.

    Args:
        token: JWT token string to verify

    Returns:
        User ID (sub) from the token if valid, None otherwise
    """
    try:
        # Decode the token using the shared secret
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=["HS256"]
        )

        # Extract user ID from the 'sub' claim
        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: no user ID",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Check if the token is expired
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return user_id
    except ExpiredSignatureError:
        # Token has expired
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except JWTError:
        # Invalid token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception:
        # Other error occurred
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def decode_token_payload(token: str) -> Optional[dict]:
    """
    Decode a JWT token and return its payload without validation.
    
    Args:
        token: JWT token string to decode
        
    Returns:
        Token payload if successfully decoded, None otherwise
    """
    try:
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=["HS256"],
            options={"verify_signature": False}  # Only decode, don't verify
        )
        return payload
    except JWTError:
        return None
    except Exception:
        return None