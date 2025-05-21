# AI-Powered Job Match Platform

An intelligent job matching platform that uses AI to provide personalized job recommendations based on user profiles.

## Features

- User Authentication (Sign up/Login)
- Profile Management (skills, experience, location)
- Job Listings
- AI-Powered Job Recommendations using Meta's 4-Maverick LLM
- Clean, responsive UI with Tailwind CSS

## Tech Stack

### Frontend

- React.js with TypeScript
- Tailwind CSS for styling
- Vercel AI SDK for LLM integration
- Framer Motion for animations

### Backend

- Node.js with Express
- PostgreSQL for data storage
- Prisma for database ORM
- Vercel AI SDK with Grok Provider
- JWT for authentication

## AI Integration

The platform uses Meta's 4-Maverick language model through the Vercel AI SDK to provide intelligent job recommendations. The AI system analyzes user profiles and job listings to suggest the most relevant positions.

### Prompt Engineering

The AI prompt is designed to:

1. Understand user's skills, experience, and preferences
2. Analyze job requirements and match them with user profile
3. Consider location preferences and job type

## Setup Instructions

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/inreal-job-portal.git
cd inreal-job-portal
```

2. Install dependencies:

```bash
# Frontend
npm install

# Backend
npm install
```

3. Set up environment variables:
Create `.env` files in both frontend and backend directories:

```
# Frontend .env
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend .env
DATABASE_URL=postgresql://username:password@localhost:5432/inreal
JWT_SECRET=your_jwt_secret
GROK_API_KEY=your_grok_api_key
```

4. Start the development servers:

```bash
# Backend
npm run dev

# Frontend (in a new terminal)
npm run dev
```

## API Documentation

### Authentication

- POST /api/auth/signup - Create new user
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout

### Profile Management

- GET /api/profile - Get user profile
- PUT /api/profile - Update user profile

### Job Recommendations

- POST /api/recommendations - Get AI-powered job recommendations

## Code Architecture

### Frontend

- Pages: Auth, Profile, Jobs, Recommendations
- Components: UI components using Shadcn
- Context: Auth and Job contexts
- Hooks: Custom hooks for API calls

### Backend

- Routes: API endpoints
- Controllers: Business logic
- Models: PostgreSQL schemas
- Services: AI integration and job matching

## Trade-offs and Assumptions

1. Using Meta's 4-Maverick model for its balance between cost and performance
2. Static job listings for MVP (can be extended to dynamic database)
3. Simple authentication for demonstration purposes
4. Basic error handling that can be enhanced
