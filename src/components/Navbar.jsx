import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Home, Brain, BookOpen, User, Trophy, Info, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Quiz Section', path: '/#quiz-section', icon: Brain },
    { name: 'Resources/Learn', path: '/learn', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info }
  ];

  const handleMenuClick = (path) => {
    setIsMenuOpen(false);
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
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#222222] group-hover:text-[#FF5A5F] transition-colors duration-300">
                Tech Arena
              </span>
            </Link>

            {/* User Info (Desktop) */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                {(() => {
                  const generateInitialsAvatar = (name) => {
                    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                    const colors = ['#FF5A5F', '#00A699', '#FF8E53', '#8B5CF6', '#06B6D4'];
                    const color = colors[name.length % colors.length];
                    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 100;
                    canvas.height = 100;
                    
                    ctx.fillStyle = color;
                    ctx.fillRect(0, 0, 100, 100);
                    
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 40px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(initials, 50, 50);
                    
                    return canvas.toDataURL('image/png');
                  };
                  
                  return (
                    <>
                <img
                      src={user.profilePic || user.profilePicture || generateInitialsAvatar(user.name)}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
                <span className="text-sm font-medium text-[#222222]">
                  {user.name}
                </span>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-xl">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-[#222222]">
                      {isAuthenticated ? `Hi, ${user?.name?.split(' ')[0]}!` : 'Menu'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    <X className="h-5 w-5 text-[#484848]" />
                  </button>
                </div>

                {/* User Profile Section (if authenticated) */}
                {user && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-[#FF5A5F]/10 to-[#FF8E53]/10 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const generateInitialsAvatar = (name) => {
                          const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                          const colors = ['#FF5A5F', '#00A699', '#FF8E53', '#8B5CF6', '#06B6D4'];
                          const color = colors[name.length % colors.length];
                          
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          canvas.width = 120;
                          canvas.height = 120;
                          
                          ctx.fillStyle = color;
                          ctx.fillRect(0, 0, 120, 120);
                          
                          ctx.fillStyle = '#FFFFFF';
                          ctx.font = 'bold 48px Arial';
                          ctx.textAlign = 'center';
                          ctx.textBaseline = 'middle';
                          ctx.fillText(initials, 60, 60);
                          
                          return canvas.toDataURL('image/png');
                        };
                        
                        return (
                      <img
                            src={user.profilePic || user.profilePicture || generateInitialsAvatar(user.name)}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                      />
                        );
                      })()}
                      <div>
                          <p className="text-sm text-[#484848]">{user.email}</p>
                          <p className="text-xs text-[#FF5A5F] font-medium">{user.college || 'Student'}</p>
                        <p className="text-xs text-[#FF5A5F] font-medium">{user.totalScore} points</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Menu Items */}
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || 
                      (item.path === '/' && location.pathname === '/');
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.path.includes('#') ? (
                          <button
                            onClick={() => handleMenuClick(item.path)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white shadow-lg'
                                : 'hover:bg-gray-50 text-[#484848] hover:text-[#FF5A5F]'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white shadow-lg'
                                : 'hover:bg-gray-50 text-[#484848] hover:text-[#FF5A5F]'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Menu Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-[#484848] text-center">
                    Practice • Learn • Compete
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-1">
                    Tech Arena v1.0
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;