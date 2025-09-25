import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Learn from './pages/Learn';
import QuizResult from './pages/QuizResult';
import About from './pages/About';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-[#FFF8F6]">
        {/* ✅ Added basename so React Router works on GitHub Pages */}
        <Router basename="/Tech_Arena">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:category" element={<Quiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
