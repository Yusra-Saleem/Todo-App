# Feature Specification: Secure Task Deletion and Completion Toggle

**Feature Branch**: `008-secure-task-delete-toggle`
**Created**: Thursday, December 11, 2025
**Status**: Draft
**Input**: User description: "Secure Task Deletion and Completion Toggle (DELETE /api/tasks/{id} and PATCH /api/tasks/{id}/complete) ## Goal To implement two separate, secure API endpoints for removing a task (`DELETE`) and toggling its completion status (`PATCH`), and to integrate the necessary buttons/controls into the frontend `TaskList`. ## Backend Requirements (FastAPI) 1. **Deletion Endpoint:** `DELETE /api/tasks/{id}` 2. **Toggle Endpoint:** `PATCH /api/tasks/{id}/complete` 3. **Authentication & Ownership (Mandatory for BOTH):** * Both routes **MUST** use the `get_current_user_id` dependency for authentication. * Both routes **MUST** perform an **ownership check**: The task identified by `{id}` must belong to the authenticated user's ID. If the ownership check fails, return a `403 Forbidden` error. 4. **Deletion Logic:** On `DELETE`, securely retrieve the task (with ownership check), delete it from the database, and return a `204 No Content` status. 5. **Toggle Logic:** On `PATCH`, securely retrieve the task (with ownership check), toggle the boolean value of the `is_completed` field, commit the change, and return the updated `Task` object. ## Frontend Requirements (Next.js) 1. **Deletion Control:** Integrate a visible but discreet **Delete Button** or icon on each row of the `TaskList.tsx`. 2. **Confirmation UX:** Implement a small, simple **Confirmation Modal** or alert before finalizing the deletion to prevent accidental data loss. 3. **Toggle Control:** Implement an interactive control (e.g., a **Checkbox** or a **Toggle Switch**) on each row of the `TaskList.tsx` that directly calls the `PATCH /complete` endpoint. 4. **State Refresh:** Both successful operations (`DELETE` and `PATCH`) must trigger an immediate refresh of the `TaskList` component to reflect the changes to the user. **Next Action:** Plan the exact API implementation details, focusing on secure retrieval and efficient database commands."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Task Deletion (Priority: P1)

As an authenticated user, I want to securely delete my own tasks when they're no longer needed so that I can maintain a clean, organized task list.

**Why this priority**: This is core functionality that gives users control over their data, allowing them to remove tasks they no longer need while maintaining data security.

**Independent Test**: Can be fully tested by authenticating as a user, selecting one of their own tasks for deletion, confirming the delete action, and verifying that the task is no longer in their task list.

**Acceptance Scenarios**:

1. **Given** a user is authenticated and viewing their task list, **When** they click the delete button on one of their tasks and confirm the action, **Then** the task is permanently removed from the system and disappears from the task list
2. **Given** a user is authenticated, **When** they attempt to delete a task that doesn't exist, **Then** they receive a 404 response and the interface shows an appropriate error message
3. **Given** a user attempts to delete a task that belongs to another user, **When** they make the API request, **Then** they receive a 403 Forbidden response and the task remains unchanged

---

### User Story 2 - Secure Task Completion Toggle (Priority: P1)

As an authenticated user, I want to easily toggle the completion status of my tasks by clicking a control on the task list so that I can efficiently track my progress and mark completed work.

**Why this priority**: This is essential functionality for task management that allows users to mark work as complete, which is one of the core requirements for a task system.

**Independent Test**: Can be fully tested by authenticating as a user, clicking the completion toggle on one of their tasks, and verifying that the task's completion status is updated both in the interface and in the database.

**Acceptance Scenarios**:

1. **Given** a user is authenticated and has an incomplete task in their list, **When** they click the completion toggle for that task, **Then** the task's status changes to completed and the visual representation updates accordingly
2. **Given** a user is authenticated and has a completed task in their list, **When** they click the completion toggle for that task, **Then** the task's status changes to incomplete and the visual representation updates accordingly
3. **Given** a user attempts to toggle completion on a task belonging to another user, **When** they make the API request, **Then** they receive a 403 Forbidden response and the task remains unchanged

---

### User Story 3 - Safe Deletion Experience (Priority: P2)

As an authenticated user, I want to avoid accidentally deleting important tasks so that I don't lose critical information due to misclicks.

**Why this priority**: This improves user experience by reducing accidental data loss, which is important for user trust and satisfaction.

**Independent Test**: Can be fully tested by verifying that when a user clicks the delete button, a confirmation dialog appears with appropriate options to proceed or cancel.

**Acceptance Scenarios**:

1. **Given** a user clicks the delete button on a task, **When** the confirmation interface appears, **Then** they have clear options to confirm or cancel the deletion
2. **Given** a user has clicked delete and the confirmation appears, **When** they click cancel, **Then** the task remains unchanged and the confirmation disappears
3. **Given** a user has clicked delete and the confirmation appears, **When** they confirm deletion, **Then** the task is removed as expected

---

### Edge Cases

- What happens if a user tries to delete a task at the exact moment another user tries to access the same task ID (concurrency)?
- How does the system handle deletion requests coming in rapidly for the same task?
- What if the task ID in the URL is malformed or invalid (not a proper UUID)?
- How does the system handle network interruptions during either endpoint operation?
- What happens when the user's session expires mid-operation (while the confirmation modal is open)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide DELETE /api/tasks/{id} endpoint that requires authentication
- **FR-002**: System MUST provide PATCH /api/tasks/{id}/complete endpoint that requires authentication
- **FR-003**: Both endpoints MUST authenticate users via JWT token using get_current_user_id dependency
- **FR-004**: Both endpoints MUST verify ownership by using a single query that checks both task ID and user ID simultaneously for security and efficiency
- **FR-005**: DELETE endpoint MUST return 403 Forbidden if task doesn't belong to authenticated user
- **FR-006**: PATCH endpoint MUST return 403 Forbidden if task doesn't belong to authenticated user
- **FR-007**: DELETE endpoint MUST remove the task from the database and return 204 No Content on success
- **FR-008**: PATCH endpoint MUST toggle (invert) the is_completed field value and return the updated Task object on success
- **FR-009**: Frontend MUST display a delete button/icon on each task row in TaskList component
- **FR-010**: Frontend MUST show a confirmation prompt before executing deletion to prevent accidental data loss
- **FR-011**: Frontend MUST provide a toggle control (checkbox/toggle) for completion status on each task row
- **FR-012**: Frontend MUST refresh the task list after successful completion of either operation by re-fetching from the API to ensure consistency
- **FR-013**: Frontend MUST handle API errors gracefully (show appropriate user messages for 403, 404, 500 responses)
- **FR-014**: API endpoints MUST validate that {id} path parameter is a valid UUID format
- **FR-015**: PATCH endpoint MUST accept empty request body (toggle operation doesn't require data)
- **FR-016**: Frontend MUST implement dedicated reusable components (e.g., TaskDeleteButton.tsx, TaskCompletionToggle.tsx) for the task controls
- **FR-017**: System MUST update TaskAPIClient with dedicated functions for both deleteTask(id) and toggleTaskCompletion(id) operations

### Key Entities *(include if feature involves data)*

- **Task**: Represents a user's task with title, description, completion status, timestamps, and user ownership
- **User**: Represents an authenticated user who owns tasks and can delete or update the completion status of their own tasks only
- **TaskRead**: A Pydantic model for API response serialization containing task details after update operations

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Authenticated users can delete their tasks via API in under 2 seconds under normal load conditions
- **SC-002**: Authenticated users can toggle task completion via API in under 2 seconds under normal load conditions
- **SC-003**: Unauthenticated requests to either endpoint consistently return 401 Unauthorized responses
- **SC-004**: Users attempting to delete or toggle other users' tasks consistently receive 403 Forbidden responses
- **SC-005**: 95% of legitimate delete or toggle requests complete successfully under normal network conditions
- **SC-006**: 98% of users find the confirmation flow acceptable and not disruptive to their workflow
- **SC-007**: Task list UI updates within 1 second of successful completion of either operation
- **SC-008**: API endpoints handle malformed task IDs gracefully by returning 422 Validation Error responses

## Clarifications

### Session 2025-12-11

- Q: Should we use a single secure query that verifies both task ID and user ID simultaneously for the database operations? → A: Yes, use a single query with both ID and user_id for security and efficiency
- Q: For the PATCH endpoint, should the logic simply toggle (invert) the existing is_completed value? → A: Yes, simply toggle the existing is_completed field value
- Q: Should we create dedicated reusable components for the frontend controls rather than implementing directly in TaskList? → A: Yes, create dedicated reusable components for better code organization
- Q: Should TaskAPIClient be updated with dedicated functions for both operations? → A: Yes, update TaskAPIClient with dedicated functions for both operations
- Q: Should the TaskList after operations re-fetch from the API to ensure consistency? → A: Yes, use React state in parent component with proper re-fetching after operations