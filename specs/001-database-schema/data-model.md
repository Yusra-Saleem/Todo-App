# Data Model: Database Schema for Multi-User Todo Application

## User Model

**Entity Name**: User
- `id` (UUID, primary key): User ID from authentication provider (max 255 chars)
- `email` (string, unique): User's email address (max 255 chars)
- `tasks` (relationship): One-to-many relationship to Task model with back_populates

**Validation Rules**:
- Email must be unique and valid
- ID must be a valid UUID format from authentication provider

**Relationships**:
- One User to Many Tasks (one-to-many)

## Task Model

**Entity Name**: Task
- `id` (UUID, primary key): Unique task ID
- `title` (string, required): Task title (max 100 chars)
- `description` (text, nullable): Task description (optional)
- `completed` (boolean, default false): Completion status
- `created_at` (datetime, auto-set): Creation timestamp
- `updated_at` (datetime, auto-set): Update timestamp
- `user_id` (UUID, foreign key): References User.id with proper constraint
- `user` (relationship): Back-reference to User model with back_populates

**Validation Rules**:
- Title is required and must not exceed 100 characters
- Completed defaults to false
- Must be associated with a valid user via user_id foreign key

**State Transitions**:
- `completed`: false → true (when task is marked complete)
- `completed`: true → false (when task is marked incomplete)
- `updated_at`: Updates automatically when any field changes

**Relationships**:
- Many Tasks to One User (many-to-one)
- Bidirectional access via relationship with back_populates