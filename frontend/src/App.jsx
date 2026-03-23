import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Learn from './pages/Learn';
import QuizResult from './pages/QuizResult';
import About from './pages/About';
import Login from './pages/Login';
import DSAProblems from './pages/DSAProblems';
import DSAProblemSolver from './pages/DSAProblemSolver';
import Leaderboard from './pages/Leaderboard';
import Playground from './pages/Playground';
import QuizCategories from './pages/QuizCategories';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { UserProvider, useUser } from './context/UserContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useUser();
  const location = useLocation();

  // Wait for token verification before deciding
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F6] dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FF5A5F] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect first-time users to profile page
  if (user && !user.isProfileComplete && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-[#FFF8F6]">
        <ScrollToTop />
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute>
              <QuizCategories />
            </ProtectedRoute>
          } />
          <Route path="/quiz/:category" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />
          <Route path="/quiz-result" element={
            <ProtectedRoute>
              <QuizResult />
            </ProtectedRoute>
          } />
          <Route path="/learn" element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/dsa" element={
            <ProtectedRoute>
              <DSAProblems />
            </ProtectedRoute>
          } />
          <Route path="/dsa/:id" element={
            <ProtectedRoute>
              <DSAProblemSolver />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
          <Route path="/playground" element={
            <ProtectedRoute>
              <Playground />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
