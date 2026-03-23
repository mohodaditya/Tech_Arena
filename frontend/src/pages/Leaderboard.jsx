import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, User, Brain, Code2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';

const Leaderboard = () => {
    const { user } = useUser();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leaderboard`);
                if (response.ok) {
                    const data = await response.json();
                    setLeaderboardData(data);
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
            case 2: return <Medal className="h-6 w-6 text-gray-400" />;
            case 3: return <Medal className="h-6 w-6 text-amber-600" />;
            default: return <span className="font-bold text-gray-500 w-6 text-center">{rank}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4">
                            Leaderboard
                        </h1>
                        <p className="text-xl text-[#484848] dark:text-gray-400">
                            Top performers in Quiz & DSA
                        </p>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-[#FF5A5F] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : leaderboardData.length === 0 ? (
                    <div className="text-center py-20">
                        <Trophy className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-xl text-[#484848] dark:text-gray-400">No players on the leaderboard yet.</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Start solving quizzes and DSA problems to climb the ranks!</p>
                    </div>
                ) : (
                    <>

                        {/* Top 3 Podium */}
                        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16">
                            {leaderboardData.slice(0, 3).map((player, index) => (
                                <motion.div
                                    key={player._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`relative flex flex-col items-center p-4 sm:p-6 rounded-2xl shadow-xl w-full md:w-64 
                                ${index === 0 ? 'bg-gradient-to-b from-yellow-100 to-white dark:from-yellow-900/30 dark:to-gray-800 order-1 md:order-2 md:h-80 justify-center border-2 border-yellow-400' :
                                            index === 1 ? 'bg-white dark:bg-gray-800 order-2 md:order-1 md:h-72 justify-center' :
                                                'bg-white dark:bg-gray-800 order-3 md:order-3 md:h-64 justify-center'
                                        }`}
                                >
                                    <div className="absolute top-4">
                                        {getRankIcon(index + 1)}
                                    </div>
                                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-4 
                                ${index === 0 ? 'bg-yellow-100 text-yellow-600 border-yellow-400' :
                                            index === 1 ? 'bg-gray-100 text-gray-600 border-gray-400' :
                                                'bg-amber-100 text-amber-700 border-amber-600'}`}>
                                        {player.name.charAt(0)}
                                    </div>
                                    <h3 className="font-bold text-lg text-center dark:text-white mb-1">{player.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">{player.college}</p>
                                    <div className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white">
                                        {player.totalScore}
                                    </div>
                                    <div className="flex gap-3 mt-2 text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1"><Brain className="h-3 w-3" /> {player.quizScore}</span>
                                        <span className="flex items-center gap-1"><Code2 className="h-3 w-3" /> {player.dsaScore}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Ranking Table */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
                        >
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16 sm:w-20">Rank</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Quiz Points</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">DSA Points</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {leaderboardData.slice(3).map((player, index) => {
                                        const rank = index + 4;
                                        const isCurrentUser = user && player.name === user.name;

                                        return (
                                            <tr
                                                key={player._id}
                                                className={`group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors 
                                            ${isCurrentUser ? 'bg-[#FF5A5F]/5 dark:bg-[#FF5A5F]/10' : ''}`}
                                            >
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                    <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-800 font-bold text-sm text-gray-600 dark:text-gray-400 group-hover:bg-[#FF5A5F] group-hover:text-white transition-colors">
                                                        {rank}
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm sm:text-base">
                                                                {player.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div className="ml-2 sm:ml-4">
                                                            <div className={`text-xs sm:text-sm font-medium ${isCurrentUser ? 'text-[#FF5A5F]' : 'text-gray-900 dark:text-white'}`}>
                                                                {player.name} {isCurrentUser && '(You)'}
                                                            </div>
                                                            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">{player.college}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 hidden sm:table-cell">
                                                    {player.quizScore}
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300 hidden sm:table-cell">
                                                    {player.dsaScore}
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-bold text-[#222222] dark:text-white">
                                                    {player.totalScore}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </motion.div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Leaderboard;
