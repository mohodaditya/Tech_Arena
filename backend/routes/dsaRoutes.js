const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const DSAProblem = require('../models/DSAProblem');
const Submission = require('../models/Submission');
const User = require('../models/User');

const router = express.Router();

const JUDGE0_API = process.env.JUDGE0_API_URL || 'https://ce.judge0.com';

// Language ID mapping for Judge0
const LANG_IDS = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54
};

// ---------- Helpers ----------

// Optional auth — sets req.user if valid token present, but doesn't block
const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch (_) {
            // Token invalid — continue as anonymous
        }
    }
    next();
};

// Required auth
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

// Build full source code by wrapping user code with driver code
const buildFullSource = (userCode, driverCode, language) => {
    if (!driverCode || !driverCode[language]) return userCode;
    const driver = driverCode[language];
    return (driver.before || '') + '\n' + userCode + '\n' + (driver.after || '');
};

// Submit code to Judge0 and wait for result
const executeOnJudge0 = async (sourceCode, languageId, stdin) => {
    const base64Code = Buffer.from(sourceCode).toString('base64');
    const base64Stdin = Buffer.from(stdin || '').toString('base64');

    const response = await axios.post(
        `${JUDGE0_API}/submissions?base64_encoded=true&wait=true`,
        {
            source_code: base64Code,
            language_id: languageId,
            stdin: base64Stdin,
            cpu_time_limit: 5,
            memory_limit: 128000
        },
        {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000
        }
    );

    return response.data;
};

// Decode base64 Judge0 output
const decodeB64 = (str) => {
    if (!str) return '';
    try {
        return Buffer.from(str, 'base64').toString('utf-8');
    } catch {
        return str;
    }
};

// ---------- Routes ----------

// @desc    Get all DSA problems (list view — excludes testCases and driverCode)
// @route   GET /api/dsa/problems
router.get('/problems', async (req, res) => {
    try {
        const { topic, difficulty } = req.query;
        const filter = {};
        if (topic && topic !== 'All') filter.topic = topic;
        if (difficulty) filter.difficulty = difficulty;

        const problems = await DSAProblem.find(filter)
            .select('-testCases -driverCode')
            .sort({ difficulty: 1 });

        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single DSA problem detail
// @route   GET /api/dsa/problems/:id
router.get('/problems/:id', async (req, res) => {
    try {
        const problem = await DSAProblem.findOne({ problemId: req.params.id })
            .select('-testCases -driverCode');

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Run code against sample test cases only (no scoring)
// @route   POST /api/dsa/run
router.post('/run', async (req, res) => {
    try {
        const { problemId, language, code } = req.body;

        if (!problemId || !language || !code) {
            return res.status(400).json({ message: 'problemId, language, and code are required' });
        }

        const langId = LANG_IDS[language];
        if (!langId) {
            return res.status(400).json({ message: `Unsupported language: ${language}` });
        }

        const problem = await DSAProblem.findOne({ problemId });
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Use only the first 2-3 test cases as "sample" (same as visible examples)
        const sampleCases = problem.testCases.slice(0, Math.min(3, problem.examples.length));
        const fullSource = buildFullSource(code, problem.driverCode, language);

        const results = [];
        for (const tc of sampleCases) {
            try {
                const judgeResult = await executeOnJudge0(fullSource, langId, tc.input + '\n');
                const stdout = decodeB64(judgeResult.stdout).trim();
                const stderr = decodeB64(judgeResult.stderr);
                const compileOutput = decodeB64(judgeResult.compile_output);

                let status;
                if (judgeResult.status.id === 3) {
                    status = stdout === tc.expectedOutput.trim() ? 'Passed' : 'Wrong Answer';
                } else if (judgeResult.status.id === 6) {
                    status = 'Compilation Error';
                } else if (judgeResult.status.id === 5) {
                    status = 'Time Limit Exceeded';
                } else {
                    status = 'Runtime Error';
                }

                results.push({
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    actualOutput: stdout,
                    status,
                    error: stderr || compileOutput || null,
                    time: judgeResult.time,
                    memory: judgeResult.memory
                });
            } catch (execError) {
                results.push({
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    actualOutput: '',
                    status: 'Error',
                    error: execError.message,
                    time: null,
                    memory: null
                });
            }
        }

        const allPassed = results.every(r => r.status === 'Passed');
        const passedCount = results.filter(r => r.status === 'Passed').length;

        res.json({
            verdict: allPassed ? 'Accepted' : results.find(r => r.status !== 'Passed')?.status || 'Wrong Answer',
            passedTests: passedCount,
            totalTests: results.length,
            results,
            isSample: true
        });
    } catch (error) {
        console.error('Run error:', error.message);
        res.status(500).json({ message: 'Code execution failed: ' + error.message });
    }
});

// @desc    Submit code against ALL hidden test cases (with scoring)
// @route   POST /api/dsa/submit
router.post('/submit', optionalAuth, async (req, res) => {
    try {
        const { problemId, language, code } = req.body;

        if (!problemId || !language || !code) {
            return res.status(400).json({ message: 'problemId, language, and code are required' });
        }

        const langId = LANG_IDS[language];
        if (!langId) {
            return res.status(400).json({ message: `Unsupported language: ${language}` });
        }

        const problem = await DSAProblem.findOne({ problemId });
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const fullSource = buildFullSource(code, problem.driverCode, language);
        const allTestCases = problem.testCases;

        const results = [];
        let firstError = null;

        for (let i = 0; i < allTestCases.length; i++) {
            const tc = allTestCases[i];
            try {
                const judgeResult = await executeOnJudge0(fullSource, langId, tc.input + '\n');
                const stdout = decodeB64(judgeResult.stdout).trim();
                const stderr = decodeB64(judgeResult.stderr);
                const compileOutput = decodeB64(judgeResult.compile_output);

                let status;
                if (judgeResult.status.id === 3) {
                    status = stdout === tc.expectedOutput.trim() ? 'Passed' : 'Wrong Answer';
                } else if (judgeResult.status.id === 6) {
                    status = 'Compilation Error';
                } else if (judgeResult.status.id === 5) {
                    status = 'Time Limit Exceeded';
                } else {
                    status = 'Runtime Error';
                }

                results.push({
                    testCase: i + 1,
                    status,
                    // Only show input/output for first 3 (sample) test cases
                    input: i < 3 ? tc.input : undefined,
                    expectedOutput: i < 3 ? tc.expectedOutput : undefined,
                    actualOutput: i < 3 ? stdout : undefined,
                    error: stderr || compileOutput || null,
                    time: judgeResult.time,
                    memory: judgeResult.memory
                });

                // If we get a compilation error, stop — all remaining will fail too
                if (status === 'Compilation Error' && !firstError) {
                    firstError = stderr || compileOutput;
                    break;
                }
            } catch (execError) {
                results.push({
                    testCase: i + 1,
                    status: 'Error',
                    error: execError.message,
                    time: null,
                    memory: null
                });
            }
        }

        const passedCount = results.filter(r => r.status === 'Passed').length;
        const totalCount = allTestCases.length;
        const allPassed = passedCount === totalCount;

        let overallStatus;
        if (allPassed) {
            overallStatus = 'Accepted';
        } else {
            const failedResult = results.find(r => r.status !== 'Passed');
            overallStatus = failedResult ? failedResult.status : 'Wrong Answer';
        }

        // Calculate average runtime/memory from passed tests
        const passedResults = results.filter(r => r.status === 'Passed' && r.time);
        const avgTime = passedResults.length > 0
            ? (passedResults.reduce((sum, r) => sum + parseFloat(r.time), 0) / passedResults.length).toFixed(3)
            : null;
        const avgMemory = passedResults.length > 0
            ? Math.round(passedResults.reduce((sum, r) => sum + r.memory, 0) / passedResults.length)
            : null;

        // Save submission if user is authenticated
        if (req.user) {
            await Submission.create({
                userId: req.user._id,
                problemId,
                language,
                code,
                status: overallStatus,
                runtime: avgTime ? `${avgTime}s` : null,
                memory: avgMemory ? `${Math.round(avgMemory / 1024)} KB` : null,
                passedTests: passedCount,
                totalTests: totalCount
            });

            // Award points for first-time Accepted
            if (allPassed) {
                const acceptedCount = await Submission.countDocuments({
                    userId: req.user._id,
                    problemId,
                    status: 'Accepted'
                });

                // Only 1 means this is the first (the one we just created above)
                if (acceptedCount === 1) {
                    await User.findByIdAndUpdate(req.user._id, {
                        $inc: {
                            dsaScore: problem.points,
                            totalScore: problem.points
                        }
                    });
                }
            }
        }

        res.json({
            verdict: overallStatus,
            passedTests: passedCount,
            totalTests: totalCount,
            runtime: avgTime ? `${avgTime}s` : null,
            memory: avgMemory ? `${Math.round(avgMemory / 1024)} KB` : null,
            results
        });
    } catch (error) {
        console.error('Submit error:', error.message);
        res.status(500).json({ message: 'Submission failed: ' + error.message });
    }
});

// @desc    Get user's submissions for a problem
// @route   GET /api/dsa/submissions/:problemId
router.get('/submissions/:problemId', requireAuth, async (req, res) => {
    try {
        const submissions = await Submission.find({
            userId: req.user._id,
            problemId: req.params.problemId
        }).sort({ createdAt: -1 }).limit(20);

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
