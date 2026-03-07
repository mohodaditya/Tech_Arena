const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// @desc    Get 10 random questions (with optional category filter)
// @route   GET /api/questions
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let pipeline = [];

        // If category is provided, match by category
        if (category) {
            pipeline.push({ $match: { category: category } });
        }

        // Get 10 random questions
        pipeline.push({ $sample: { size: 10 } });

        const questions = await Question.aggregate(pipeline);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a new question
// @route   POST /api/questions
router.post('/', async (req, res) => {
    try {
        const { questionText, options, correctAnswer, explanation, category, difficulty } = req.body;

        const question = new Question({
            questionText,
            options,
            correctAnswer,
            explanation,
            category,
            difficulty
        });

        const createdQuestion = await question.save();
        res.status(201).json(createdQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
