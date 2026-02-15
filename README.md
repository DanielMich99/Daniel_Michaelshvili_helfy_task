# Helfy Task Manager App

## Backend Setup
1. Open a terminal and navigate to the backend folder:
   `cd backend`
2. Install dependencies:
   `npm install`
3. Start the server:
   `npm start`
   (The server runs on port 4000)

## Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   `cd frontend`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
   (The application runs on port 3000)

## API Endpoints
- **GET** `/api/tasks` - Retrieve all tasks
- **POST** `/api/tasks` - Create a new task (Body: title, description, priority)
- **PUT** `/api/tasks/:id` - Update an existing task
- **DELETE** `/api/tasks/:id` - Delete a task
- **PATCH** `/api/tasks/:id/toggle` - Toggle task completion status
