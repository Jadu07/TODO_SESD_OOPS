
# Academic Result Management System

A comprehensive backend system for managing student results, exams, and academic records.

## Features

- **Student Management**: CRUD operations, filtering by department, batch, etc.
- **Subject Management**: Manage subjects, credits, and rules.
- **Enrollment**: Handle student enrollments per semester.
- **Exams**: Define exams types (Midterm, Endterm, etc.) and weightage.
- **Marks**: Record marks for students with validation.
- **Grading**: Configurable grade rules.
- **Analytics**:
  - SGPA/CGPA Calculation.
  - Student Transcripts.
  - Batch Rankings.

## Tech Stack

- Node.js
- Express
- TypeScript
- In-Memory Database (for blueprint/demo purposes)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Run:
   ```bash
   npm start
   ```

## API Endpoints

### Students
- `POST /students`
- `GET /students`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`

### Subjects
- `POST /subjects`
- `GET /subjects`
... (and so on)
