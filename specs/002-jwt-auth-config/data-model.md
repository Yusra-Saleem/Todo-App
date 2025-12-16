# Data Model: Better Auth and JWT Configuration

## Authentication Token

**Entity Name**: Authentication Token
- **Description**: A JWT token that represents an authenticated user session and is used to access protected resources
- **Fields**:
  - token (string): The JWT token string
  - userId (string): The ID of the authenticated user
  - expiration (datetime): When the token expires
  - createdAt (datetime): When the token was created
  - type (string): The type of token (e.g., "Bearer")

## Authentication Secret

**Entity Name**: Authentication Secret
- **Description**: A shared secret key used by both frontend and backend to sign and verify JWT tokens
- **Fields**:
  - secretKey (string): The shared secret key for JWT signing/verification
  - name (string): The name of the environment variable (e.g., "BETTER_AUTH_SECRET")
  - description (string): Description of the secret's purpose

## User Session

**Entity Name**: User Session
- **Description**: An authenticated state maintained through JWT tokens that allows users to access protected functionality
- **Fields**:
  - userId (string): The ID of the authenticated user
  - token (string): The current JWT token associated with the session
  - isActive (boolean): Whether the session is currently active
  - lastAccessed (datetime): When the session was last used
  - createdAt (datetime): When the session was created
  - expiresAt (datetime): When the session expires