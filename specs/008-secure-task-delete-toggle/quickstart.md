# Quickstart Guide: Secure Task Deletion and Completion Toggle

## Overview
This guide provides instructions to set up and test the secure task deletion and completion toggle feature. This feature implements two key endpoints:
1. DELETE /api/tasks/{id} - Securely deletes a user's task
2. PATCH /api/tasks/{id}/complete - Toggles a task's completion status

## Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (or Neon DB connection)
- Git

## Setup Instructions

### Backend Setup
1. Install required backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Ensure authentication is properly configured with JWT keys in your environment variables

3. Verify that your database connection is working:
   ```bash
   python -c "from database import create_db_and_tables; create_db_and_tables()"
   ```

4. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000/api`

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Configure your environment variables:
   ```bash
   cp .env.example .env.local
   # Edit NEXT_PUBLIC_API_URL to match your backend server
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Implementation Steps

### 1. Backend Changes

1. **Update Task Schema**: Add the TaskUpdate model in `backend/schemas/task.py`
   - Define optional fields for partial updates
   - Include validation for field lengths

2. **Implement DELETE endpoint**: Update `backend/routers/tasks.py`
   - Implement `DELETE /api/tasks/{id}` route
   - Use single query to verify both task ID and user ID match
   - Return 204 No Content on successful deletion
   - Handle error cases properly (403, 404)

3. **Implement PATCH endpoint**: In the same file
   - Implement `PATCH /api/tasks/{id}/complete` route
   - Verify task ownership with authenticated user
   - Toggle the `completed` field value
   - Return updated task object
   - Handle error cases properly (403, 404)

### 2. Frontend Changes

1. **Update API Client**: Modify `frontend/utils/TaskAPIClient.ts`
   - Add `deleteTask(id)` method that sends DELETE request
   - Add `toggleTaskCompletion(id)` method that sends PATCH request
   - Include proper error handling and JWT token passing

2. **Create Toggle Component**: Create `frontend/components/TaskToggleSwitch.tsx`
   - Use React and TypeScript with proper typing
   - Implement toggle functionality with visual indication
   - Handle loading and error states
   - Integrate with API client for updates

3. **Create Confirmation Modal**: Create `frontend/components/TaskDeleteConfirmModal.tsx`
   - Implement a clean confirmation flow
   - Handle modal open/close states
   - Integrate with API client for deletion
   - Include proper UX feedback

4. **Integrate Components**: Update `frontend/components/TaskList.tsx`
   - Add toggle switch to each task row
   - Add delete button with confirmation modal
   - Update state management to refresh after operations
   - Ensure proper loading/error states

## Testing the Feature

### Manual API Testing

1. **Prepare Test Data**:
   - Authenticate as a user and get a JWT token
   - Create a test task for that user

2. **Test Deletion Endpoint**:
   ```bash
   curl -X DELETE \
     -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
     -H "Content-Type: application/json" \
     http://localhost:8000/api/tasks/TASK_ID_HERE
   ```

3. **Test Completion Toggle Endpoint**:
   ```bash
   curl -X PATCH \
     -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
     -H "Content-Type: application/json" \
     -d "{\"is_completed\": true}" \
     http://localhost:8000/api/tasks/TASK_ID_HERE/complete
   ```

4. **Verification Tests**:
   - Test that unauthenticated requests return 401
   - Test that a user cannot delete another user's task (should return 403)
   - Test that a user cannot toggle another user's task completion (should return 403)

### Frontend Testing

1. Navigate to the dashboard page
2. Verify that toggle switches appear for each task
3. Verify that delete buttons have confirmation modals
4. Test updating task completion status and verify the UI updates
5. Test deleting a task and verify it disappears from the list
6. Verify proper error handling when attempting operations on other users' tasks

## Integration Points

- Backend authentication system (JWT generation/verification)
- SQLModel database models for Task/User entities
- Frontend authentication state management
- Existing TaskList component structure
- TaskAPIClient for API communication

## Key Security Considerations

- Both endpoints verify ownership by checking the task's user_id matches the authenticated user
- The implementation uses a single database query to verify ownership, preventing unauthorized access
- Proper HTTP status codes are returned for various error conditions
- The frontend properly handles error states and displays appropriate feedback to the user