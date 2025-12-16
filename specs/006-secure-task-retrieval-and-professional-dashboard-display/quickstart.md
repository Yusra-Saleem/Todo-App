# Quickstart Guide: Secure Task Retrieval and Professional Dashboard Display

## Overview
This guide provides quick instructions to get the secure task listing feature up and running in your development environment.

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
2. **Secure Tasks Endpoint:** `GET /api/tasks` (requires authentication)
3. **Dashboard UI:** `http://localhost:3000/dashboard`

## Testing the Feature

1. **Verify database models:**
   - Ensure User and Task models exist and are properly configured with SQLModel
   - Check that the `user_id` foreign key relationship is established

2. **Test authentication:**
   - Verify that JWT authentication is working
   - Test that unauthenticated requests to `/api/tasks` return 401

3. **Test data isolation:**
   - Create tasks for different users
   - Verify User A cannot see User B's tasks

4. **Test dashboard UI:**
   - Navigate to the dashboard page
   - Verify tasks load and display properly
   - Test pagination with multiple tasks

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

## Next Steps

1. Implement the `GET /api/tasks` endpoint according to the API contract
2. Create the TaskList component with professional styling
3. Integrate the component into the dashboard page
4. Add pagination controls to the UI
5. Implement comprehensive error handling