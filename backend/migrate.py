"""
Database migration script to add missing hashed_password column to users table
"""
import os
from sqlmodel import create_engine
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# Determine if we're using SQLite for proper connection handling
if DATABASE_URL.startswith("sqlite"):
    # For SQLite, disable pooling and enable check_same_thread for development
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        connect_args={"check_same_thread": False}  # Required for SQLite in FastAPI
    )
else:
    # For PostgreSQL and other databases, use default settings
    engine = create_engine(DATABASE_URL, echo=False)

def add_hashed_password_column():
    """Add the hashed_password column to users table if it doesn't exist."""
    with engine.connect() as conn:
        # Check if the column exists
        result = conn.execute(text("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name='users' AND column_name='hashed_password'
        """))

        if not result.fetchone():
            # Column doesn't exist, add it
            print("Adding hashed_password column to users table...")
            conn.execute(text("""
                ALTER TABLE users
                ADD COLUMN hashed_password VARCHAR(255)
            """))
            conn.commit()
            print("Column added successfully!")
        else:
            print("Column already exists.")

if __name__ == "__main__":
    add_hashed_password_column()