const express = require('express');
const User = require('../models/User');

const router = express.Router();

// @desc    Get leaderboard (all users sorted by totalScore)
// @route   GET /api/leaderboard
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
            .select('name college profilePic quizScore dsaScore totalScore')
            .sort({ totalScore: -1 })
            .lean();

        res.status(200).json(users);
    } catch (error) {
        console.error('Leaderboard fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
});

module.exports = router;
