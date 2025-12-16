# Todo App Frontend

This is the frontend for the Todo application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication and authorization
- Task management (create, read, update, delete)
- Task completion toggle
- Responsive design
- Clean, accessible UI components

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Better Auth for authentication
- Axios for API requests
- Zustand for state management

## Getting Started

### Prerequisites

- Node.js 18 or higher
- The backend API server (from the `backend` directory) running on port 8000

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root of the frontend directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
BETTER_AUTH_SECRET=your-super-secret-key-here
BETTER_AUTH_URL=http://127.0.0.1:8000
```

> **IMPORTANT**: Use a strong, random secret key in production. For local development, you can generate a key using:
> `openssl rand -base64 32`

### Running the Development Server

1. Start the backend server (from the `backend` directory):

```bash
cd ../backend
uvicorn main:app --reload --port 8000
```

2. Start the frontend development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
frontend/
├── app/                    # Next.js 13+ App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/            # React components
│   ├── ui/                # Reusable UI components (buttons, inputs, etc.)
│   ├── TaskDashboard.tsx  # Main task dashboard
│   ├── TaskList.tsx       # Task list component
│   ├── TaskItem.tsx       # Individual task component
│   ├── TaskForm.tsx       # Task creation form
│   ├── TaskEditModal.tsx  # Task editing modal
│   └── LoginForm.tsx      # Login form
├── hooks/                 # Custom React hooks
│   ├── useAuth.tsx        # Authentication hooks
│   └── useTasks.ts        # Task management hooks
├── types/                 # TypeScript type definitions
│   └── task.ts            # Task type definition
├── utils/                 # Utility functions
│   └── api.ts             # API utility functions
├── lib/                   # Library utilities
│   └── utils.ts           # Common utility functions
├── public/                # Static assets
└── package.json           # Project dependencies and scripts
```

## API Integration

This frontend integrates with the backend API defined in the `backend` directory. The main API endpoints used are:

- `GET /api/tasks` - Retrieve user's tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Toggle task completion
- `GET /user/profile` - Get user profile information

## Security

- JWT tokens are stored in localStorage (for demo purposes)
- Authentication state is managed with React Context
- All API requests include authentication headers
- Input validation is performed on the client side

## Environment Variables

- `NEXT_PUBLIC_API_URL` - URL of the backend API server (default: http://127.0.0.1:8000)
- `BETTER_AUTH_SECRET` - Secret key for JWT tokens (must match backend)
- `BETTER_AUTH_URL` - Backend API URL for auth verification

## Deployment

To build the application for production:

```bash
npm run build
```

The resulting static files can be served by any static hosting service.

## Learn More

To learn more about the technologies used in this project, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)