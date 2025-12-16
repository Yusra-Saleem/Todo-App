# Test Procedures: Secure Task Deletion and Completion Toggle

## Overview
This document provides test procedures for the DELETE /api/tasks/{id} and PATCH /api/tasks/{id}/complete endpoints, as well as the corresponding frontend components.

## API Tests

### 1. DELETE /api/tasks/{id} Endpoint

#### 1.1 Successful Task Deletion
```
curl -X DELETE \
  "http://localhost:8000/api/tasks/{task_id}" \
  -H "Authorization: Bearer [valid_jwt_token]" \
  -H "Content-Type: application/json"

# Expected: HTTP 204 No Content
# Verify: Task no longer exists in database
```

#### 1.2 Delete Non-Existent Task
```
curl -X DELETE \
  "http://localhost:8000/api/tasks/invalid-task-id" \
  -H "Authorization: Bearer [valid_jwt_token]" \
  -H "Content-Type: application/json"

# Expected: HTTP 404 Not Found
```

#### 1.3 Delete Another User's Task (Security Test)
```
curl -X DELETE \
  "http://localhost:8000/api/tasks/{another_user_task_id}" \
  -H "Authorization: Bearer [valid_jwt_token_from_different_user]" \
  -H "Content-Type: application/json"

# Expected: HTTP 403 Forbidden
# Verify: Task still exists in database
```

#### 1.4 Unauthenticated Request
```
curl -X DELETE \
  "http://localhost:8000/api/tasks/{task_id}" \
  -H "Content-Type: application/json"

# Expected: HTTP 401 Unauthorized
```

#### 1.5 Invalid Task ID Format
```
curl -X DELETE \
  "http://localhost:8000/api/tasks/invalid-format" \
  -H "Authorization: Bearer [valid_jwt_token]" \
  -H "Content-Type: application/json"

# Expected: HTTP 422 Unprocessable Entity
```

### 2. PATCH /api/tasks/{id}/complete Endpoint

#### 2.1 Successful Completion Toggle
```
curl -X PATCH \
  "http://localhost:8000/api/tasks/{task_id}/complete" \
  -H "Authorization: Bearer [valid_jwt_token]" \
  -H "Content-Type: application/json"

# Expected: HTTP 200 OK with updated Task object
# Response should have inverted is_completed value
```

#### 2.2 Toggle Non-Existent Task
```
curl -X PATCH \
  "http://localhost:8000/api/tasks/invalid-task-id/complete" \
  -H "Authorization: Bearer [valid_jwt_token]" \
  -H "Content-Type: application/json"

# Expected: HTTP 404 Not Found
```

#### 2.3 Toggle Another User's Task (Security Test)
```
curl -X PATCH \
  "http://localhost:8000/api/tasks/{another_user_task_id}/complete" \
  -H "Authorization: Bearer [valid_jwt_token_from_different_user]" \
  -H "Content-Type: application/json"

# Expected: HTTP 403 Forbidden
# Verify: Task completion status unchanged
```

#### 2.4 Unauthenticated Request
```
curl -X PATCH \
  "http://localhost:8000/api/tasks/{task_id}/complete" \
  -H "Content-Type: application/json"

# Expected: HTTP 401 Unauthorized
```

## Frontend Tests

### 3. Task Toggle Switch Component
1. **Component Render**: Verify the toggle switch renders for each task
2. **Status Change**: Click toggle switch and verify visual status updates
3. **API Call**: Confirm PATCH request is sent to correct endpoint with proper auth
4. **Error Handling**: Verify user-friendly error messages appear when toggling fails
5. **Loading States**: Verify loading indicator is shown during API call

### 4. Task Delete Confirmation Modal
1. **Modal Open**: Click delete button and verify confirmation modal appears
2. **Confirmation**: Click "Delete" and verify task is removed from list
3. **Cancellation**: Click "Cancel" and verify modal closes without action
4. **API Call**: Confirm DELETE request is sent to correct endpoint with proper auth
5. **Error Handling**: Verify user-friendly error messages appear when deletion fails

### 5. Task List Component Integration
1. **Delete Refresh**: After successful deletion, verify task list updates automatically
2. **Toggle Refresh**: After successful toggle, verify task list reflects new completion status
3. **Ownership Validation**: Verify users only see controls for their own tasks
4. **Performance**: Verify task list updates within 1 second of successful operations

## Security Tests

### 6. Authentication & Authorization
1. **JWT Token Required**: Both endpoints require valid JWT tokens
2. **Ownership Check**: Both endpoints verify task belongs to authenticated user
3. **Response Consistency**: Both endpoints return 403 for unauthorized access attempts
4. **No Leaked Data**: Users cannot see tasks belonging to other users through these endpoints

## Automated Test Scenarios

### 7. Using pytest (Backend)
```python
def test_delete_task_success():
    # Test successful task deletion with valid auth and ownership
    pass

def test_delete_task_unauthorized():
    # Test deletion attempt without authentication
    pass

def test_delete_task_wrong_user():
    # Test deletion attempt on task belonging to different user
    pass

def test_toggle_completion_success():
    # Test successful completion toggle with valid auth and ownership
    pass

def test_toggle_completion_unauthorized():
    # Test toggle attempt without authentication
    pass

def test_toggle_completion_wrong_user():
    # Test toggle attempt on task belonging to different user
    pass
```

### 8. Using Jest (Frontend)
```javascript
test('deleting a task sends DELETE request with correct parameters', async () => {
    // Test that clicking delete sends the correct API request
});

test('toggling completion sends PATCH request with correct parameters', async () => {
    // Test that clicking toggle sends the correct API request
});

test('security: user cannot delete another user\'s task', async () => {
    // Test that UI prevents or properly handles unauthorized deletion attempts
});
```