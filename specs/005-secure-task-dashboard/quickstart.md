# Quickstart: Secure Task Dashboard

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL (or Neon Serverless PostgreSQL account)
- Better Auth account (if using)

## Backend Setup

1. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database and auth configuration
   ```

3. Run database migrations:
   ```bash
   python -m database migrate
   ```

4. Start the backend server:
   ```bash
   python -m main
   ```

## Frontend Setup

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your auth and API configuration
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```

## Running Tests

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Key Endpoints

- **GET /api/tasks**: Retrieve all tasks for the authenticated user
  - Requires valid JWT token in Authorization header
  - Returns tasks sorted by creation date (newest first)
  - Returns 401 if token is invalid or missing

## Key Components

- `TaskList.tsx`: Fetches and displays user's tasks in a professional table
- `TaskAPIClient.ts`: Handles authenticated API calls to the backend
- `GET /api/tasks`: Backend route that filters tasks by authenticated user ID

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: JWT signing secret (shared with frontend)
- `ENVIRONMENT`: Current environment (development, staging, production)

### Frontend (.env.local)
- `BETTER_AUTH_SECRET`: JWT signing secret (shared with backend)
- `NEXT_PUBLIC_API_URL`: Base URL for backend API