const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error', 'Time Limit Exceeded'],
        required: true
    },
    runtime: String,
    memory: String,
    passedTests: {
        type: Number,
        default: 0
    },
    totalTests: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for quick user+problem lookups
submissionSchema.index({ userId: 1, problemId: 1 });

module.exports = mongoose.model('Submission', submissionSchema);
