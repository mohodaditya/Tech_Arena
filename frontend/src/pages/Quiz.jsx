import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { categories } from '../data/categories';
import { useUser } from '../context/UserContext';

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addQuizResult } = useUser();

  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  // Map URL category parameters to Database category values
  const getBackendCategory = (urlId) => {
    const map = {
      'dsa': 'DSA',
      'dbms': 'DBMS',
      'os': 'OS',
      'cn': 'CN',
      'oops': 'OOPs',
      'aptitude': 'Aptitude',
      'finance': 'Finance',
      'development': 'Development',
      'ml': 'Machine Learning',
      'ai': 'AI'
    };
    return map[urlId] || urlId;
  };

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/questions`;

        // If specific category, append query param
        if (category !== 'random') {
          const dbCategory = getBackendCategory(category);
          url += `?category=${encodeURIComponent(dbCategory)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data = await response.json();

        setCurrentQuestions(data);

        setQuizStarted(true);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback or error handling could go here
        // For now, if fetch fails, we could redirect or show error
      }
    };

    fetchQuestions();
  }, [category, navigate]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showExplanation || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showExplanation, timeLeft]);

  const handleTimeUp = () => {
    setSelectedOption(null);
    setShowExplanation(true);
  };

  const handleOptionClick = (option) => {
    if (selectedOption || showExplanation) return;

    setSelectedOption(option);
    const isCorrect = option === currentQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      // Quiz finished - add result to user context
      addQuizResult(category, score, currentQuestions.length);

      // Navigate to result page
      navigate('/quiz-result', {
        state: {
          score: Math.round((score / currentQuestions.length) * 100),
          totalQuestions: currentQuestions.length,
          correctAnswers: score,
          category: categories.find(cat => cat.id === category)?.name || category
        }
      });
    }
  };

  if (!currentQuestions.length) {
    return (
      <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="spinner mb-4"></div>
        <div className="text-[#FF5A5F] text-xl font-semibold animate-pulse">Loading quiz...</div>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const categoryInfo = categories.find(cat => cat.id === category);

  return (
    <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 p-4 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* Back Button and Category */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-[#484848] dark:text-gray-200 hover:text-[#FF5A5F] dark:hover:text-[#FF5A5F]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </button>

          <div className="text-left sm:text-center flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white">
              {categoryInfo ? `${categoryInfo.icon} ${categoryInfo.name}` : category.toUpperCase()} Quiz
            </h1>
            <p className="text-sm text-[#484848] dark:text-gray-400 hidden sm:block">{categoryInfo?.description}</p>
          </div>

          <div className="w-0 sm:w-20 hidden sm:block"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Timer and Question Counter */}
        <div className="flex justify-between items-center">
          <div className="text-[#484848] dark:text-gray-300 text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {currentQuestions.length}
          </div>

          <motion.div
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold text-base sm:text-lg shadow-lg transition-all duration-300 ${timeLeft <= 5
              ? 'bg-red-500 text-white shadow-red-200'
              : 'bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white shadow-teal-200'
              }`}
            animate={timeLeft <= 5 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
          >
            <Clock size={18} />
            <span>{timeLeft}s</span>
          </motion.div>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
      >
        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#222222] dark:text-white mb-8 leading-relaxed">
          {currentQuestion.questionText}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full p-4 rounded-2xl font-semibold transition-all duration-300 text-left border-2 ";

            if (showExplanation) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass += "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-600 shadow-green-100 dark:shadow-none";
              } else if (option === selectedOption && option !== currentQuestion.correctAnswer) {
                buttonClass += "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-600 shadow-red-100 dark:shadow-none";
              } else {
                buttonClass += "bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed";
              }
            } else {
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-[#484848] dark:text-gray-200 hover:bg-[#FF5A5F]/5 dark:hover:bg-[#FF5A5F]/20 hover:border-[#FF5A5F] dark:hover:border-[#FF5A5F] hover:text-[#FF5A5F] dark:hover:text-[#FF5A5F] hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-xl";
            }

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && option === currentQuestion.correctAnswer && (
                    <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                  )}
                  {showExplanation && option === selectedOption && option !== currentQuestion.correctAnswer && (
                    <XCircle className="text-red-600 dark:text-red-400" size={24} />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl"
            >
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Explanation
              </h3>
              <p className="text-blue-700 dark:text-blue-200 leading-relaxed">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {showExplanation && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleNextQuestion}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'View Results'}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;