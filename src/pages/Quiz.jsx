import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { questions, getRandomMix, categories } from '../data/questions';
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

  // Initialize questions based on category
  useEffect(() => {
    if (category === 'random') {
      setCurrentQuestions(getRandomMix(10));
    } else if (questions[category]) {
      setCurrentQuestions(questions[category]);
    } else {
      navigate('/');
      return;
    }
    setQuizStarted(true);
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
    const isCorrect = option === currentQuestions[currentQuestionIndex].answer;
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
      <div className="min-h-screen bg-[#FFF8F6] flex items-center justify-center">
        <div className="text-[#484848] text-xl">Loading quiz...</div>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const categoryInfo = categories.find(cat => cat.id === category);

  return (
    <div className="min-h-screen bg-[#FFF8F6] p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* Back Button and Category */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-[#484848] hover:text-[#FF5A5F]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#222222]">
              {categoryInfo ? `${categoryInfo.icon} ${categoryInfo.name}` : category.toUpperCase()} Quiz
            </h1>
            <p className="text-[#484848]">{categoryInfo?.description}</p>
          </div>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Timer and Question Counter */}
        <div className="flex justify-between items-center">
          <div className="text-[#484848] text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {currentQuestions.length}
          </div>
          
          <motion.div 
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
              timeLeft <= 5 
                ? 'bg-red-500 text-white shadow-red-200' 
                : 'bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white shadow-teal-200'
            }`}
            animate={timeLeft <= 5 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
          >
            <Clock size={20} />
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
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#222222] mb-8 leading-relaxed">
          {currentQuestion.question}
        </h2>
        
        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full p-4 rounded-2xl font-semibold transition-all duration-300 text-left border-2 ";
            
            if (showExplanation) {
              if (option === currentQuestion.answer) {
                buttonClass += "bg-green-50 text-green-800 border-green-300 shadow-green-100";
              } else if (option === selectedOption && option !== currentQuestion.answer) {
                buttonClass += "bg-red-50 text-red-800 border-red-300 shadow-red-100";
              } else {
                buttonClass += "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed";
              }
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-[#484848] hover:bg-[#FF5A5F]/5 hover:border-[#FF5A5F] hover:text-[#FF5A5F] hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-xl";
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
                  {showExplanation && option === currentQuestion.answer && (
                    <CheckCircle className="text-green-600" size={24} />
                  )}
                  {showExplanation && option === selectedOption && option !== currentQuestion.answer && (
                    <XCircle className="text-red-600" size={24} />
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
              className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl"
            >
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Explanation
              </h3>
              <p className="text-blue-700 leading-relaxed">{currentQuestion.explanation}</p>
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