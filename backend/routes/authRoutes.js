const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Successful authentication, generate token.
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        // Redirect to frontend with token in the URL params
        res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
    }
);

// Middleware to protect routes and inject user
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await require('../models/User').findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
router.get('/me', protect, (req, res) => {
    res.status(200).json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
    try {
        const { name, college, phone, bio, github, linkedin } = req.body;

        // Validate required fields
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!college || !college.trim()) {
            return res.status(400).json({ message: 'College is required' });
        }

        const updatedUser = await require('../models/User').findByIdAndUpdate(
            req.user._id,
            {
                name: name.trim(),
                college: college.trim(),
                phone: (phone || '').trim(),
                bio: (bio || '').trim(),
                github: (github || '').trim(),
                linkedin: (linkedin || '').trim(),
                isProfileComplete: true
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

// @desc    Delete user account
// @route   DELETE /api/auth/account
router.delete('/account', protect, async (req, res) => {
    try {
        await require('../models/User').findByIdAndDelete(req.user._id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Account deletion error:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
});

module.exports = router;
