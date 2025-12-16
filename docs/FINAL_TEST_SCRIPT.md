# FINAL TEST SCRIPT

## Overview

This document details the exact, step-by-step process for performing the **Full CRUD Cycle** and **Security Validation** tests, clearly stating expected outcomes (e.g., 200 OK, 401 Unauthorized, 403 Forbidden).

## Testing Requirements

### Full CRUD Cycle Test

Execute the complete end-to-end flow manually:

1. **Sign In**
   - Navigate to `/auth/signin`
   - Enter valid credentials
   - Verify successful authentication and redirect to dashboard

2. **Create Task**
   - On dashboard, click "Add Task"
   - Enter a task title and description
   - Click "Create"
   - Verify task appears in task list

3. **List Tasks**
   - View the task list on the dashboard
   - Verify the created task is displayed
   - Test pagination if multiple pages exist

4. **Update Task**
   - Click the edit icon next to a task
   - Modify the task title or description
   - Save the changes
   - Verify updates are reflected in the list

5. **Toggle Complete**
   - Click the completion checkbox for a task
   - Verify the task is marked as completed (strikethrough, etc.)
   - Click again to mark as incomplete
   - Verify changes are reflected

6. **Delete Task**
   - Click the delete icon next to a task
   - Confirm deletion in the modal
   - Verify task is removed from the list

7. **Sign Out**
   - Click the "Sign Out" button in the header
   - Verify return to the login page
   - Try accessing dashboard directly - should redirect to login

### Security Validation Tests

Run the following cURL commands to validate security:

**Test 1: Unauthenticated Access (should return 401)**
```bash
curl -X GET "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json"
# Expected: 401 Unauthorized
```

**Test 2: Access with Valid Token**
```bash
curl -X GET "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_VALID_JWT_TOKEN"
# Expected: 200 OK with task list
```

**Test 3: Invalid Task Modification (should return 403)**
```bash
curl -X PUT "http://localhost:8000/api/tasks/SOMEONE_ELSES_TASK_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Modified Title"}'
# Expected: 403 Forbidden
```

### Database Connection Test

Verify the application successfully connects to and transacts with the Neon PostgreSQL database:

```bash
# Test basic connectivity
curl -X GET "http://localhost:8000/api/health"
# Expected: 200 OK with health status

# Test database operations through API
curl -X POST "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_VALID_JWT_TOKEN" \
  -d '{"title": "Test DB Connection", "description": "Test task for DB validation"}'
# Expected: 201 Created with new task object
```

## Running Automated Tests

Execute the full test suite to validate all functionality:

```bash
# Backend tests
cd backend && pytest

# Frontend tests
cd frontend && npm test

# Integration tests
npm run test:e2e
```

## Expected Outcomes

After completing all phases:

- The home page serves a professional landing page for unauthenticated users
- Authenticated users are automatically redirected to the dashboard
- All diagnostic checks pass with no errors
- Full CRUD operations work correctly
- Security validation passes with proper 401/403 responses
- Database connection is confirmed to be working
- UI/UX meets professional standards with perfect mobile responsiveness