# API Contract: JWT Token Validation

## Endpoint: Validate JWT Token

### Request
- **Method**: N/A (This is an internal validation function, not a direct API endpoint)
- **Purpose**: Validates a JWT token and extracts the user ID
- **Input**: 
  - `token` (string, required): JWT token from Authorization header
  - `secret` (string, required): Shared `BETTER_AUTH_SECRET` for validation

### Processing
1. Decode the JWT token using the HS256 algorithm
2. Verify the token signature using the provided secret
3. Check that the token has not expired (exp claim)
4. Extract the user ID from the `sub` claim

### Response
- **Success**: Returns the user ID (string) from the `sub` claim
- **Failure**: Raises appropriate HTTP exception with 401 Unauthorized status

### Error Cases
1. **Invalid Token**: Token format is invalid
   - Response: `HTTP 401 Unauthorized` with JSON body
   - Body: `{"detail": "Invalid authentication credentials"}`
   
2. **Expired Token**: Token has passed its expiration time
   - Response: `HTTP 401 Unauthorized` with JSON body
   - Body: `{"detail": "Token has expired"}`
   
3. **Invalid Signature**: Token signature doesn't match secret
   - Response: `HTTP 401 Unauthorized` with JSON body
   - Body: `{"detail": "Invalid authentication credentials"}`

### Security Requirements
- Token must be validated against the shared `BETTER_AUTH_SECRET`
- No sensitive information should be leaked in error responses
- Token validation must happen before any protected resource access