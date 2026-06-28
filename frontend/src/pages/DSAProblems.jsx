import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, ArrowRight, BookOpen, Trophy, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dsa`;

const DSAProblems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const topics = ['All', 'Arrays', 'Strings', 'Two Pointers', 'DP', 'Trees'];

    useEffect(() => {
        fetchProblems();
    }, [activeFilter]);

    const fetchProblems = async () => {
        setLoading(true);
        setError(null);
        try {
            const query = activeFilter !== 'All' ? `?topic=${encodeURIComponent(activeFilter)}` : '';
            const response = await fetch(`${API_BASE}/problems${query}`);
            if (!response.ok) throw new Error('Failed to fetch problems');
            const data = await response.json();
            setProblems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
            case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
            case 'hard': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block p-4 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-2xl mb-6 shadow-lg">
                            <Code2 className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-6">
                            DSA Battle Arena
                        </h1>
                        <p className="text-xl text-[#484848] dark:text-gray-400 max-w-2xl mx-auto">
                            Master algorithms and data structures with our curated collection of problems.
                        </p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => setActiveFilter(topic)}
                            className={`px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-colors ${activeFilter === topic
                                ? 'bg-[#FF5A5F] text-white shadow-lg shadow-[#FF5A5F]/25'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF5A5F]" />
                        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading problems...</span>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchProblems}
                            className="px-4 py-2 bg-[#FF5A5F] text-white rounded-lg hover:bg-[#ff4247] transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Problems Grid */}
                {!loading && !error && (
                    <div className="grid gap-6">
                        {problems.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                                No problems found for this topic.
                            </div>
                        ) : (
                            problems.map((problem, index) => (
                                <motion.div
                                    key={problem.problemId || problem._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={`/dsa/${problem.problemId}`}
                                        className="block bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(problem.difficulty)}`}>
                                                    {problem.difficulty}
                                                </div>
                                                <div>
                                                    <h3 className="text-base sm:text-lg font-bold text-[#222222] dark:text-white group-hover:text-[#FF5A5F] transition-colors">
                                                        {problem.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Topic: {problem.topic} • Acceptance: {problem.acceptance}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray-400 group-hover:text-[#FF5A5F] transition-colors self-end sm:self-center">
                                                <span className="text-sm font-medium mr-2">Solve</span>
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DSAProblems;
