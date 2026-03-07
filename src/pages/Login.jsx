import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import techArenaLogo from '../assets/logo.png';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useUser } from '../context/UserContext';

const Login = () => {
    const { loginWithGoogle, loading, isAuthenticated } = useUser();

    // If already logged in, redirect to home
    if (!loading && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">

            {/* Decorative gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FF5A5F]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00A699]/10 rounded-full blur-[100px]" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <Link to="/" className="flex justify-center mb-6 group">
                    <img src={techArenaLogo} alt="Tech Arena" className="h-14 w-14 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300" />
                </Link>
                <h2 className="text-center text-3xl font-bold tracking-tight text-[#222222] dark:text-white">
                    Welcome to Tech Arena
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Sign in to track your progress and compete!
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-800"
                >
                    <div className="space-y-6">
                        {loading ? (
                            <div className="flex justify-center py-4">
                                <span className="text-gray-500 dark:text-gray-400">Verifying session...</span>
                            </div>
                        ) : (
                            <div>
                                <GoogleLoginButton onClick={loginWithGoogle} />
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm font-medium text-[#FF5A5F] hover:text-[#FF8E53] flex items-center justify-center gap-1 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
