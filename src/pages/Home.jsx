import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, BookOpen, Trophy, Users, Star, Award, Target, LogIn, UserPlus } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';
import { categories } from '../data/questions';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user } = useUser();

  const resources = [
    { title: 'DSA Roadmaps', description: 'Complete guide to master algorithms', icon: '🗺️', link: '/learn' },
    { title: 'OS Cheatsheet', description: 'Quick reference for OS concepts', icon: '📋', link: '/learn' },
    { title: 'SQL & DBMS Guides', description: 'Database fundamentals made easy', icon: '🗃️', link: '/learn' },
    { title: 'Aptitude PDFs', description: 'Practice materials for aptitude', icon: '📚', link: '/learn' },
    { title: 'Finance Basics', description: 'Essential financial concepts', icon: '💡', link: '/learn' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#222222] mb-6">
              Unlock Your Career{' '}
              <span className="inline-block">
                <Rocket className="h-12 w-12 md:h-16 md:w-16 text-[#FF5A5F] animate-bounce" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#484848] mb-12 max-w-3xl mx-auto leading-relaxed">
              Practice, Learn & Compete — All in One Place
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection('quiz-section')}
                className="group px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Quiz</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => scrollToSection('resources-section')}
                className="px-8 py-4 bg-white text-[#FF5A5F] font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#FF5A5F] flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Explore Resources</span>
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF5A5F]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#00A699]/10 rounded-full blur-xl"></div>
      </section>

      {/* Quiz Categories Section */}
      <section id="quiz-section" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
              Choose Your Arena{' '}
              <span className="inline-block">
                <Target className="h-10 w-10 md:h-12 md:w-12 text-[#FF5A5F]" />
              </span>
            </h2>
            <p className="text-xl text-[#484848] max-w-2xl mx-auto">
              Select a category and test your knowledge with our curated questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/quiz/${category.id}`}
                  className="group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-[#222222] mb-2 group-hover:text-[#FF5A5F] transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-[#484848] text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-lg text-[#484848] font-medium bg-gradient-to-r from-[#FF5A5F] to-[#00A699] bg-clip-text text-transparent">
              "Consistency beats talent — Practice today!"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources-section" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
              Unlock Knowledge{' '}
              <span className="inline-block">
                <BookOpen className="h-10 w-10 md:h-12 md:w-12 text-[#00A699]" />
              </span>
            </h2>
            <p className="text-xl text-[#484848] max-w-2xl mx-auto">
              Access curated learning materials and resources to boost your skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={resource.link}
                  className="group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#222222] mb-2 group-hover:text-[#00A699] transition-colors duration-300">
                        {resource.title}
                      </h3>
                      <p className="text-[#484848] text-sm leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-8">
              About Tech Arena
            </h2>
            <p className="text-lg text-[#484848] leading-relaxed mb-8">
              Tech Arena is your ultimate destination for technical skill development. 
              We provide comprehensive quizzes, learning resources, and a competitive 
              environment to help you excel in your career journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <Users className="h-12 w-12 text-[#FF5A5F] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222222] mb-2">Community</h3>
                <p className="text-[#484848]">Join thousands of learners</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <Star className="h-12 w-12 text-[#00A699] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222222] mb-2">Quality</h3>
                <p className="text-[#484848]">Curated content by experts</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <Trophy className="h-12 w-12 text-[#FF5A5F] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222222] mb-2">Achievement</h3>
                <p className="text-[#484848]">Track your progress</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BottomDock />
    </div>
  );
};

export default Home;