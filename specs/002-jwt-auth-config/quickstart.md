# Quickstart: Better Auth and JWT Configuration

## Overview
This guide will help you implement Better Auth configuration across the monorepo with secure JWT authentication using a shared secret.

## Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Python 3.11+
- Better Auth package installed in frontend
- FastAPI and related packages installed in backend

## Files to Create

### 1. Environment Setup Documentation
Create `CLAUDE.md` at the root of the repository:

```markdown
# Environment Variable Setup

This project requires the following environment variables to be set:

## Authentication
- `BETTER_AUTH_SECRET`: The shared secret key used for signing and verifying JWT tokens between frontend and backend.

For local development, create a `.env.local` file in the frontend directory with the following content:

```env
BETTER_AUTH_SECRET=your-super-secret-key-here
```

> **IMPORTANT**: Use a strong, random secret key in production. For local development, you can generate a key using:
> `openssl rand -base64 32`
```

### 2. Backend Configuration
Create `/backend/core/config.py`:

```python
import os
from typing import Optional
from pydantic import BaseModel, validator


class AuthSettings(BaseModel):
    """Configuration settings for authentication."""
    
    better_auth_secret: Optional[str] = None
    
    @validator('better_auth_secret', pre=True)
    def validate_auth_secret(cls, v):
        """Validate that the auth secret is provided."""
        if not v:
            # In development, provide a default; in production, fail fast
            env = os.getenv("ENVIRONMENT", "development")
            if env == "production":
                raise ValueError("BETTER_AUTH_SECRET must be set in production")
            else:
                # For local development only
                fallback_secret = os.getenv("BETTER_AUTH_SECRET_FALLBACK", "dev-secret-key-change-in-production")
                print(f"WARNING: Using fallback auth secret. Please set BETTER_AUTH_SECRET environment variable.")
                return fallback_secret
        return v


def get_auth_settings() -> AuthSettings:
    """Get the authentication settings instance."""
    secret = os.getenv("BETTER_AUTH_SECRET")
    return AuthSettings(better_auth_secret=secret)


# Create a singleton instance
settings = get_auth_settings()
```

### 3. Frontend Configuration
Create `/frontend/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Define the auth options
const authOptions = {
  // Configure your providers here
  providers: [
    // Add your authentication providers (Google, GitHub, Credentials, etc.)
  ],
  secret: process.env.BETTER_AUTH_SECRET, // Use the shared secret
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT, account: any, profile: any }) {
      // Persist user information in the JWT token
      return token;
    },
    async session({ session, token }: { session: any, token: JWT }) {
      // Send properties to the client session
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page if needed
  },
  session: {
    strategy: 'jwt',  // Use JWT strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.BETTER_AUTH_SECRET, // Use the shared secret
  },
};

// Initialize NextAuth with the configuration
const handler = NextAuth(authOptions);

// Export the handler for different HTTP methods
export { handler as GET, handler as POST };
```

## Integration
1. Ensure the `BETTER_AUTH_SECRET` environment variable is properly set in both development and production environments
2. The backend will automatically load the secret from environment variables using the configuration file
3. The frontend will use the same secret for token generation and verification through the NextAuth configuration
4. Both systems will now use the same shared secret for JWT signing and verification

## Security Notes
- Never commit the `BETTER_AUTH_SECRET` to version control
- Use different secrets for development, staging, and production environments
- Rotate the secret periodically for improved security
- Ensure all connections to the authentication service use HTTPS/TLS