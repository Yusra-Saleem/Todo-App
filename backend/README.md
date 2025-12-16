---
title: TaskZen Backend
emoji: 🚀
colorFrom: pink
colorTo: red
sdk: docker
app_port: 7860
pinned: false
---

# TaskZen Backend

This is the backend for TaskZen, a modern todo application.

## Configuration

This Space is configured to run using Docker.

## Environment Variables

You need to set the following environment variables in your Space settings:

- `SECRET_KEY`: A secret key for JWT token generation.
- `DATABASE_URL`: Your PostgreSQL database URL (e.g., from Neon or Supabase). If not set, it defaults to SQLite (which is ephermeral on Spaces).
- `ALGORITHM`: (Optional) Defaults to HS256.
- `ACCESS_TOKEN_EXPIRE_MINUTES`: (Optional) Defaults to 30.

## API Documentation

Once deployed, you can access the Swagger UI at `/docs`.
