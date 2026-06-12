# Quiz Builder

A full-stack web application for creating and managing quizzes with multiple question types.

## Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript, SCSS Modules, SWR, Axios  
**Backend:** Node.js, Express, TypeScript, Sequelize, PostgreSQL

---

## Prerequisites

- Node.js 20+
- PostgreSQL

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd quiz-builder
```

### 2. Set up the database

Open pgAdmin and create a new database named `quiz_builder`.

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quiz_builder
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3001
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Start the backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:3001`

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000`

---

## Features

- Create quizzes with custom titles and multiple questions
- Three question types:
  - **Boolean** — True / False options
  - **Input** — short text answer
  - **Checkbox** — multiple choice with custom options
- Dynamically add and remove questions
- View all quizzes with question count
- Delete quizzes with optimistic UI update
- View full quiz details in read-only mode

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with navigation |
| `/create` | Create a new quiz |
| `/quizzes` | List of all quizzes |
| `/quizzes/:id` | Quiz detail page |

---

## Creating a Sample Quiz

1. Go to `http://localhost:3000/create`
2. Enter a quiz title
3. Add questions — supported types:
   - **Input** — short text answer
   - **Boolean** — True / False
   - **Checkbox** — multiple choice options
4. Click **Create Quiz**

---

## Project Structure

```
quiz-builder/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── types/
└── frontend/
    └── src/
        ├── app/
        │   ├── create/
        │   ├── quizzes/
        │   └── quizzes/[id]/
        ├── api/
        │   └── quiz/
        ├── components/
        └── types/
```