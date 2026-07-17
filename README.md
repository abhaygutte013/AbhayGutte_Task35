# Todo App
This is my Todo App project made using React, Node.js, Express.js and MongoDB.
In this project user can add task, update task, delete task and search task. Data is saved in MongoDB database.
## Technology Used

Frontend
- React
- Vite
- Axios
- CSS

Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Features

- Add new task
- Show all tasks
- Edit task
- Delete task
- Search task
- Change task status
- Data save in MongoDB

## Folder Structure

## Backend

todo-backend
|
|-- config-{db.js}
|-- controllers-{taskController.js}
|-- models-{Task.js}
|-- routes-{TaskRoutes.js}
|-- services-{taskService.js}
|-- server.js
|-- package.json
|-- .env


## Frontend
-src{api.js,app.css,app.jsx,index.css,main.jsx}
-components{TaskList.jsx,TaskForm.jsx,SearchBar.jsx}

## How to Run

### Backend

1.Open terminal:cd todo-backend
2.Install packages:npm install
3.Create `.env` file:
PORT=5000
MONGO_URI=your_mongodb_connection_string

4.Run backend:npm run dev
5.Backend start on:http://localhost:5000

### Frontend

1.Open another terminal:cd todo-frontend
2.Install packages:npm install
3.Run project:npm run dev
4.Frontend start on:http://localhost:5173

## API

1.GET:/api/tasks
2.POST:/api/tasks
3.PUT:/api/tasks/:id
4.DELETE:/api/tasks/:id
5.PATCH:/api/tasks/:id/status
6.Search:/api/tasks/search?keyword=text

## What I Learned

- React basic
- Express routing
- MongoDB connection
- CRUD operation
- Axios API call
- MVC structure
- Backend and frontend connection

## Problems I Faced

- MongoDB connection problem
- API not working first time
- CORS issue
- Routing mistake
- Fixed errors after testing

## Future Improvement

- User Login
- Due Date
- Better UI
- Dark Mode
- Categories
