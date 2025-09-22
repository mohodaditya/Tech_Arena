import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Home, Brain, BookOpen, User } from 'lucide-react';

const BottomDock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dockItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Quiz', path: '/#quiz-section', icon: Brain },
    { name: 'Learn', path: '/learn', icon: BookOpen }
  ];

  const handleNavClick = (path) => {
    if (path.includes('#')) {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(path.split('#')[1]);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }
      const element = document.getElementById(path.split('#')[1]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/' && location.pathname === '/');

            return item.path.includes('#') ? (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-[#FF5A5F] bg-[#FF5A5F]/10'
                    : 'text-[#484848] hover:text-[#FF5A5F] hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-[#FF5A5F] bg-[#FF5A5F]/10'
                    : 'text-[#484848] hover:text-[#FF5A5F] hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomDock;