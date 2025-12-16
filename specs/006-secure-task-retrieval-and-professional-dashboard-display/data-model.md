# Data Model: Secure Task Retrieval and Professional Dashboard Display

## Entity Definitions

### Task Entity
- **Name**: Task
- **Description**: Represents a user's task with title, description, completion status, timestamps, and user ownership
- **Fields**:
  - `id`: str (UUID, primary key, unique identifier)
  - `title`: str (max 255 characters, required)
  - `description`: Optional[str] (nullable, text description of the task)
  - `completed`: bool (default: false, completion status)
  - `user_id`: str (foreign key to User.id, establishes ownership)
  - `created_at`: datetime (timestamp when task was created, indexed)
  - `updated_at`: datetime (timestamp when task was last updated)

### User Entity
- **Name**: User
- **Description**: Represents an authenticated user who owns tasks and can access their own tasks only
- **Fields**:
  - `id`: str (UUID, primary key, unique identifier)
  - `email`: str (max 255 characters, unique, email address)
  - `created_at`: datetime (timestamp when user was created)
  - `updated_at`: datetime (timestamp when user was last updated)
  - `tasks`: List[Task] (relationship to child tasks)

### TaskRead DTO
- **Name**: TaskRead
- **Description**: A dedicated DTO for API response serialization containing task details for display
- **Fields**:
  - `id`: str (UUID, unique identifier)
  - `title`: str (task title)
  - `is_completed`: bool (completion status)
  - `created_at`: datetime (timestamp when task was created)
  - `updated_at`: datetime (timestamp when task was last updated)
  - `user_id`: str (user identifier for the task owner)

## Relationships

### Task → User (Many-to-One)
- Task has a `user_id` foreign key that references User.id
- Task entity has a `user` relationship field to access the owning user
- User entity has a `tasks` relationship field to access owned tasks
- Cascade delete: When a user is deleted, all their tasks are also deleted

## Validation Rules

### Task Validation
- `title` must be between 1 and 255 characters
- `user_id` must reference a valid User entity
- `completed` defaults to false when creating a new task
- `created_at` automatically set on creation
- `updated_at` automatically updated on any modification

### User Validation
- `email` must be a valid email format
- `email` must be unique across all users
- `id` automatically generated as UUID on creation

## State Transitions

### Task Completion State
- Initial state: `completed = false`
- When toggled: `completed` switches from false to true or true to false
- `updated_at` timestamp is automatically updated on any state change

## Indexing Strategy

### Task Table Indexes
- Primary index on `id`
- Foreign key index on `user_id` for efficient user-based filtering
- Index on `created_at` for efficient sorting of task lists

### User Table Indexes
- Primary index on `id`
- Unique index on `email` to enforce uniqueness constraint

## API Response Model

### TaskRead Schema
- This Pydantic model is used exclusively for API responses
- Contains all fields needed for frontend display
- `is_completed` field maps to internal `completed` field
- Includes `user_id` to maintain ownership information in responses
- Compatible with SQLModel for serialization from database objects