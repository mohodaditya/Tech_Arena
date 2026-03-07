const mongoose = require('mongoose');

const dsaProblemSchema = mongoose.Schema({
    problemId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    acceptance: {
        type: String,
        default: '0%'
    },
    description: {
        type: String,
        required: true
    },
    examples: [{
        input: String,
        output: String,
        explanation: String
    }],
    constraints: [String],
    starterCode: {
        javascript: String,
        python: String,
        java: String,
        cpp: String
    },
    // Hidden test cases — never sent to frontend
    testCases: [{
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
    }],
    // Driver code wraps user code to read stdin, call function, print result
    driverCode: {
        javascript: { before: String, after: String },
        python: { before: String, after: String },
        java: { before: String, after: String },
        cpp: { before: String, after: String }
    },
    points: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DSAProblem', dsaProblemSchema);
