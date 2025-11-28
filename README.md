📝 MERN Task Management Application
A full-stack Task Management application built with the MERN Stack (MongoDB, Express, React, Node.js). It features secure authentication, role-based access control (Admin vs User), pagination, and a modern Material UI interface with Dark Mode support.


🚀 Live Demo
https://task-management-three-ruby.vercel.app

✨ Features

Frontend (React + MUI)
Responsive UI: Built with Material UI (MUI) for a clean, professional look on mobile and desktop.
Dark/Light Mode: One-click theme switcher using React Context.
Authentication: Sign Up and Sign In pages with form validation (Username/Password).
Dashboard: Grid layout with consistent card sizing and pagination.
Task Management: Users can Create and Edit tasks.
Role-Based UI: Delete button is only visible to Admin users.
Backend (Node.js + Express)
Secure API: RESTful API using Express.
Database: MongoDB (Atlas) with Mongoose schemas.
Authentication: JWT (Json Web Token) for secure session management.
Authorization: Middleware to restrict specific routes (e.g., Delete Task) to Admins only.
Pagination: Server-side pagination for optimized data loading.

🛠️ Tech Stack

Component	Technology
Frontend	React.js (Vite), Material UI, Axios, React Router DOM
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Auth	JSON Web Tokens (JWT), Bcrypt.js

⚙️ Installation & Setup

Follow these steps to run the project locally.
1. Clone the Repository
code
Bash
git clone https://github.com/subir-ghosh-au26/Task-Management
cd Task-Management
2. Backend Setup
Navigate to the server folder and install dependencies.
code
Bash
cd backend
npm install

Configure Environment Variables:

Create a .env file in the server folder and add:
code
Env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here

Start the Server:
code
Bash
node server.js
# or
npm run dev

3. Frontend Setup
Open a new terminal, navigate to the client folder.
code
Bash
cd frontend
npm install
Start the Frontend:
code
Bash
npm run dev

The app should now be running at http://localhost:5173.

🔐 API Endpoints

Method	Endpoint	Description	Access
POST	/auth/register	Register a new user	Public
POST	/auth/login	Login user & get Token	Public
GET	/tasks	Get all tasks (Paginated)	Authenticated
POST	/tasks	Create a new task	Authenticated
PUT	/tasks/:id	Update a task	Authenticated
DELETE	/tasks/:id	Delete a task	Admin Only

👥 User Roles & Testing

To test the application properly, you can create two types of users via the Sign Up page:

Normal User:

Select "User" from the dropdown.
Can: View tasks, Create tasks, Edit tasks.
Cannot: Delete tasks (Trash icon hidden).

Admin User:
Select "Admin" from the dropdown.
Can: Perform all actions, including Deleting tasks.

📂 Project Structure
code
Text
task-manager/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Navbar, reusable UI
│   │   ├── pages/       # Dashboard, Login, Register
│   │   └── App.jsx      # Theme & Routing
├── server/              # Node Backend
│   ├── config/          # DB Connection
│   ├── controllers/     # Logic for Auth & Tasks
│   ├── middleware/      # JWT & Admin checks
│   ├── model/          # Mongoose Schemas
│   └── routes/          # API Routes
└── README.md