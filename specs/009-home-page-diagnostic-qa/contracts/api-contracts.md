# API Contracts: Home Page, Full System Diagnostic, and Final QA

**Feature**: Home Page, Full System Diagnostic, and Final QA
**Date**: Friday, December 12, 2025
**Branch**: 009-home-page-diagnostic-qa

## Overview

This document specifies the API contracts relevant to the validation functionality that will be used in the end-to-end testing requirements. These contracts ensure that all API endpoints function as expected during the full CRUD cycle and security validation.

## Authentication Endpoints

### POST /api/auth/login
Authenticate a user and return a JWT token.

**Request**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response** (200):
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string"
  }
}
```

**Response** (401):
```json
{
  "detail": "Invalid credentials"
}
```

### POST /api/auth/logout
Log out the current user.

**Request Headers**:
- Authorization: Bearer [token]

**Response** (200):
```json
{
  "message": "Successfully logged out"
}
```

## Task Management Endpoints

### GET /api/tasks
Retrieve paginated tasks for the authenticated user.

**Request Headers**:
- Authorization: Bearer [token]

**Query Parameters**:
- page (int, optional): Page number for pagination (default: 1)
- limit (int, optional): Number of tasks per page (default: 50, max: 100)

**Response** (200):
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "is_completed": "boolean",
      "created_at": "datetime",
      "updated_at": "datetime",
      "user_id": "string"
    }
  ],
  "pagination": {
    "page": "int",
    "limit": "int",
    "total": "int",
    "pages": "int",
    "has_next": "boolean",
    "has_prev": "boolean"
  }
}
```

**Response** (401): Unauthorized

### POST /api/tasks
Create a new task for the authenticated user.

**Request Headers**:
- Authorization: Bearer [token]

**Request Body**:
```json
{
  "title": "string (1-255 chars)",
  "description": "string (optional, max 1000 chars)"
}
```

**Response** (201):
```json
{
  "id": "string",
  "title": "string",
  "description": "string (optional)",
  "user_id": "string",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "completed": "boolean"
}
```

**Response** (400): Bad Request (invalid input)
**Response** (401): Unauthorized

### PUT /api/tasks/{id}
Update an existing task for the authenticated user.

**Request Headers**:
- Authorization: Bearer [token]

**Request Body**:
```json
{
  "title": "string (optional, max 255 chars)",
  "description": "string (optional)",
  "is_completed": "boolean (optional)"
}
```

**Response** (200):
```json
{
  "id": "string",
  "title": "string",
  "is_completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "user_id": "string"
}
```

**Response** (401): Unauthorized
**Response** (403): Forbidden (trying to modify another user's task)
**Response** (404): Not Found

### DELETE /api/tasks/{id}
Delete an existing task that belongs to the authenticated user.

**Request Headers**:
- Authorization: Bearer [token]

**Response** (204): No Content

**Response** (401): Unauthorized
**Response** (403): Forbidden (trying to delete another user's task)
**Response** (404): Not Found

### PATCH /api/tasks/{id}/complete
Toggle the completion status of a task that belongs to the authenticated user.

**Request Headers**:
- Authorization: Bearer [token]

**Response** (200):
```json
{
  "id": "string",
  "title": "string",
  "is_completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "user_id": "string"
}
```

**Response** (401): Unauthorized
**Response** (403): Forbidden (trying to modify another user's task)
**Response** (404): Not Found

## Diagnostic Endpoints (for testing purposes)

### GET /api/health
Check the health status of the application.

**Response** (200):
```json
{
  "status": "healthy",
  "timestamp": "ISO datetime"
}
```

### GET /api/diagnostic/packages
Get the list of installed packages and their versions (for diagnostic purposes).

**Request Headers**:
- Authorization: Bearer [token]

**Response** (200):
```json
{
  "backend": {
    "fastapi": "version",
    "sqlmodel": "version",
    "python-jose": "version",
    "...": "..."
  },
  "frontend": {
    "next": "version",
    "react": "version",
    "tailwindcss": "version",
    "...": "..."
  }
}
```

**Response** (401): Unauthorized