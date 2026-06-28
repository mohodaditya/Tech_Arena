const express = require('express');
const dotenv = require('dotenv');

// Load environment variables FIRST before requiring other files
dotenv.config({ override: true });

const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');
const dsaRoutes = require('./routes/dsaRoutes');

const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
require('./config/passport'); // Initialize passport config

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow frontend origin
    credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(passport.initialize()); // Initialize passport middleware

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/score', scoreRoutes);

const path = require("path");

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route (important)
app.get("*path", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
