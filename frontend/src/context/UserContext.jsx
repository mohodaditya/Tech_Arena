import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  const [loading, setLoading] = useState(true);
  const [quizHistory, setQuizHistory] = useState(() => {
    const savedHistory = localStorage.getItem('tech_arena_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Needed to extract token from URL on frontend return
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if token is in the URL (just returned from Google OAuth)
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('tech_arena_token', tokenFromUrl);
      // Clean up the URL
      navigate(location.pathname, { replace: true });
    }

    // 2. Fetch User Data using the token
    const fetchUser = async () => {
      const token = localStorage.getItem('tech_arena_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('tech_arena_token');
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching auth user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.search, location.pathname, navigate]);

  const loginWithGoogle = () => {
    // Redirect browser to the backend Google OAuth route
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  const logout = () => {
    localStorage.removeItem('tech_arena_token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    localStorage.setItem('tech_arena_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const updateProfile = async (profileData) => {
    const token = localStorage.getItem('tech_arena_token');
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update profile');
    }

    const updatedUser = await response.json();
    setUser(updatedUser);
    return updatedUser;
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem('tech_arena_token');
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/api/auth/account`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete account');
    }

    logout();
  };



  const addDSAScore = async (points) => {
    // The backend DSA submit route already awards points via $inc.
    // We just need to re-fetch the user to sync the updated score.
    try {
      const token = localStorage.getItem('tech_arena_token');
      if (token) {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
        }
      }
    } catch (error) {
      console.error('Failed to sync DSA score:', error);
    }
  };

  const addQuizResult = async (category, score, totalQuestions) => {
    const quizResult = {
      category,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      date: new Date().toISOString()
    };

    setQuizHistory(prev => [...prev, quizResult]);

    // Persist quiz score to backend
    if (user) {
      try {
        const token = localStorage.getItem('tech_arena_token');
        if (token) {
          await fetch(`${API_BASE}/api/score/quiz`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ score })
          });

          // Re-fetch user to sync updated scores from DB
          const response = await fetch(`${API_BASE}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
          }
        }
      } catch (error) {
        console.error('Failed to persist quiz score:', error);
      }
    }
  };
  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      loginWithGoogle,
      logout,
      updateProfile,
      quizHistory,
      addQuizResult,
      addDSAScore,
      deleteAccount
    }}>
      {children}
    </UserContext.Provider>
  );
};