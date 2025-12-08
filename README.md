# Studio Ghibli Project

> A React + GraphQL application showcasing Studio Ghibli films. This monorepo contains both frontend and backend packages managed through [lerna](https://github.com/lerna/lerna).

## Getting Started

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <your-fork-url>
   cd studio-ghibli-project
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

   We use [pnpm workspaces](https://pnpm.io/workspaces) for dependency sharing between packages.

3. **Copy .env.example values into .env file**:

   ```bash
   cp ./packages/backend/.env.example ./packages/backend/.env
   cp ./packages/frontend/.env.example ./packages/frontend/.env
   ```

4. **Start the development servers**:

- **Backend (GraphQL Server)**:

  ```bash
  cd packages/backend
  pnpm dev
  ```

  The GraphQL server will start on `http://localhost:8080`

- **Frontend (React App)**:

  ```bash
  cd packages/frontend
  pnpm dev
  ```

  The React app will start on `http://localhost:3000`

## Project Structure

- `packages/backend/` - GraphQL server with Apollo Server
- `packages/frontend/` - React application with Apollo Client

## Available Scripts

### Backend

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm test` - Run tests

### Frontend

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests

## Project Overview

Full stack Studio Ghibli demo built with:

- Frontend: React + TypeScript + Vite + Apollo Client
- Backend: Node GraphQL server that proxies the public Studio Ghibli API

Core UX:
-Landing view with a centered title and subtitle:
Title: “Discover Studio Ghibli Films”
Subtitle: “Select a film & hover to learn more”

-A single responsive row of four film cards:
Porco Rosso
Kiki's Delivery Service
Howl's Moving Castle
My Neighbor Totoro

-Default state:
Card is rendered from static FilmInfo data (id, title, color key)
Card shows only the film name and a custom circular arrow button

On select:
-Click on the arrow triggers a GraphQL query for that specific film
-Loading state is shown inside the circular button
-When data returns, card becomes:

Front: poster image + title
Back: hover or tap to flip and show banner, description, director, release date, runtime, and Rotten Tomatoes score

Frontend and backend are decoupled but wired together through a typed GraphQL schema and codegen generated hooks.

### Dev-Tasks Process

This project follows the dev-tasks workflow described in .cursor/rules and implemented under /tasks.

- generated PRD
- generated task list from PRD
- used task list processer to complete and mark each task

### Time Spent

- Recommended 4 hours is a major underestimation.
- Spent about 9-10 hours on cursor learning curve, backend, frontend, styling, manual testing

### Rationale

- abstracted customized styled components to share folder for cleanliness and readability
- strict type assertion to catch bugs as soon as possible

### Challenges

- to complete an extensive list of requirements in a short amount of time
- have never used cursor
- selected vs hover logic
- needed clarity on if the user can select more than one film

### Limitations

- in mock up, the movie title is bolded and added to the beginning of the movie description, but some movie descriptions didn't work like that (ie. Howls Moving Castle + its description)

### Future Improvements:

- improve type assertions on backend and in cursor that generates the frontend graphql logic from the backend schema
- update backend schema's attribute keys to match ghibli API identically so we don't have to manipulate and match keys from API to backend
