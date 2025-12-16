# Implementation Plan: Secure Task Deletion and Completion Toggle

**Branch**: `008-secure-task-delete-toggle` | **Date**: Thursday, December 11, 2025 | **Spec**: [link to spec](../008-secure-task-delete-toggle/spec.md)
**Input**: Feature specification from `/specs/008-secure-task-delete-toggle/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement two secure API endpoints: a DELETE endpoint for removing tasks and a PATCH endpoint for toggling completion status, with corresponding professional UI controls in the Next.js frontend for the task dashboard.

## Technical Context

**Language/Version**: Python 3.11, TypeScript/JavaScript (Next.js 16+)
**Primary Dependencies**: FastAPI, SQLModel, Pydantic, React Hook Form, Next.js, React, Tailwind CSS, shadcn/ui
**Storage**: PostgreSQL (via Neon DB)
**Testing**: pytest, Jest
**Target Platform**: Web application (server-side rendering with client-side interactivity)
**Project Type**: Web (backend API + frontend dashboard)
**Performance Goals**: API response time <2 seconds under normal load, modal open + pre-populate time <1 second
**Constraints**: <30s API timeout, 255 char limit on task titles, 50 tasks per page with pagination
**Scale/Scope**: Individual user task lists, data isolation between users required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Compliance Verification:

**✅ Spec-Driven Implementation**: All code will be generated from the detailed Markdown specification created in the previous step, ensuring traceability between business requirements and implementation.

**✅ Monorepo Cohesion**: The implementation maintains clear separation between Next.js frontend and FastAPI backend while preserving seamless integration within the monorepo structure.

**✅ Security First**: The implementation will enforce strong user isolation using JWT tokens for both API endpoints (DELETE and PATCH), ensuring each user can only modify their own tasks as required by the specification. Critical security checks include:
  - Authentication verification via JWT token for all endpoints
  - Ownership validation using single-query verification (task ID and user ID checked simultaneously)
  - Proper HTTP response codes (401, 403) for different error scenarios
  - Prevention of data leakage between users

**✅ Scalability**: Using stateless FastAPI backend with Neon Serverless PostgreSQL database for efficient scaling.

**✅ Clean Code & Structure**: Following clean code principles with proper project structure using established patterns from the layered architecture.

**✅ Technology Stack Compliance**: Implementation strictly adheres to required stack: Next.js 16+ (App Router), Python FastAPI, SQLModel, Neon DB, and Better Auth.

**✅ REST API Standards**: The endpoints will be RESTful, secured by JWT, and adhere to the defined structure as specified.

**✅ Specification Detail**: All requirements from the feature specification will be implemented with detailed acceptance criteria.

**✅ Database Model**: Using SQLModel to define data models with proper `user_id` for ownership enforcement.

### Potential Violations:
None identified - full compliance with constitution principles.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── main.py              # FastAPI application entry point
├── database.py          # Database engine and session setup
├── models.py            # SQLModel models (User, Task)
├── schemas/task.py      # Pydantic schemas (TaskRead, TaskCreate, etc.)
├── routers/tasks.py     # Task endpoint definitions
├── core/
│   ├── dependencies.py  # Authentication dependencies
│   ├── security.py      # JWT utilities
│   └── config.py        # App configuration
└── tests/
    └── test_tasks*.py   # Task-related tests

frontend/
├── app/
│   └── dashboard/
│       └── page.tsx     # Dashboard page (Next.js 16+ App Router)
├── components/
│   ├── TaskList.tsx     # Task list component
│   ├── TaskToggleSwitch.tsx  # Task completion toggle component
│   ├── TaskDeleteConfirmModal.tsx  # Task deletion confirmation component
│   └── ui/              # Shadcn UI components
├── utils/
│   └── TaskAPIClient.ts # API client for task operations
├── types/
│   └── task.ts          # TypeScript definitions
└── tests/
    └── *.test.ts        # Frontend tests
```

**Structure Decision**: Web application with separate backend API and frontend dashboard, following the existing project architecture.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |