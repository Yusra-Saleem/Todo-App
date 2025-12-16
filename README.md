# Todo Application

This is a [Todo-2-Hackathon](https://github.com/microsoft/Todo-2-Hackathon) project generated with [Spec-Driven Development](https://github.com/microsoft/spec-driven-dev).

## Overview

This is a full-stack Todo application featuring:

- **Frontend**: Next.js 16+ application with React and TypeScript
- **Backend**: FastAPI with SQLModel and PostgreSQL
- **Authentication**: Better Auth for secure user management
- **UI Components**: Shadcn UI with responsive design
- **Database**: Neon PostgreSQL database with SQLModel ORM

## Features

- Professional landing page for unauthenticated users
- Seamless authentication with automatic redirects
- Full CRUD operations for tasks
- Responsive design with mobile-first approach
- Security validation with ownership checks
- End-to-end testing capabilities

## Getting Started

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   
   cd ../backend
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   - Create `.env` files with your database credentials and auth secrets

3. Run the applications:
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && uvicorn main:app --reload`

   Alternative backend command (if you encounter import errors):
   - `cd backend && python -m uvicorn main:app --reload`

## Database Schema

The application uses a PostgreSQL database with the following models:

### User Model
- `id`: Unique identifier for the user (UUID format)
- `email`: User's email address (unique)
- `created_at`: Timestamp when the user was created
- `updated_at`: Timestamp when the user was last updated

### Task Model
- `id`: Unique identifier for the task (UUID format)
- `title`: Title of the task (max 255 characters)
- `description`: Optional description of the task
- `completed`: Boolean indicating if the task is completed (default: False)
- `user_id`: Foreign key linking the task to the user who created it
- `created_at`: Timestamp when the task was created
- `updated_at`: Timestamp when the task was last updated

## API

The API provides endpoints to:
- Create new tasks
- Get user's tasks
- Update task status
- Delete tasks