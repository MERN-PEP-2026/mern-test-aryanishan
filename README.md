# Student Course Management System

A simple app to manage your courses.

## What it does

- Register and login
- Add new courses
- View all your courses
- Edit courses
- Delete courses

## How to run

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000

## .env file (backend folder)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course-management
JWT_SECRET=anything_you_want
```

## Folder structure
```
backend/
  server.js
  src/
    controllers/
    models/
    routes/
    middleware/

frontend/
  src/
    components/
    context/
    App.jsx
```

## Built with
- React
- Node.js
- Express
- MongoDB

## Features
- ✅ Register/Login
- ✅ Create course
- ✅ View courses
- ✅ Edit course
- ✅ Delete course

That's it!
