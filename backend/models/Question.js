const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: [{
        type: String, // Array of strings for options
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: false, // Optional but good to have
    },
    category: {
        type: String, // e.g., "DSA", "DBMS", "React"
        required: true,
    },
    difficulty: {
        type: String, // "Easy", "Medium", "Hard"
        enum: ['Easy', 'Medium', 'Hard'], // Restrict to these values
        default: 'Easy',
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Question', questionSchema);
