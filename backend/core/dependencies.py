from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .security import verify_token

# Create an HTTP Bearer security scheme
security = HTTPBearer()


def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Dependency that extracts and validates the JWT token from the Authorization header,
    then returns the user ID from the token.
    
    Args:
        credentials: HTTP Authorization credentials from the request header
        
    Returns:
        User ID (sub) extracted from the JWT token
        
    Raises:
        HTTPException: If the token is invalid, expired, or missing
    """
    token = credentials.credentials
    user_id = verify_token(token)
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user_id