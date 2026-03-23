import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Building2, Phone, FileText, Github, Linkedin, Edit3, Save, X, Trophy, Brain, Code2, ChevronRight, Sparkles, Shield, Calendar, ExternalLink, Swords, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';
import { useUser } from '../context/UserContext';

const Profile = () => {
    const { user, updateProfile, quizHistory, logout, deleteAccount } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const isFirstTime = user && !user.isProfileComplete;

    const [formData, setFormData] = useState({
        name: '',
        college: '',
        phone: '',
        bio: '',
        github: '',
        linkedin: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                college: user.college || '',
                phone: user.phone || '',
                bio: user.bio || '',
                github: user.github || '',
                linkedin: user.linkedin || ''
            });
            if (!user.isProfileComplete) {
                setIsEditing(true);
            }
        }
    }, [user]);

    const userAvatar = useMemo(() => {
        if (!user) return null;
        if (user.profilePic || user.profilePicture) {
            return user.profilePic || user.profilePicture;
        }
        const name = user.name || 'User';
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const colors = ['#FF5A5F', '#00A699', '#FF8E53', '#8B5CF6', '#06B6D4'];
        const color = colors[name.length % colors.length];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, 50, 50);
        return canvas.toDataURL('image/png');
    }, [user]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }
        if (!formData.college.trim()) {
            setError('College / Organization is required');
            return;
        }

        setSaving(true);
        setError('');

        try {
            await updateProfile(formData);
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (isFirstTime) return;
        setFormData({
            name: user.name || '',
            college: user.college || '',
            phone: user.phone || '',
            bio: user.bio || '',
            github: user.github || '',
            linkedin: user.linkedin || ''
        });
        setIsEditing(false);
        setError('');
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone and all your progress will be lost.")) {
            try {
                await deleteAccount();
            } catch (err) {
                setError(err.message || 'Failed to delete account');
            }
        }
    };

    const stats = [
        { label: 'Total Score', value: user?.totalScore || 0, icon: Trophy, gradient: 'from-[#FF5A5F] to-[#FF8E53]', bg: 'from-rose-50 to-orange-50 dark:from-[#FF5A5F]/10 dark:to-[#FF8E53]/5', border: 'border-rose-200 dark:border-[#FF5A5F]/20', iconBg: 'bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20', iconColor: 'text-[#FF5A5F]' },
        { label: 'Quiz Points', value: user?.quizScore || 0, icon: Brain, gradient: 'from-[#8B5CF6] to-[#A78BFA]', bg: 'from-violet-50 to-purple-50 dark:from-[#7C3AED]/10 dark:to-[#A78BFA]/5', border: 'border-violet-200 dark:border-[#7C3AED]/20', iconBg: 'bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20', iconColor: 'text-[#7C3AED]' },
        { label: 'DSA Points', value: user?.dsaScore || 0, icon: Swords, gradient: 'from-[#00A699] to-[#06B6D4]', bg: 'from-teal-50 to-emerald-50 dark:from-[#00A699]/10 dark:to-[#00C9A7]/5', border: 'border-teal-200 dark:border-[#00A699]/20', iconBg: 'bg-[#00A699]/10 dark:bg-[#00A699]/20', iconColor: 'text-[#00A699]' },
        { label: 'Quizzes Taken', value: quizHistory?.length || 0, icon: Star, gradient: 'from-[#F59E0B] to-[#FBBF24]', bg: 'from-amber-50 to-yellow-50 dark:from-[#F59E0B]/10 dark:to-[#FBBF24]/5', border: 'border-amber-200 dark:border-[#F59E0B]/20', iconBg: 'bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20', iconColor: 'text-[#F59E0B]' }
    ];

    const formFields = [
        { name: 'name', label: 'Full Name', icon: User, type: 'text', required: true, placeholder: 'Enter your full name' },
        { name: 'college', label: 'College / Organization', icon: Building2, type: 'text', required: true, placeholder: 'Enter your college or organization' },
        { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: false, placeholder: '+91 XXXXXXXXXX' },
        { name: 'bio', label: 'Bio', icon: FileText, type: 'textarea', required: false, placeholder: 'Tell us a bit about yourself...' },
        { name: 'github', label: 'GitHub Profile', icon: Github, type: 'url', required: false, placeholder: 'https://github.com/username' },
        { name: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, type: 'url', required: false, placeholder: 'https://linkedin.com/in/username' }
    ];

    if (!user) return null;

    const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : null;

    return (
        <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            {/* Background decorations */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-20 left-[-5%] w-96 h-96 bg-[#FF5A5F]/5 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 left-[20%] w-72 h-72 bg-[#00A699]/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">

                {/* First-time Welcome Banner */}
                <AnimatePresence>
                    {isFirstTime && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.97 }}
                            className="mb-8"
                        >
                            <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border-2 border-[#FF5A5F]/20 dark:border-gray-800 shadow-xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FF5A5F]/5 to-transparent" />
                                <div className="relative flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20 flex items-center justify-center flex-shrink-0 border border-[#FF5A5F]/20">
                                        <Sparkles className="w-6 h-6 text-[#FF5A5F]" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white mb-1">Welcome to Tech Arena! 🎉</h2>
                                        <p className="text-[#484848] dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                                            Complete your profile to get started. This helps us personalize your experience and show you on the leaderboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* ===== LEFT SIDEBAR ===== */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Profile Card */}
                        <div className="bg-white dark:bg-gray-900/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-xl border-2 border-gray-100 dark:border-gray-800 overflow-hidden">
                            {/* Minimal header */}
                            <div className="h-28 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative border-b border-gray-100 dark:border-gray-800">
                                <div className="absolute inset-0 opacity-10 dark:opacity-20 pattern-dots" />
                            </div>

                            {/* Avatar + info */}
                            <div className="px-6 pb-6 -mt-14 text-center">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={userAvatar}
                                        alt={user.name}
                                        className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-[3px] border-white dark:border-gray-900 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-[#222222] dark:text-white mb-1">{user.name}</h2>
                                {user.college && (
                                    <p className="text-sm text-[#FF5A5F] font-medium flex items-center justify-center gap-1.5 mb-1">
                                        <Building2 className="w-3.5 h-3.5" />
                                        {user.college}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user.email}
                                </p>

                                {user.bio && (
                                    <p className="mt-3 text-sm text-[#484848] dark:text-gray-400 leading-relaxed italic border-t border-gray-100 dark:border-gray-800 pt-3">
                                        "{user.bio}"
                                    </p>
                                )}
                            </div>

                            {/* Quick links */}
                            <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-1">
                                {user.github && (
                                    <a
                                        href={user.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                    >
                                        <Github className="w-4 h-4 text-gray-400 group-hover:text-[#222222] dark:group-hover:text-white transition-colors" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">GitHub Profile</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF5A5F] transition-colors" />
                                    </a>
                                )}
                                {user.linkedin && (
                                    <a
                                        href={user.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                                    >
                                        <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">LinkedIn Profile</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF5A5F] transition-colors" />
                                    </a>
                                )}
                                {user.phone && (
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</span>
                                    </div>
                                )}
                                {joinedDate && (
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Joined {joinedDate}</span>
                                    </div>
                                )}
                            </div>

                            {/* Account Actions */}
                            <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-3">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* Score Breakdown Card (desktop only) */}
                        {!isFirstTime && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="hidden lg:block bg-white dark:bg-gray-900/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-xl border-2 border-gray-100 dark:border-gray-800 p-6"
                            >
                                <h3 className="text-sm font-bold text-[#222222] dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-[#FF5A5F]" />
                                    Score Breakdown
                                </h3>
                                <div className="space-y-3">
                                    {/* Quiz bar */}
                                    <div>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">Quiz</span>
                                            <span className="font-bold text-[#222222] dark:text-white">{user?.quizScore || 0} pts</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(((user?.quizScore || 0) / Math.max(user?.totalScore || 1, 1)) * 100, 100)}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-full"
                                            />
                                        </div>
                                    </div>
                                    {/* DSA bar */}
                                    <div>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">DSA</span>
                                            <span className="font-bold text-[#222222] dark:text-white">{user?.dsaScore || 0} pts</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(((user?.dsaScore || 0) / Math.max(user?.totalScore || 1, 1)) * 100, 100)}%` }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* ===== MAIN CONTENT ===== */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Stats Cards Row (visible for returning users) */}
                        {!isFirstTime && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.08 }}
                                            className={`group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${stat.bg} border-2 ${stat.border} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
                                        >
                                            <div className={`w-10 h-10 sm:w-11 sm:h-11 ${stat.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                                                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                                            </div>
                                            <p className="text-[10px] sm:text-xs font-medium text-[#484848] dark:text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                            <p className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white">{stat.value}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Success Message */}
                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                                    className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl text-green-700 dark:text-green-400 text-sm font-medium flex items-center gap-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Profile Form / Details Card */}
                        <div className="bg-white dark:bg-gray-900/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-xl border-2 border-gray-100 dark:border-gray-800 overflow-hidden">
                            {/* Card Header */}
                            <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-[#222222] dark:text-white flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20 flex items-center justify-center">
                                            <User className="w-4 h-4 text-[#FF5A5F]" />
                                        </div>
                                        {isFirstTime ? 'Complete Your Profile' : 'Personal Information'}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 ml-10">
                                        {isFirstTime
                                            ? 'Fill in your details to get started with Tech Arena'
                                            : 'Manage your personal details and social links'
                                        }
                                    </p>
                                </div>
                                {!isFirstTime && !isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-[#FF5A5F]/20"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                    </button>
                                )}
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mx-6 sm:mx-8 mt-6"
                                    >
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                                            {error}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-6 sm:p-8">
                                {isEditing ? (
                                    /* Edit Mode */
                                    <div className="space-y-5">
                                        {/* Two-column grid for name + college */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {formFields.slice(0, 2).map((field) => {
                                                const Icon = field.icon;
                                                return (
                                                    <div key={field.name}>
                                                        <label className="text-sm font-semibold text-[#222222] dark:text-gray-200 mb-2 flex items-center gap-2">
                                                            <Icon className="w-4 h-4 text-[#FF5A5F]" />
                                                            {field.label}
                                                            {field.required && <span className="text-[#FF5A5F]">*</span>}
                                                        </label>
                                                        <input
                                                            type={field.type}
                                                            name={field.name}
                                                            value={formData[field.name]}
                                                            onChange={handleChange}
                                                            placeholder={field.placeholder}
                                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#222222] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F] transition-all duration-200"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="text-sm font-semibold text-[#222222] dark:text-gray-200 mb-2 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-[#FF5A5F]" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 XXXXXXXXXX"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#222222] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F] transition-all duration-200"
                                            />
                                        </div>

                                        {/* Bio */}
                                        <div>
                                            <label className="text-sm font-semibold text-[#222222] dark:text-gray-200 mb-2 flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-[#FF5A5F]" />
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                placeholder="Tell us a bit about yourself..."
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#222222] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F] transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        {/* Social links side by side */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {formFields.slice(4).map((field) => {
                                                const Icon = field.icon;
                                                return (
                                                    <div key={field.name}>
                                                        <label className="text-sm font-semibold text-[#222222] dark:text-gray-200 mb-2 flex items-center gap-2">
                                                            <Icon className="w-4 h-4 text-[#FF5A5F]" />
                                                            {field.label}
                                                        </label>
                                                        <input
                                                            type="url"
                                                            name={field.name}
                                                            value={formData[field.name]}
                                                            onChange={handleChange}
                                                            placeholder={field.placeholder}
                                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#222222] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F] transition-all duration-200"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shadow-lg shadow-[#FF5A5F]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {saving ? (
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Save className="w-5 h-5" />
                                                )}
                                                {saving ? 'Saving...' : (isFirstTime ? 'Complete Setup' : 'Save Changes')}
                                            </button>
                                            {!isFirstTime && (
                                                <button
                                                    onClick={handleCancel}
                                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                                >
                                                    <X className="w-5 h-5" />
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* View Mode */
                                    <div className="space-y-1">
                                        {/* Email row */}
                                        <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                            <div className="w-10 h-10 rounded-xl bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-[#FF5A5F]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Email</p>
                                                <p className="text-[#222222] dark:text-white font-medium truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        {formFields.map((field) => {
                                            const Icon = field.icon;
                                            const value = user[field.name] || '';
                                            return (
                                                <div
                                                    key={field.name}
                                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 group"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="w-5 h-5 text-[#FF5A5F]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{field.label}</p>
                                                        <p className="text-[#222222] dark:text-white font-medium truncate">
                                                            {value || <span className="text-gray-400 dark:text-gray-600 italic">Not set</span>}
                                                        </p>
                                                    </div>
                                                    {(field.name === 'github' || field.name === 'linkedin') && value && (
                                                        <a
                                                            href={value}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-[#FF5A5F] transition-colors duration-200"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <BottomDock />
        </div>
    );
};

export default Profile;
