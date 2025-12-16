# Quickstart Guide: Secure Task Update

## Overview
This guide provides quick instructions to get the secure task update feature up and running in your development environment.

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (or Neon DB connection)
- Git

## Backend Setup

1. **Install Python dependencies:**
```bash
cd backend
pip install -r requirements.txt
# If React Hook Form is used for consistency with frontend approach, ensure it's available in backend dev tools
```

2. **Set environment variables:**
```bash
# Copy .env.example to .env and fill in your values
cp .env.example .env
# Edit .env to include your database connection and JWT secret
```

3. **Run database migrations:**
```bash
# The application will automatically create tables on startup
python -c "from database import create_db_and_tables; create_db_and_tables()"
```

4. **Start the backend server:**
```bash
cd backend
python main.py
# Or using uvicorn: uvicorn main:app --reload
```

## Frontend Setup

1. **Install Node dependencies:**
```bash
cd frontend
npm install
# Install React Hook Form if not already included
npm install react-hook-form
npm install @hookform/resolvers # For validation with zod/yup
```

2. **Set frontend environment variables:**
```bash
# Copy example file and configure
cp .env.example .env.local
# Edit .env.local to match your backend API URL
```

3. **Start the frontend development server:**
```bash
cd frontend
npm run dev
```

## Key Endpoints

1. **API Base URL:** `http://localhost:8000/api`
2. **Secure Task Update Endpoint:** `PUT /api/tasks/{id}` (requires authentication)
3. **Dashboard UI:** `http://localhost:3000/dashboard`

## Testing the Feature

1. **Verify database models:**
   - Ensure User and Task models exist and are properly configured with SQLModel
   - Check that the `user_id` foreign key relationship is established

2. **Test authentication:**
   - Verify that JWT authentication is working
   - Test that unauthenticated requests to `/api/tasks/{id}` return 401

3. **Test ownership validation:**
   - Create tasks for different users
   - Verify User A cannot update User B's tasks (should return 403)

4. **Test task update functionality:**
   - As a user, update one of your own tasks
   - Verify the changes are persisted and returned correctly

5. **Test frontend modal:**
   - Navigate to the dashboard page
   - Click the edit icon on one of your tasks
   - Verify the modal opens and is pre-populated with the current task data
   - Update the task details and save
   - Verify the changes are reflected in the task list

## Common Issues & Solutions

### Authentication Issues
- Ensure JWT secret is properly set in both frontend and backend
- Verify that auth headers are being sent correctly from frontend to backend

### Database Connection Issues
- Check that your database URL is correctly configured
- Verify that database credentials have the necessary permissions

### Frontend-Backend Communication
- Confirm that NEXT_PUBLIC_API_URL is set correctly in frontend environment
- Check that CORS settings allow communication between frontend and backend

### Form Validation Issues
- Ensure React Hook Form is properly configured with appropriate validation schema
- Make sure error messages are properly displayed to the user

## Next Steps

1. Implement the `PUT /api/tasks/{id}` endpoint in the backend
2. Create the `TaskEditModal` component with React Hook Form
3. Integrate the modal with the `TaskList` component
4. Implement the `updateTask` function in the API client
5. Add error handling and appropriate user feedback