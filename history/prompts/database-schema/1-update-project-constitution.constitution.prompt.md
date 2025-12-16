---
id: 1
title: Update-project-constitution
stage: constitution
date: 2025-12-09
surface: agent
model: unspecified
feature: none
branch: main
user: user
command: /sp.constitution
labels: ["governance", "documentation", "specification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```
---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

/sp.constitution

Project: Hackathon II: The Evolution of Todo - Phase II (Full-Stack Web Application)

Core Principles:
- Spec-Driven Implementation: All code must be generated from detailed Markdown specifications (Constitution, Feature Specs, API Specs, Database Specs). [cite_start]Manual code writing is strictly prohibited[cite: 30, 31].
- [cite_start]Monorepo Cohesion: Maintain clear separation and seamless integration between the Next.js frontend, FastAPI backend, and shared specifications within the monorepo structure[cite: 171].
- [cite_start]Security First: Implement strong user isolation using JWT tokens for all API endpoints, ensuring each user only interacts with their own data[cite: 145, 163].
- [cite_start]Scalability: Design the FastAPI backend for stateless operation and utilize the Neon Serverless PostgreSQL database efficiently[cite: 133].
- [cite_start]Clean Code & Structure: Follow clean code principles, proper project structure, and the guidelines set forth in the layered CLAUDE.md files[cite: 97, 228].

Key Standards:
- [cite_start]Technology Stack Compliance: Strictly adhere to the required stack: Next.js 16+ (App Router), Python FastAPI, SQLModel, Neon DB, and Better Auth[cite: 136].
- [cite_start]REST API Standards: All endpoints must be RESTful, secured by JWT, and adhere to the defined structure (e.g., GET /api/{user_id}/tasks)[cite: 131, 137, 165].
- [cite_start]Specification Detail: Every feature must be backed by a Markdown Spec containing User Stories, Acceptance Criteria, and detailed API/Database requirements[cite: 179, 182, 185].
- [cite_start]Database Model: Use SQLModel to define data models and enforce the schema defined in /specs/database/schema.md, including `user_id` for ownership enforcement[cite: 136, 153].
- [cite_start]Output Verification: The resulting web application must implement all 5 Basic Level features (Add, Delete, Update, View, Mark Complete)[cite: 130].
```

## Response snapshot

The constitution has been successfully updated with the new core principles and standards as specified. Here's the summary:

- **New Version**: 1.1.0 (incremented from 1.0.0 due to addition of new principles)
- **Bump Rationale**: The version was incremented to minor version 1.1.0 because new principles and standards were added, which constitutes material expansion of guidance as per semantic versioning rules.
- **Files Updated**: The main constitution file at `.specify/memory/constitution.md` has been updated with the new content.
- **Suggested Commit Message**: `docs: amend constitution to v1.1.0 (principle additions + governance update)`
- **Placeholder Status**: The ratification date is still marked as `TODO(RATIFICATION_DATE): Original adoption date unknown` as it was not provided.
- **Last Amended Date**: Updated to today's date: 2025-12-09.

The new constitution now includes the following core principles:
1. Spec-Driven Implementation
2. Monorepo Cohesion
3. Security First
4. Scalability
5. Clean Code & Structure

And the following key standards:
1. Technology Stack Compliance
2. REST API Standards
3. Specification Detail
4. Database Model
5. Output Verification

## Outcome

- ✅ Impact: Updated project constitution with new principles and standards
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md was updated
- 🔁 Next prompts: None needed
- 🧠 Reflection: Successfully followed all steps to update the constitution

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A