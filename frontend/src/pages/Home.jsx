import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, BookOpen, Trophy, Users, Star, Sparkles, Brain, Code2, GraduationCap, Swords, Zap, Target, BarChart3, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user, quizHistory } = useUser();

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  }, []);

  // Extract first name
  const firstName = useMemo(() => {
    if (!user?.name) return null;
    return user.name.split(' ')[0];
  }, [user?.name]);

  // Motivational subtitles
  const motivationalMessage = useMemo(() => {
    const messages = [
      "Ready to crush some goals today?",
      "Your next breakthrough is one step away!",
      "Let's turn your ambition into achievement!",
      "Time to level up your skills!",
      "Great things never came from comfort zones!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  const features = [
    {
      title: 'Quiz Arena',
      description: 'Test your knowledge across multiple domains with curated quizzes',
      icon: Brain,
      link: '/quiz',
      gradient: 'from-[#FF5A5F] to-[#FF8E53]',
      glowColor: 'rgba(255, 90, 95, 0.3)',
      darkGlowColor: 'rgba(255, 90, 95, 0.15)',
      iconBg: 'bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20',
      delay: 0,
    },
    {
      title: 'Learn Hub',
      description: 'Access roadmaps, cheatsheets & curated resources to level up',
      icon: GraduationCap,
      link: '/learn',
      gradient: 'from-[#00A699] to-[#00C9A7]',
      glowColor: 'rgba(0, 166, 153, 0.3)',
      darkGlowColor: 'rgba(0, 166, 153, 0.15)',
      iconBg: 'bg-[#00A699]/10 dark:bg-[#00A699]/20',
      delay: 0.1,
    },
    {
      title: 'DSA Arena',
      description: 'Solve data structures & algorithm challenges like a pro',
      icon: Swords,
      link: '/dsa',
      gradient: 'from-[#7C3AED] to-[#A78BFA]',
      glowColor: 'rgba(124, 58, 237, 0.3)',
      darkGlowColor: 'rgba(124, 58, 237, 0.15)',
      iconBg: 'bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20',
      delay: 0.2,
    },
    {
      title: 'Playground',
      description: 'Write, run & experiment with code in a real-time editor',
      icon: Code2,
      link: '/playground',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      glowColor: 'rgba(245, 158, 11, 0.3)',
      darkGlowColor: 'rgba(245, 158, 11, 0.15)',
      iconBg: 'bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20',
      delay: 0.3,
    },
  ];

  // Leaderboard data from API
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/leaderboard`);
        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const leaderboardPreview = leaderboardData.slice(0, 5);
  const userRank = user ? leaderboardData.findIndex(u => u.name === user.name) + 1 : null;


  return (
    <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 py-20 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Personalized Greeting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block text-lg md:text-xl font-medium text-[#FF5A5F] dark:text-[#FF8E53] tracking-wide uppercase">
                <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
                {' '}{greeting}{firstName ? `, ${firstName}` : ', Champion'}!
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300 leading-tight">
              {firstName ? (
                <>
                  Your Journey to{' '}
                  <span className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">
                    Greatness
                  </span>{' '}
                  Starts Here{' '}
                  <span className="inline-block">
                    <Rocket className="h-10 w-10 md:h-14 md:w-14 text-[#FF5A5F] animate-bounce" />
                  </span>
                </>
              ) : (
                <>
                  Unlock Your Career{' '}
                  <span className="inline-block">
                    <Rocket className="h-12 w-12 md:h-16 md:w-16 text-[#FF5A5F] animate-bounce" />
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-[#484848] dark:text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[#FF5A5F] dark:text-[#FF8E53] shrink-0" />
              {firstName ? motivationalMessage : 'Practice, Learn & Compete — All in One Place'}
              <Sparkles className="h-5 w-5 text-[#FF5A5F] dark:text-[#FF8E53] shrink-0" />
            </p>

            {/* Feature Showcase Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + feature.delay }}
                    className="h-full"
                  >
                    <Link
                      to={feature.link}
                      className="group relative flex flex-col h-full p-6 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.04] hover:-translate-y-1
                        bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl
                        border border-white/50 dark:border-white/[0.08]
                        shadow-lg hover:shadow-2xl"
                      style={{
                        '--glow-color': feature.glowColor,
                        '--dark-glow-color': feature.darkGlowColor,
                      }}
                    >
                      {/* Gradient accent bar at top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${feature.gradient} blur-xl -z-10`}
                        style={{ transform: 'scale(0.8)', filter: 'blur(40px)', opacity: 0 }}
                      />

                      {/* Icon */}
                      <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-7 w-7 bg-gradient-to-r ${feature.gradient} bg-clip-text`}
                          style={{
                            color: feature.gradient.includes('FF5A5F') ? '#FF5A5F'
                              : feature.gradient.includes('00A699') ? '#00A699'
                                : feature.gradient.includes('7C3AED') ? '#7C3AED'
                                  : '#F59E0B'
                          }}
                        />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-[#222222] dark:text-white mb-2 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#484848] dark:text-gray-400 leading-relaxed mb-4 transition-colors duration-300 flex-grow">
                        {feature.description}
                      </p>

                      {/* CTA Arrow */}
                      <div className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        <span>Explore</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
                          style={{
                            color: feature.gradient.includes('FF5A5F') ? '#FF5A5F'
                              : feature.gradient.includes('00A699') ? '#00A699'
                                : feature.gradient.includes('7C3AED') ? '#7C3AED'
                                  : '#F59E0B'
                          }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#00A699]/10 dark:bg-[#00A699]/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#7C3AED]/10 dark:bg-[#7C3AED]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-[#F59E0B]/10 dark:bg-[#F59E0B]/5 rounded-full blur-xl"></div>
      </section>



      {/* Progress & Leaderboard Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              Your Progress{' '}
              <span className="inline-block">
                <Trophy className="h-10 w-10 md:h-12 md:w-12 text-[#FF5A5F]" />
              </span>
            </h2>
            <p className="text-xl text-[#484848] dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Track your journey and see how you stack up against the competition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* User Stats Panel — Left (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-gray-900/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden h-full">
                {/* User Header */}
                <div className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30 shrink-0">
                    {user?.profilePic ? (
                      <img src={user.profilePic} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user?.name?.charAt(0) || '?'
                    )}
                  </div>
                  <div className="text-white text-left min-w-0">
                    <h3 className="text-xl font-bold truncate">{user?.name || 'Champion'}</h3>
                    <p className="text-white/80 text-sm">{user?.college || 'Tech Arena Member'}</p>
                  </div>
                  <div className="ml-auto text-right shrink-0">
                    <p className="text-white/70 text-xs uppercase tracking-wider font-medium">Total Score</p>
                    <p className="text-4xl font-black text-white">{user?.totalScore || 0}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Quiz Score */}
                    <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-[#FF5A5F]/10 dark:to-[#FF8E53]/5 border-2 border-rose-200 dark:border-[#FF5A5F]/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <div className="w-11 h-11 bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20 rounded-xl flex items-center justify-center mb-3">
                        <Brain className="h-6 w-6 text-[#FF5A5F]" />
                      </div>
                      <p className="text-xs font-medium text-[#484848] dark:text-gray-400 uppercase tracking-wider mb-1">Quiz Points</p>
                      <p className="text-3xl font-black text-[#222222] dark:text-white">{user?.quizScore || 0}</p>
                    </div>

                    {/* DSA Score */}
                    <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-[#7C3AED]/10 dark:to-[#A78BFA]/5 border-2 border-violet-200 dark:border-[#7C3AED]/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <div className="w-11 h-11 bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 rounded-xl flex items-center justify-center mb-3">
                        <Swords className="h-6 w-6 text-[#7C3AED]" />
                      </div>
                      <p className="text-xs font-medium text-[#484848] dark:text-gray-400 uppercase tracking-wider mb-1">DSA Points</p>
                      <p className="text-3xl font-black text-[#222222] dark:text-white">{user?.dsaScore || 0}</p>
                    </div>

                    {/* Quizzes Taken */}
                    <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-[#00A699]/10 dark:to-[#00C9A7]/5 border-2 border-teal-200 dark:border-[#00A699]/20 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <div className="w-11 h-11 bg-[#00A699]/10 dark:bg-[#00A699]/20 rounded-xl flex items-center justify-center mb-3">
                        <Star className="h-6 w-6 text-[#00A699]" />
                      </div>
                      <p className="text-xs font-medium text-[#484848] dark:text-gray-400 uppercase tracking-wider mb-1">Quizzes Taken</p>
                      <p className="text-3xl font-black text-[#222222] dark:text-white">{quizHistory?.length || 0}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 px-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#484848] dark:text-gray-400">Score Breakdown</span>
                      <span className="text-sm font-semibold text-[#222222] dark:text-white">{user?.totalScore || 0} pts</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                      {(user?.quizScore || 0) > 0 && (
                        <div
                          className="h-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-l-full transition-all duration-1000"
                          style={{ width: `${((user?.quizScore || 0) / Math.max(user?.totalScore || 1, 1)) * 100}%` }}
                          title={`Quiz: ${user?.quizScore || 0}`}
                        />
                      )}
                      {(user?.dsaScore || 0) > 0 && (
                        <div
                          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] transition-all duration-1000"
                          style={{ width: `${((user?.dsaScore || 0) / Math.max(user?.totalScore || 1, 1)) * 100}%` }}
                          title={`DSA: ${user?.dsaScore || 0}`}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-xs text-[#484848] dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53]"></span>
                        Quiz
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[#484848] dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]"></span>
                        DSA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Leaderboard Preview — Right (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-900/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden h-full flex flex-col">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-bold text-[#222222] dark:text-white">Leaderboard</h3>
                  </div>
                  <Link
                    to="/leaderboard"
                    className="text-sm font-semibold text-[#FF5A5F] dark:text-[#FF8E53] hover:underline flex items-center gap-1 group"
                  >
                    View All
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Top 5 List */}
                <div className="flex-1 divide-y divide-gray-50 dark:divide-gray-800">
                  {leaderboardPreview.map((player, index) => {
                    const rank = index + 1;
                    const isCurrentUser = user && player.name === user.name;
                    return (
                      <div
                        key={player._id}
                        className={`flex items-center gap-3 px-6 py-3.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${isCurrentUser ? 'bg-[#FF5A5F]/5 dark:bg-[#FF5A5F]/10' : ''}`}
                      >
                        {/* Rank Badge */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                          ${rank === 1 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400' :
                            rank === 2 ? 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' :
                              rank === 3 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                                'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500'}`}
                        >
                          {rank}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-[#FF5A5F]' : 'text-[#222222] dark:text-white'}`}>
                            {player.name} {isCurrentUser && <span className="text-xs font-normal text-[#FF5A5F]/70">(You)</span>}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="flex items-center gap-0.5"><Brain className="h-3 w-3" />{player.quizScore}</span>
                            <span className="flex items-center gap-0.5"><Code2 className="h-3 w-3" />{player.dsaScore}</span>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="text-right shrink-0">
                          <p className="text-lg font-black text-[#222222] dark:text-white">{player.totalScore}</p>
                          <p className="text-xs text-gray-400">pts</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* User's Rank Footer */}
                {userRank && (
                  <div className="px-6 py-4 bg-gradient-to-r from-[#FF5A5F]/5 to-[#FF8E53]/5 dark:from-[#FF5A5F]/10 dark:to-[#FF8E53]/10 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#484848] dark:text-gray-400">Your Rank</span>
                      <span className="text-lg font-bold text-[#FF5A5F]">#{userRank}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section
        className="py-24 px-4 bg-gradient-to-br from-white via-orange-50/30 to-rose-50/30 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 overflow-hidden relative feature-showcase-section"
        onMouseMove={(e) => {
          const cursor = document.getElementById('feature-cursor');
          if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
          }
        }}
        onMouseLeave={() => {
          const cursor = document.getElementById('feature-cursor');
          if (cursor) cursor.style.opacity = '0';
        }}
      >
        {/* Custom Cursor */}
        <div
          id="feature-cursor"
          className="pointer-events-none fixed w-64 h-64 rounded-full opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255,90,95,0.08) 0%, rgba(255,142,83,0.04) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FF5A5F]/10 dark:bg-[#FF5A5F]/20 text-[#FF5A5F] text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
              ✨ Why Tech Arena
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">Excel</span>
            </h2>
            <p className="text-xl text-[#484848] dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Five powerful features designed to accelerate your tech career
            </p>
          </motion.div>

          <div className="space-y-0">
            {/* Feature 1 — Quiz Arena */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16 py-14"
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#FF5A5F] to-[#FF8E53] flex items-center justify-center shadow-2xl shadow-[#FF5A5F]/20">
                    <Brain className="h-16 w-16 md:h-20 md:w-20 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-[#FF5A5F]/10 text-[#FF5A5F] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">01</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3">Quiz Arena</h3>
                <p className="text-lg text-[#484848] dark:text-gray-400 mb-5 leading-relaxed">
                  Challenge yourself with curated quizzes across multiple domains — from technical aptitude to core CS subjects.
                </p>
                <ul className="space-y-2 text-[#484848] dark:text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] shrink-0"></span> Multiple categories & difficulty levels</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] shrink-0"></span> Instant scoring & performance tracking</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] shrink-0"></span> Compete with peers on the leaderboard</li>
                </ul>
                <Link to="/quiz" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-xl shadow-lg shadow-[#FF5A5F]/20 hover:shadow-xl hover:shadow-[#FF5A5F]/30 hover:scale-105 transition-all duration-300 text-sm">
                  Try it now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

            {/* Feature 2 — Learn Hub (reversed) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 py-14"
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#00A699] to-[#00C9A7] flex items-center justify-center shadow-2xl shadow-[#00A699]/20">
                    <GraduationCap className="h-16 w-16 md:h-20 md:w-20 text-white" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <BookOpen className="h-5 w-5 text-[#00A699]" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-[#00A699]/10 text-[#00A699] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">02</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3">Learn Hub</h3>
                <p className="text-lg text-[#484848] dark:text-gray-400 mb-5 leading-relaxed">
                  Access structured roadmaps, cheatsheets, and expert-curated resources to fast-track your learning.
                </p>
                <ul className="space-y-2 text-[#484848] dark:text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00A699] shrink-0"></span> DSA, OS, DBMS & more topic roadmaps</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00A699] shrink-0"></span> Downloadable cheatsheets & PDFs</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00A699] shrink-0"></span> Curated external resources & guides</li>
                </ul>
                <Link to="/learn" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white font-semibold rounded-xl shadow-lg shadow-[#00A699]/20 hover:shadow-xl hover:shadow-[#00A699]/30 hover:scale-105 transition-all duration-300 text-sm">
                  Explore resources <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

            {/* Feature 3 — DSA Arena */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16 py-14"
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center shadow-2xl shadow-[#7C3AED]/20">
                    <Swords className="h-16 w-16 md:h-20 md:w-20 text-white" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <Target className="h-5 w-5 text-[#7C3AED]" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">03</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3">DSA Arena</h3>
                <p className="text-lg text-[#484848] dark:text-gray-400 mb-5 leading-relaxed">
                  Solve real coding challenges with our built-in code editor and Judge0-powered execution engine.
                </p>
                <ul className="space-y-2 text-[#484848] dark:text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0"></span> JavaScript, Python, Java & C++ support</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0"></span> Hidden test cases with instant feedback</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0"></span> Earn points & climb the leaderboard</li>
                </ul>
                <Link to="/dsa" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white font-semibold rounded-xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/30 hover:scale-105 transition-all duration-300 text-sm">
                  Solve problems <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

            {/* Feature 4 — Playground (reversed) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 py-14"
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] flex items-center justify-center shadow-2xl shadow-[#F59E0B]/20">
                    <Code2 className="h-16 w-16 md:h-20 md:w-20 text-white" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <Shield className="h-5 w-5 text-[#F59E0B]" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">04</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3">Code Playground</h3>
                <p className="text-lg text-[#484848] dark:text-gray-400 mb-5 leading-relaxed">
                  A free-form coding sandbox to experiment, prototype, and practice code without any restrictions.
                </p>
                <ul className="space-y-2 text-[#484848] dark:text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0"></span> Multi-language support with syntax highlighting</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0"></span> Real-time code execution via Judge0</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0"></span> No signup required — just code & run</li>
                </ul>
                <Link to="/playground" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-xl shadow-lg shadow-[#F59E0B]/20 hover:shadow-xl hover:shadow-[#F59E0B]/30 hover:scale-105 transition-all duration-300 text-sm">
                  Start coding <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

            {/* Feature 5 — Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16 py-14"
            >
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#EC4899] to-[#F472B6] flex items-center justify-center shadow-2xl shadow-[#EC4899]/20">
                    <BarChart3 className="h-16 w-16 md:h-20 md:w-20 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <Trophy className="h-5 w-5 text-[#EC4899]" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-[#EC4899]/10 text-[#EC4899] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">05</span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#222222] dark:text-white mb-3">Live Leaderboard</h3>
                <p className="text-lg text-[#484848] dark:text-gray-400 mb-5 leading-relaxed">
                  See how you rank against other learners in real-time with our combined scoring system.
                </p>
                <ul className="space-y-2 text-[#484848] dark:text-gray-400 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shrink-0"></span> Combined quiz + DSA scoring</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shrink-0"></span> Real-time ranking updates</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shrink-0"></span> Track your progress over time</li>
                </ul>
                <Link to="/leaderboard" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white font-semibold rounded-xl shadow-lg shadow-[#EC4899]/20 hover:shadow-xl hover:shadow-[#EC4899]/30 hover:scale-105 transition-all duration-300 text-sm">
                  View rankings <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              About{' '}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">Tech Arena</span>
            </h2>
            <p className="text-lg text-[#484848] dark:text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto transition-colors duration-300">
              Tech Arena is your all-in-one platform to learn, code, compete, and grow in the tech domain.
              From topic-based quizzes and DSA coding challenges to a free code playground and live leaderboard
              — everything you need to excel in your tech career, in one place.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <Brain className="h-10 w-10 text-[#FF5A5F] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#222222] dark:text-white mb-1">Quizzes</h3>
                <p className="text-sm text-[#484848] dark:text-gray-400">10+ categories</p>
              </div>
              <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <Swords className="h-10 w-10 text-[#7C3AED] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#222222] dark:text-white mb-1">DSA Arena</h3>
                <p className="text-sm text-[#484848] dark:text-gray-400">Real coding challenges</p>
              </div>
              <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <Code2 className="h-10 w-10 text-[#F59E0B] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#222222] dark:text-white mb-1">Playground</h3>
                <p className="text-sm text-[#484848] dark:text-gray-400">Code & run instantly</p>
              </div>
              <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <BarChart3 className="h-10 w-10 text-[#EC4899] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#222222] dark:text-white mb-1">Leaderboard</h3>
                <p className="text-sm text-[#484848] dark:text-gray-400">Live rankings</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700 inline-block transition-colors duration-300">
              <p className="text-[#484848] dark:text-gray-300 mb-2">
                Designed & Developed by <strong className="text-[#222222] dark:text-white">Aditya Mohod</strong>
              </p>
              <p className="text-sm text-[#484848] dark:text-gray-500 mb-4">Built with React, Node.js, MongoDB & Judge0 API</p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-xl shadow-lg shadow-[#FF5A5F]/20 hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BottomDock />
    </div>
  );
};

export default Home;