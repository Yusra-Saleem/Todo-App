# Research Findings: Better Auth and JWT Configuration

## Decision: Environment Variable Management
**Rationale**: Using both direct `process.env` access in Next.js (as per Next.js built-in handling) and `os.getenv()` in FastAPI provides secure and standard ways to manage secrets across both platforms without exposing them in code.
**Alternatives considered**: Using external secret management services (overhead for development), dedicated libraries like python-dotenv for backend (unnecessary complexity for production where secrets are provided by the platform).

## Decision: Frontend Configuration Location
**Rationale**: Following Next.js App Router conventions, `app/api/auth/[...nextauth]/route.ts` is the standard location for authentication routes using NextAuth.js/Better Auth.
**Alternatives considered**: lib/auth.ts (would not handle API routes), middleware.ts (not ideal for all auth operations), page-specific handlers (violates reusability principle).

## Decision: Backend Configuration Location
**Rationale**: Following FastAPI best practices, placing configuration in `backend/core/config.py` follows the principle of keeping security-related utilities in a dedicated module.
**Alternatives considered**: main.py (clutters main application file), models.py (mixes configuration with data models), utils/secrets.py (not aligned with core services).

## Decision: Environment Setup Documentation
**Rationale**: Creating both a `CLAUDE.md` with detailed setup instructions and a `.env.example` file provides clear guidance for developers and ensures proper security practices.
**Alternatives considered**: Just `.env.example` (lacks detailed instructions), just README.md (not in the conventional location for this project).

## Decision: Secret Loading Method
**Rationale**: Using `os.getenv("BETTER_AUTH_SECRET", default_value)` with proper validation provides safe fallback handling while ensuring the application fails fast if a critical secret is missing in production.
**Alternatives considered**: Direct `os.environ` access (raises exception without graceful fallback), Pydantic Settings with required fields (more complex but more robust, chosen for production).