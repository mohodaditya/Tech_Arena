import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
            {/* Decorative blurred circles */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-56 h-56 bg-[#00A699]/10 dark:bg-[#00A699]/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#FF8E53]/10 dark:bg-[#FF8E53]/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Animated 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                    className="mb-6"
                >
                    <h1 className="text-[10rem] md:text-[14rem] font-extrabold leading-none bg-gradient-to-r from-[#FF5A5F] via-[#FF8E53] to-[#00A699] bg-clip-text text-transparent select-none">
                        404
                    </h1>
                </motion.div>

                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center mb-6"
                >
                    <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-full shadow-lg border border-white/30 dark:border-gray-700/30">
                        <SearchX className="h-10 w-10 text-[#FF5A5F]" />
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-[#484848] dark:text-gray-400 mb-10 max-w-md mx-auto leading-relaxed transition-colors duration-300">
                        Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        to="/"
                        className="group px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                        <Home className="h-5 w-5" />
                        <span>Go Home</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-4 bg-white dark:bg-gray-800 text-[#FF5A5F] dark:text-[#FF8E53] font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#FF5A5F] dark:border-[#FF8E53] flex items-center space-x-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Go Back</span>
                    </button>
                </motion.div>

                {/* Floating animated dots */}
                <div className="mt-16 flex justify-center space-x-3">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53]"
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
