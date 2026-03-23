import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Search, Sparkles, ArrowRight, Trophy, Clock, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';
import { categories } from '../data/categories';
import { useUser } from '../context/UserContext';

const categoryMeta = {
    dsa: { color: 'from-blue-500 to-cyan-400', questions: 50, time: '25 min' },
    dbms: { color: 'from-emerald-500 to-teal-400', questions: 50, time: '25 min' },
    os: { color: 'from-violet-500 to-purple-400', questions: 50, time: '25 min' },
    cn: { color: 'from-orange-500 to-amber-400', questions: 50, time: '25 min' },
    oops: { color: 'from-pink-500 to-rose-400', questions: 50, time: '25 min' },
    aptitude: { color: 'from-indigo-500 to-blue-400', questions: 50, time: '25 min' },
    finance: { color: 'from-yellow-500 to-orange-400', questions: 50, time: '25 min' },
    development: { color: 'from-green-500 to-emerald-400', questions: 50, time: '25 min' },
    ml: { color: 'from-fuchsia-500 to-pink-400', questions: 50, time: '25 min' },
    ai: { color: 'from-cyan-500 to-blue-400', questions: 50, time: '25 min' },
    random: { color: 'from-[#FF5A5F] to-[#FF8E53]', questions: 50, time: '25 min' },
};

const QuizCategories = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useUser();

    const filteredCategories = categories.filter(
        (cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 200, damping: 20 },
        },
    };

    return (
        <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-850 dark:to-gray-950 pt-16 pb-12 px-4 transition-colors duration-300">
                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-40 h-40 bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#00A699]/10 dark:bg-[#00A699]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF8E53]/5 dark:bg-[#FF8E53]/3 rounded-full blur-3xl" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-6">
                            <Sparkles className="h-4 w-4 text-[#FF5A5F]" />
                            <span className="text-sm font-medium text-[#484848] dark:text-gray-300">
                                {categories.length} Categories Available
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
                            Choose Your{' '}
                            <span className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">
                                Arena
                            </span>{' '}
                            <span className="inline-block">
                                <Brain className="h-10 w-10 md:h-14 md:w-14 text-[#FF5A5F] animate-pulse" />
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#484848] dark:text-gray-400 max-w-2xl mx-auto mb-8 transition-colors duration-300">
                            Select a category, test your knowledge, and climb the leaderboard. Each quiz has timed questions with instant feedback.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="max-w-lg mx-auto relative"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#222222] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/50 focus:border-[#FF5A5F] transition-all duration-300"
                        />
                    </motion.div>

                    {/* Quick Stats */}
                    {user && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                            className="flex flex-wrap justify-center gap-4 mt-8"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                                <Trophy className="h-4 w-4 text-[#FF5A5F]" />
                                <span className="text-sm font-medium text-[#484848] dark:text-gray-300">
                                    Quiz Score: <span className="text-[#FF5A5F] font-bold">{user.quizScore || 0}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                                <Clock className="h-4 w-4 text-[#00A699]" />
                                <span className="text-sm font-medium text-[#484848] dark:text-gray-300">
                                    30s per question
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                                <Zap className="h-4 w-4 text-[#FF8E53]" />
                                <span className="text-sm font-medium text-[#484848] dark:text-gray-300">
                                    Instant Feedback
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    {filteredCategories.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-xl text-[#484848] dark:text-gray-400">
                                No categories match "<span className="font-semibold">{searchQuery}</span>"
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 px-6 py-2 text-sm font-medium text-[#FF5A5F] hover:text-white border border-[#FF5A5F] hover:bg-[#FF5A5F] rounded-xl transition-all duration-300"
                            >
                                Clear Search
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredCategories.map((category) => {
                                const meta = categoryMeta[category.id] || {
                                    color: 'from-gray-500 to-gray-400',
                                    questions: 50,
                                    time: '25 min',
                                };

                                return (
                                    <motion.div key={category.id} variants={cardVariants}>
                                        <Link
                                            to={`/quiz/${category.id}`}
                                            className="group relative block overflow-hidden rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700/60 shadow-xl shadow-gray-300/50 dark:shadow-none hover:shadow-2xl hover:shadow-gray-400/40 dark:hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1"
                                        >
                                            {/* Gradient accent bar */}
                                            <div
                                                className={`h-1.5 bg-gradient-to-r ${meta.color} transition-all duration-500 group-hover:h-2`}
                                            />

                                            <div className="p-6">
                                                {/* Icon + Badge */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div
                                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                    >
                                                        {category.icon}
                                                    </div>
                                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-[#484848] dark:text-gray-300">
                                                        {meta.questions} Qs
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-[#222222] dark:text-white mb-1.5 group-hover:text-[#FF5A5F] transition-colors duration-300">
                                                    {category.name}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm text-[#484848] dark:text-gray-400 leading-relaxed mb-5 transition-colors duration-300">
                                                    {category.description}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span>{meta.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm font-semibold text-[#FF5A5F] group-hover:gap-2 transition-all duration-300">
                                                        <span>Start</span>
                                                        <ArrowRight className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* Bottom motivational text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mt-14"
                    >
                        <p className="text-lg font-medium bg-gradient-to-r from-[#FF5A5F] to-[#00A699] bg-clip-text text-transparent">
                            "Consistency beats talent — Practice today!"
                        </p>
                    </motion.div>
                </div>
            </section>

            <BottomDock />
        </div>
    );
};

export default QuizCategories;
