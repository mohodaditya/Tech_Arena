# Tech Arena 🚀

**Tech Arena** is a comprehensive developer skill-building platform designed to help students and developers sharpen their technical skills.

![Status](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Nodejs](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

🌐 **Live Demo:** [mohodaditya.github.io/Tech_Arena](https://mohodaditya.github.io/Tech_Arena/)

## 🌟 Core Features

1. **Quizzes** — Timed MCQ quizzes across 10 technical categories.
2. **DSA Problem Solving** — A LeetCode/HackerRank-style coding arena with a built-in code editor and real code execution via Judge0 API.
3. **Gamification & Leaderboard** — A points-based scoring system with a competitive leaderboard.
4. **Modern UI/UX** — Premium, responsive UI with light/dark mode, smooth animations, and a professional VS Code-inspired code editor.

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **React Router DOM**
- **Tailwind CSS** & **Framer Motion**
- **Lucide React** (Icons)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **Passport.js** (Google OAuth 2.0)
- **JSON Web Token (JWT)**
- **Axios**

### External Services
- **Judge0 CE API** (Code Execution Sandbox)
- **Google Cloud Console** (OAuth Credentials)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/mohodaditya/Tech_Arena.git
cd Tech_Arena
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

### 3. Backend Setup
Open a new terminal and navigate to the backend directory:
```bash
cd backend

# Install backend dependencies
npm install
```

Create a `.env` file in the `backend` directory based on the following template:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JUDGE0_API_URL=https://ce.judge0.com
CLIENT_URL=http://localhost:5173
```

Run the seeders and start the server:
```bash
# Populate MongoDB with initial Question and DSA Problem data
node seeder.js
node dsaSeeder.js

# Start the Node.js backend development server
npm run dev
```

## 📂 Project Structure

- `src/` - Frontend React application (Pages, Components, Context)
- `backend/` - Node.js backend application (Routes, Models, Config)

## 📄 License
This project is licensed under the ISC License.

## 👨‍💻 Author
**Aditya Mohod**
