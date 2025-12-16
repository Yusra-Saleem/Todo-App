from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """
    Application settings for authentication.
    """
    better_auth_secret: Optional[str] = None
    environment: str = "development"

    def model_post_init(self, __context):
        """
        Perform validation after model initialization.
        """
        if not self.better_auth_secret:
            # In development, provide a default; in production, raise an error
            if self.environment.lower() == "production":
                raise ValueError("BETTER_AUTH_SECRET must be set in production environment")
            else:
                # For local development only - this should be changed in production
                fallback_secret = os.getenv("BETTER_AUTH_SECRET_FALLBACK", "dev-secret-key-change-in-production")
                print(f"WARNING: Using fallback auth secret. Please set BETTER_AUTH_SECRET environment variable.")
                self.better_auth_secret = fallback_secret


# Create a singleton instance of settings
settings = Settings()


# JWT utility functions for token validation
def validate_jwt_token(token: str) -> bool:
    """
    Validate a JWT token using the shared secret.
    """
    from datetime import datetime
    from jose import jwt, JWTError, ExpiredSignatureError

    try:
        # Decode the token using the shared secret
        payload = jwt.decode(
            token,
            settings.better_auth_secret,
            algorithms=["HS256"]  # Using HS256 algorithm; can be configured as needed
        )

        # Check if the token is expired
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            return False

        return True
    except ExpiredSignatureError:
        # Token has expired
        return False
    except JWTError:
        # Invalid token
        return False
    except Exception:
        # Other error occurred
        return False


def decode_jwt_payload(token: str) -> Optional[dict]:
    """
    Decode a JWT token and return its payload without validation.
    """
    from jose import jwt, JWTError

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