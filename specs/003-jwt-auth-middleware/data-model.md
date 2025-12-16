# Data Model: JWT Authentication

## Entities

### JWT Token
- **Type**: Secure token (JWT format)
- **Fields**:
  - `sub` (string): User identifier (subject)
  - `exp` (integer): Expiration timestamp (in seconds since epoch)
  - `iat` (integer): Issued at timestamp (in seconds since epoch)
  - `jti` (string, optional): JWT ID for unique identification
- **Relationships**: Associated with a User entity through the `sub` field
- **Validations**: Must be signed with the shared `BETTER_AUTH_SECRET`, must not be expired

### User Identity
- **Type**: User identification
- **Fields**:
  - `id` (string): Unique user identifier (corresponds to `sub` claim in JWT)
- **Relationships**: One-to-many with protected resources
- **Validations**: Must exist in the system and be active

### Protected Resource
- **Type**: Application resource requiring authentication
- **Fields**:
  - `owner_id` (string): ID of the user who owns this resource
  - `data` (object): The actual resource content
- **Relationships**: Belongs to a User Identity
- **Validations**: Access only allowed to the owner or authorized users