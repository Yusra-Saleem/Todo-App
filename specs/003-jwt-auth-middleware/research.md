# Research: JWT Authentication Dependency Implementation

## Decision: JWT Verification Library
**Rationale**: Selected `python-jose` for JWT verification based on project clarifications. This library is well-suited for FastAPI integration and provides comprehensive JWT handling capabilities including token decoding, verification, and error handling for expired signatures.

**Alternatives considered**:
- PyJWT: More lightweight but requires additional dependencies for some algorithms
- authlib: More comprehensive authentication library beyond just JWT handling

## Decision: Authentication Implementation Approach
**Rationale**: Implemented as a reusable Security dependency (`get_current_user_id`) using FastAPI's Depends system instead of global middleware. This approach provides more granular control over which endpoints require authentication and allows endpoints to access the authenticated user's ID when needed.

**Alternatives considered**:
- Global middleware: Authenticates all requests automatically but less granular control
- Mix of both approaches: More complex but potentially more flexible

## Decision: Authentication Scheme
**Rationale**: Using `HTTPBearer` from `fastapi.security` for extracting JWT tokens from the Authorization header. This is the standard approach for JWT token extraction in FastAPI applications.

**Alternatives considered**:
- OAuth2PasswordBearer: More suited for OAuth2 flows
- Custom header extraction: Less standardized approach

## Decision: User ID Field in JWT Payload
**Rationale**: Using the standard 'sub' (subject) claim from the JWT payload as the user identifier. This follows JWT standards and is compatible with Better Auth which typically uses this field.

**Alternatives considered**:
- Custom 'user_id' field: Non-standard approach
- Support both 'sub' and 'user_id': Added complexity with minimal benefit

## Decision: Error Response Format
**Rationale**: Using standard HTTP 401 Unauthorized responses with JSON body for authentication failures. This follows HTTP standards and provides structured error information to clients.

**Alternatives considered**:
- Custom status codes: Non-standard approach
- HTTP 403 Forbidden: More appropriate for authorization than authentication failures

## Decision: Token Validation Process
**Rationale**: Token validation will involve checking the signature using the shared `BETTER_AUTH_SECRET`, verifying the expiration time, and extracting the user ID from the 'sub' claim. This ensures tokens are authentic and current.

**Error handling considerations**:
- JWTError: General JWT-related errors
- ExpiredSignatureError: Specifically for expired tokens
- Other exceptions that might occur during token processing

## Decision: Security Dependencies Structure
**Rationale**: Splitting security implementation into two modules:
- `/backend/core/security.py`: Contains core token verification logic
- `/backend/core/dependencies.py`: Contains FastAPI dependency functions that use the verification logic

This separation of concerns makes the code more maintainable and testable.

## Security Best Practices
**Implementation considerations**:
- Secure storage of `BETTER_AUTH_SECRET` via environment variables
- Proper error handling that doesn't leak sensitive information
- Rate limiting considerations for authentication endpoints
- Token refresh and rotation strategies (for future implementation)