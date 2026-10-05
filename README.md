# Student-Management-System-Task2-

A web app for keeping student records. You can add a student, view their details, edit them, and delete them. Built for Task 2 of the Auspify Full Stack Development Internship.

Live demo: [not deployed yet]

## Features

- Add a new student
- View a list of all students and open one to see full details
- Update a student's record
- Delete a student
- Server-side validation, so bad data (like an invalid email) is rejected with a clear error

## Tech stack

- Frontend: React, CSS
- Backend: Node.js, Express.js
- Database: MySQL

## Project structure

```
student-management-system/
  backend/
    config/
      db.js
    controllers/
      studentController.js
    routes/
      studentRoutes.js
    schema.sql
    server.js
    package.json
    .env.example
  frontend/
    src/
    package.json
  README.md
```

## Running it locally

You need Node 18+ and a running MySQL server.

### Database

```
mysql -u root -p < backend/schema.sql
```

This creates the database and the `students` table.

### Backend

```
cd backend
npm install
cp .env.example .env
npm start
```

The API runs at `http://localhost:5000`.

### Frontend

```
cd frontend
npm install
npm start
```

The app runs at `http://localhost:3000`.

## Environment variables

Set these in `backend/.env`:

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on, e.g. `5000` |
| `DB_HOST` | MySQL host, usually `localhost` |
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name, e.g. `student_management` |

Set this in `frontend/.env`:

| Variable | Description |
| --- | --- |
| `REACT_APP_API_URL` | Base URL of the backend, e.g. `http://localhost:5000/api` |

If you built the frontend with Vite instead of Create React App, the variable is `VITE_API_URL` and the dev server runs on port 5173.

## API endpoints

| Method | Endpoint | What it does |
| --- | --- | --- |
| GET | `/api/students` | List all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

### Student fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | integer | Set by the database |
| `first_name` | string | Required |
| `last_name` | string | Required |
| `email` | string | Required, must be unique |
| `course` | string | Required |
| `year_of_study` | integer | Required |
| `phone` | string | Optional |

Adjust this table to match your actual schema.


## Known limitations

- No login yet, so anyone with the link can edit records
- No pagination, so the list will get slow with thousands of students

## Author

Khamis Mgofi
