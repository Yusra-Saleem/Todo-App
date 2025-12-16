# Research Findings: Database Schema for Multi-User Todo Application

## Decision: SQLModel Inheritance Pattern
**Rationale**: For FastAPI applications with SQLModel, inheriting directly from `SQLModel` is the standard approach that provides both Pydantic validation and SQL capabilities in one class. This avoids unnecessary complexity while maintaining all required functionality.
**Alternatives considered**: Inheriting from both SQLModel and BaseModel was considered but rejected as it adds unnecessary complexity without clear benefits.

## Decision: Timestamp Field Implementation
**Rationale**: Using `datetime.datetime` with `Field(default_factory=datetime.utcnow)` properly handles automatic timestamp generation for `created_at` and `updated_at` fields in SQLModel. This approach ensures consistency and leverages SQLModel's built-in functionality.
**Alternatives considered**: Using database-level defaults via `sa.DateTime(timezone=True)` was considered but rejected as application-level handling is preferred for consistency across different database systems.

## Decision: Foreign Key Field Type
**Rationale**: Using `UUID` type with `Field(foreign_key="users.id")` is appropriate since Better Auth provides UUID-based user IDs. This properly enforces referential integrity while matching the authentication provider's data format.
**Alternatives considered**: String type without foreign key constraint was considered but rejected as it would not enforce data integrity.

## Decision: Database Initialization Location
**Rationale**: Following FastAPI best practices, placing the `create_db_and_tables()` function in `/backend/database.py` creates a dedicated database module that can handle all database-related functionality.
**Alternatives considered**: Placing in `main.py` was considered but rejected as it violates separation of concerns.

## Decision: Relationship Configuration
**Rationale**: Using `Relationship()` with `back_populates` on both models provides bidirectional access between User and Task models, making it easier to navigate the object graph in both directions.
**Alternatives considered**: Unidirectional relationship was considered but rejected as it limits flexibility when accessing related objects.