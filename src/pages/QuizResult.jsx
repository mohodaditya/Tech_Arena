import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, Award, Target, TrendingUp } from 'lucide-react';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const { score = 0, totalQuestions = 0, correctAnswers = 0, category = 'Quiz' } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    // Trigger confetti if score > 70%
    if (score > 70) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF5A5F', '#FF8E53', '#00A699']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF5A5F', '#FF8E53', '#00A699']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }

    // Animate score counter
    const interval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < score) {
          return Math.min(prev + 2, score);
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [score, location.state, navigate]);

  const getMotivationalMessage = () => {
    if (score < 40) {
      return {
        message: "Keep practicing!",
        subtitle: "Every expert was once a beginner. Keep learning and you'll improve!",
        color: "from-red-400 to-pink-500",
        icon: Target
      };
    } else if (score < 70) {
      return {
        message: "Good job, keep improving!",
        subtitle: "You're on the right track. A little more practice will make you perfect!",
        color: "from-yellow-400 to-orange-500",
        icon: TrendingUp
      };
    } else {
      return {
        message: "Excellent! You're a Tech Champion! 🏆",
        subtitle: "Outstanding performance! You've mastered this topic!",
        color: "from-green-400 to-emerald-500",
        icon: Award
      };
    }
  };

  const motivationalData = getMotivationalMessage();
  const MotivationalIcon = motivationalData.icon;

  return (
    <div className="min-h-screen bg-[#FFF8F6] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-100"
      >
        {/* Trophy Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <Trophy size={64} className="mx-auto text-[#FF5A5F] mb-4" />
            <MotivationalIcon size={32} className="absolute -bottom-2 -right-2 text-[#00A699]" />
          </div>
        </motion.div>

        {/* Quiz Complete Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-[#222222] mb-2"
        >
          {category} Quiz Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#484848] mb-8"
        >
          Here's how you performed
        </motion.p>

        {/* Score Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${motivationalData.color} bg-clip-text text-transparent mb-4`}>
            {Math.round(animatedScore)}%
          </div>
          <div className="text-xl text-[#484848]">
            {correctAnswers} out of {totalQuestions} questions correct
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8"
        >
          <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${motivationalData.color} bg-clip-text text-transparent mb-3`}>
            {motivationalData.message}
          </h2>
          <p className="text-[#484848] text-lg leading-relaxed">
            {motivationalData.subtitle}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-8"
        >
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            <RotateCcw size={20} />
            Play Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            <Home size={20} />
            Choose Another Category
          </button>
        </motion.div>

        {/* Performance Breakdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pt-8 border-t border-gray-200"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-green-700 font-medium">Correct</div>
            </div>
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
              <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-red-700 font-medium">Wrong</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
              <div className="text-sm text-blue-700 font-medium">Total</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuizResult;