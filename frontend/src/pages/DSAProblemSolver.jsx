import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Send, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import { useUser } from '../context/UserContext';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/dsa`;

// Render basic markdown: **bold**, `code`, \n
const renderDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        const parts = [];
        let remaining = line;
        let key = 0;
        // Process **bold** and `code`
        const pattern = /(\*\*(.+?)\*\*|`([^`]+)`)/g;
        let lastIdx = 0;
        let m;
        while ((m = pattern.exec(remaining)) !== null) {
            if (m.index > lastIdx) parts.push(<span key={key++}>{remaining.slice(lastIdx, m.index)}</span>);
            if (m[2]) parts.push(<strong key={key++} className="font-bold">{m[2]}</strong>);
            else if (m[3]) parts.push(<code key={key++} className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">{m[3]}</code>);
            lastIdx = m.index + m[0].length;
        }
        if (lastIdx < remaining.length) parts.push(<span key={key++}>{remaining.slice(lastIdx)}</span>);
        return <p key={i} className={line === '' ? 'h-3' : ''}>{parts.length > 0 ? parts : line}</p>;
    });
};

const DSAProblemSolver = () => {
    const { id } = useParams();
    const { user, addDSAScore } = useUser();

    const [problem, setProblem] = useState(null);
    const [loadingProblem, setLoadingProblem] = useState(true);
    const [bgLanguage, setBgLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [output, setOutput] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    // Fetch problem from backend
    useEffect(() => {
        const fetchProblem = async () => {
            setLoadingProblem(true);
            try {
                const response = await fetch(`${API_BASE}/problems/${id}`);
                if (!response.ok) throw new Error('Problem not found');
                const data = await response.json();
                setProblem(data);
                setCode(data.starterCode?.[bgLanguage] || '');
            } catch (err) {
                setProblem(null);
            } finally {
                setLoadingProblem(false);
            }
        };
        fetchProblem();
    }, [id]);

    // Update starter code when language changes
    useEffect(() => {
        if (problem) {
            setCode(problem.starterCode?.[bgLanguage] || '');
            setOutput(null);
        }
    }, [bgLanguage]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('tech_arena_token');
        if (!token) return { 'Content-Type': 'application/json' };
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    // Run against sample test cases
    const handleRun = async () => {
        setIsRunning(true);
        setOutput(null);

        try {
            const response = await fetch(`${API_BASE}/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemId: id,
                    language: bgLanguage,
                    code
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Run failed');
            }

            const data = await response.json();
            setOutput({
                type: 'run',
                verdict: data.verdict,
                passedTests: data.passedTests,
                totalTests: data.totalTests,
                results: data.results,
                isSample: true
            });
        } catch (error) {
            setOutput({
                type: 'error',
                verdict: 'Error',
                message: error.message
            });
        } finally {
            setIsRunning(false);
        }
    };

    // Submit against all hidden test cases
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setOutput(null);

        try {
            const response = await fetch(`${API_BASE}/submit`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    problemId: id,
                    language: bgLanguage,
                    code
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Submission failed');
            }

            const data = await response.json();

            if (data.verdict === 'Accepted' && user) {
                addDSAScore(problem.points || 10);
            }

            setOutput({
                type: 'submit',
                verdict: data.verdict,
                passedTests: data.passedTests,
                totalTests: data.totalTests,
                runtime: data.runtime,
                memory: data.memory,
                results: data.results
            });
        } catch (error) {
            setOutput({
                type: 'error',
                verdict: 'Error',
                message: error.message
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingProblem) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#FFF8F6] dark:bg-gray-950 transition-colors">
                <Loader2 className="h-8 w-8 animate-spin text-[#FF5A5F]" />
                <span className="ml-3 text-[#484848] dark:text-gray-400">Loading problem...</span>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#FFF8F6] dark:bg-gray-950 transition-colors">
                <p className="text-xl font-bold text-[#222222] dark:text-gray-300 mb-4">Problem not found</p>
                <Link to="/dsa" className="px-4 py-2 bg-[#FF5A5F] text-white rounded-lg hover:bg-[#ff4247] transition-colors">
                    ← Back to Problems
                </Link>
            </div>
        );
    }

    const isWorking = isRunning || isSubmitting;

    return (
        <div className="h-screen flex flex-col bg-[#FFF8F6] dark:bg-gray-950 text-[#222222] dark:text-gray-200 overflow-hidden">
            {/* Top Bar */}
            <div className="h-auto min-h-[56px] border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 gap-2 z-10">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <Link to="/dsa" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shrink-0">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div className="min-w-0">
                        <h1 className="font-bold text-base sm:text-lg truncate">{problem.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <select
                        value={bgLanguage}
                        onChange={(e) => setBgLanguage(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-xs sm:text-sm px-2 sm:px-3 py-1.5 focus:ring-2 focus:ring-[#FF5A5F]"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>

                    <button
                        onClick={handleRun}
                        disabled={isWorking}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isRunning ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run Code'}</span>
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isWorking}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 bg-[#FF5A5F] hover:bg-[#ff4247] text-white rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </button>
                </div>
            </div>

            {/* Main Content - Split View (stacks on mobile) */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left Pane: Description */}
                <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900 max-h-[40vh] lg:max-h-none">
                    <div className="flex border-b border-gray-200 dark:border-gray-800">
                        <button
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'description' ? 'border-[#FF5A5F] text-[#FF5A5F]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'solution' ? 'border-[#FF5A5F] text-[#FF5A5F]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('solution')}
                        >
                            Solution
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {activeTab === 'description' ? (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{problem.title}</h2>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold 
                                        ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>

                                <div className="max-w-none text-gray-600 dark:text-gray-300 space-y-1 leading-relaxed">
                                    {renderDescription(problem.description)}
                                </div>

                                <div className="space-y-4">
                                    {problem.examples.map((ex, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                            <p className="font-bold text-sm mb-2">Example {i + 1}:</p>
                                            <div className="space-y-1 font-mono text-sm">
                                                <p><span className="text-gray-500">Input:</span> {ex.input}</p>
                                                <p><span className="text-gray-500">Output:</span> {ex.output}</p>
                                                {ex.explanation && <p><span className="text-gray-500">Explanation:</span> {ex.explanation}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">Constraints:</h3>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Solution locked. Solve the problem to unlock!
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Pane: Code Editor */}
                <div className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] min-h-[300px] lg:min-h-0">
                    <div className="flex-1 p-0 overflow-hidden">
                        <CodeEditor
                            code={code}
                            setCode={setCode}
                            language={bgLanguage}
                        />
                    </div>

                    {/* Console Panel */}
                    <div className="h-1/3 bg-gray-900 border-t border-gray-700 flex flex-col">
                        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Console</span>
                            {output && output.verdict && (
                                <div className="flex items-center gap-2">
                                    {output.runtime && (
                                        <span className="text-xs text-gray-500">
                                            {output.runtime} • {output.memory}
                                        </span>
                                    )}
                                    <span className={`text-xs font-bold flex items-center gap-1 ${output.verdict === 'Accepted' ? 'text-green-400' :
                                        output.verdict === 'Error' ? 'text-red-400' : 'text-red-400'
                                        }`}>
                                        {output.verdict === 'Accepted' ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        ) : (
                                            <XCircle className="h-3.5 w-3.5" />
                                        )}
                                        {output.verdict}
                                        {output.passedTests !== undefined && (
                                            <span className="text-gray-500 font-normal ml-1">
                                                ({output.passedTests}/{output.totalTests})
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
                            {/* Idle */}
                            {!output && !isWorking && (
                                <span className="text-gray-500">Run your code to see output...</span>
                            )}

                            {/* Running */}
                            {isWorking && (
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {isRunning ? 'Running test cases...' : 'Submitting solution...'}
                                </div>
                            )}

                            {/* Error */}
                            {output && output.type === 'error' && (
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-red-400 font-bold mb-1">Execution Error</p>
                                        <pre className="text-red-300 text-xs whitespace-pre-wrap">{output.message}</pre>
                                    </div>
                                </div>
                            )}

                            {/* Test Results */}
                            {output && output.results && (
                                <div className="space-y-3">
                                    {/* Overall Verdict */}
                                    <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                                        {output.verdict === 'Accepted' ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className={`font-bold mb-0.5 ${output.verdict === 'Accepted' ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                                {output.verdict === 'Accepted'
                                                    ? 'All test cases passed!'
                                                    : `${output.verdict} — ${output.passedTests}/${output.totalTests} test cases passed`}
                                            </p>
                                            {output.runtime && (
                                                <p className="text-gray-500 text-xs">
                                                    Runtime: {output.runtime} • Memory: {output.memory}
                                                </p>
                                            )}
                                            {output.isSample && (
                                                <p className="text-gray-600 text-xs mt-1 italic">
                                                    ↑ Sample tests only. Click "Submit" to test against all hidden test cases.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Per-test-case results */}
                                    {output.results.map((r, i) => (
                                        <div key={i} className={`rounded p-3 text-xs ${r.status === 'Passed'
                                            ? 'bg-green-900/20 border border-green-800/30'
                                            : 'bg-red-900/20 border border-red-800/30'
                                            }`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                {r.status === 'Passed' ? (
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                                                ) : (
                                                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                                                )}
                                                <span className={`font-bold ${r.status === 'Passed' ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    Test Case {r.testCase || i + 1}: {r.status}
                                                </span>
                                                {r.time && (
                                                    <span className="text-gray-500 ml-auto">{r.time}s</span>
                                                )}
                                            </div>
                                            {r.input !== undefined && (
                                                <div className="mt-2 space-y-1 text-gray-400">
                                                    <p><span className="text-gray-500">Input:</span> {r.input}</p>
                                                    <p><span className="text-gray-500">Expected:</span> {r.expectedOutput}</p>
                                                    <p><span className="text-gray-500">Got:</span> <span className={r.status === 'Passed' ? 'text-green-400' : 'text-red-400'}>{r.actualOutput || '(no output)'}</span></p>
                                                </div>
                                            )}
                                            {r.error && r.status !== 'Passed' && (
                                                <pre className="mt-2 text-red-300 whitespace-pre-wrap">{r.error}</pre>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DSAProblemSolver;
