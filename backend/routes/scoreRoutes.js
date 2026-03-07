const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Auth middleware
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ message: 'User not found' });
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// @desc    Record quiz score — increments quizScore and totalScore
// @route   POST /api/score/quiz
router.post('/quiz', requireAuth, async (req, res) => {
    try {
        const { score } = req.body;

        if (score === undefined || typeof score !== 'number' || score < 0) {
            return res.status(400).json({ message: 'A valid score (number >= 0) is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $inc: {
                    quizScore: score,
                    totalScore: score
                }
            },
            { new: true }
        ).select('name college profilePic quizScore dsaScore totalScore');

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Quiz score update error:', error);
        res.status(500).json({ message: 'Failed to update quiz score' });
    }
});

module.exports = router;
