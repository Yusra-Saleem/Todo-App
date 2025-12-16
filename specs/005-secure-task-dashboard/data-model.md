# Data Model: Secure Task Dashboard

## Task Entity

### Fields
- `id` (Integer, Primary Key, Auto-generated)
- `title` (String, required)
- `is_completed` (Boolean, default: false)
- `created_at` (DateTime, Auto-generated)
- `updated_at` (DateTime, Auto-generated)
- `user_id` (Integer, Foreign Key to User, required for ownership)

### Relationships
- `Task` belongs to one `User` (Many-to-One)
- `User` has many `Task` objects (One-to-Many)

### Validation Rules
- `title` must not be empty
- `user_id` must reference a valid User
- All tasks must be associated with a specific user for data isolation

### State Transitions
- `is_completed` can transition from false to true (marking task as complete)
- `is_completed` can transition from true to false (unmarking task as complete)
- `title` can be updated while preserving ownership
- `user_id` cannot be changed after creation (ensures data ownership)

## User Entity (Referenced)

### Fields
- `id` (Integer, Primary Key, Auto-generated)
- `email` (String, required, unique)
- `hashed_password` (String, required)
- Additional fields as defined in auth implementation

### Validation Rules
- `email` must be unique and valid format
- `hashed_password` must meet security requirements