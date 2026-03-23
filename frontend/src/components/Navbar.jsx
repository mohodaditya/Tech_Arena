import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Brain, BookOpen, Info, Moon, Sun, Code2, Trophy, User } from 'lucide-react';
import techArenaLogo from '../assets/logo.png';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  const { theme, toggleTheme } = useTheme();


  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Playground', path: '/playground', icon: Code2 },
    { name: 'DSA Arena', path: '/dsa', icon: Code2 },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Quiz', path: '/quiz', icon: Brain },
    { name: 'Resources/Learn', path: '/learn', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info }
  ];

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleMenuClick = (path) => {
    setIsMenuOpen(false);
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#');
      if (location.pathname !== pathname) {
        navigate(path);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
  };

  const userAvatar = useMemo(() => {
    if (!user) return null;

    if (user.profilePic || user.profilePicture) {
      return user.profilePic || user.profilePicture;
    }

    const name = user.name || 'User';
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
  }, [user]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={techArenaLogo} alt="Tech Arena" className="h-10 w-10 rounded-xl group-hover:scale-105 transition-transform duration-300" />
              <span className="text-2xl font-bold text-[#222222] dark:text-white group-hover:text-[#FF5A5F] transition-colors duration-300">
                Tech Arena
              </span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* User Info (Desktop) */}
              {user && (
                <Link to="/profile" className="hidden md:flex items-center space-x-4 mr-4 hover:opacity-80 transition-opacity duration-200">
                  <img
                    src={userAvatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium text-[#222222] dark:text-gray-200">
                    {user.name}
                  </span>
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Login Button (Desktop) */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="hidden md:flex items-center px-6 py-2 ml-4 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-medium hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>
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
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto transition-colors duration-300 flex flex-col"
            >
              <div className="p-6 flex-grow">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <img src={techArenaLogo} alt="Tech Arena" className="h-9 w-9 rounded-xl" />
                    <span className="text-xl font-bold text-[#222222] dark:text-white">
                      {isAuthenticated ? `Hi, ${user?.name?.split(' ')[0]}!` : 'Menu'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    <X className="h-5 w-5 text-[#484848] dark:text-gray-400" />
                  </button>
                </div>

                {/* User Profile Section (if authenticated) */}
                {user && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-[#FF5A5F]/10 to-[#FF8E53]/10 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={userAvatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-sm text-[#484848] dark:text-gray-300 truncate w-40" title={user.email}>{user.email}</p>
                        <p className="text-xs text-[#FF5A5F] font-medium">{user.college || 'Student'}</p>
                        <p className="text-xs text-[#FF5A5F] font-medium">{user.totalScore || 0} points</p>
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
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                              ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white shadow-lg'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#484848] dark:text-gray-300 hover:text-[#FF5A5F] dark:hover:text-[#FF5A5F]'
                              }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                              ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white shadow-lg'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-[#484848] dark:text-gray-300 hover:text-[#FF5A5F] dark:hover:text-[#FF5A5F]'
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
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex justify-center items-center py-2.5 px-4 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] transition-all duration-300"
                  >
                    Logout
                  </button>
                )}
                <p className="text-sm text-[#484848] dark:text-gray-500 text-center">
                  Practice • Learn • Compete
                </p>
                <p className="text-xs text-gray-400 text-center mt-1">
                  Tech Arena v2.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;