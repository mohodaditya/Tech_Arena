import React, { createContext, useContext, useState, useMemo } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const setUserInfo = (userData) => {
    setUser({
      ...userData,
      totalScore: userData.totalScore || 0
    });
  };

  const addQuizResult = (category, score, totalQuestions) => {
    const quizResult = {
      category,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      date: new Date().toISOString()
    };
    
    setQuizHistory(prev => [...prev, quizResult]);
    
    // Update user's total score if user exists
    if (user) {
      setUser(prev => ({
        ...prev,
        totalScore: (prev.totalScore || 0) + score
      }));
    }
  };
  return (
    <UserContext.Provider value={{
      user,
      setUserInfo,
      isAuthenticated,
      quizHistory,
      addQuizResult
    }}>
      {children}
    </UserContext.Provider>
  );
};