# Todo API via OOP Structure

This project implements a Todo List API using Object-Oriented Programming (OOP) principles in TypeScript with Express and Mongoose.

## Structure

*   **App Class (`src/app.ts`)**: Main application class that initializes the server, database connection, and routes.
*   **ToDoRoutes Class (`src/Routes/todo.routes.ts`)**: Defines the API endpoints and maps them to controller methods.
*   **ToDoController Class (`src/controller/todo.controller.ts`)**: Handles HTTP requests and responses, interacting with the service layer.
*   **ToDoService Class (`src/schema/todo.service.ts`)**: Contains the business logic and interacts with the Mongoose model.
*   **ToDoModel (`src/schema/todo.schema.ts`)**: Defines the Mongoose schema for Todo items.

## API Endpoints

Base URL: `http://localhost:4000/api`

### 1. Get All Tasks
*   **Method**: `GET`
*   **URL**: `/tsk`
*   **Response**: Array of tasks.

### 2. Create Task
*   **Method**: `POST`
*   **URL**: `/tsk`
*   **Body**:
    ```json
    {
      "title": "Learn OOP",
      "description": "Study classes and inheritance in TypeScript"
    }
    ```

### 3. Update Task
*   **Method**: `PUT`
*   **URL**: `/tsk/:id`
*   **Body**: (Partial update allowed)
    ```json
    {
      "isCompleted": true
    }
    ```

### 4. Delete Task
*   **Method**: `DELETE`
*   **URL**: `/tsk/:id`

## Running the Project

Ensure MongoDB is running locally on port 27017.

```bash
npx ts-node-dev src/server.ts
```
