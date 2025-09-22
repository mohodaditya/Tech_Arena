import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ExternalLink, 
  Code, 
  Database, 
  Cpu, 
  Network, 
  Brain, 
  Calculator, 
  DollarSign, 
  Bot, 
  FileText, 
  Video, 
  Globe, 
  Zap,
  Target,
  Award,
  Users,
  Clock,
  Palette,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';

const Learn = () => {
  const resourceCategories = [
    {
      title: 'Computer Science Fundamentals',
      icon: Cpu,
      color: 'from-blue-500 to-indigo-600',
      resources: [
        {
          title: 'GeeksforGeeks OOPs Concepts',
          description: 'Complete guide to Object-Oriented Programming concepts',
          icon: '🎯',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'CodeWithHarry OOPs in C++ Playlist',
          description: 'Comprehensive C++ OOPs video course in Hindi',
          icon: '🎥',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL',
          difficulty: 'Beginner'
        },
        {
          title: 'GeeksforGeeks OS Basics',
          description: 'Operating Systems fundamentals and concepts',
          icon: '💻',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/operating-systems/',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'CodeWithHarry OS Full Course (Hindi)',
          description: 'Complete Operating Systems course in Hindi',
          icon: '🎥',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9aiL0kysYlfSOUgY5rNlOhUd',
          difficulty: 'Beginner'
        },
        {
          title: 'GeeksforGeeks CN Basics',
          description: 'Computer Networks fundamentals and protocols',
          icon: '🌐',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'Computer Networks Course (Neso Academy)',
          description: 'Comprehensive Computer Networks video lectures',
          icon: '🎥',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx',
          difficulty: 'Intermediate'
        },
        {
          title: 'GeeksforGeeks DBMS Notes',
          description: 'Database Management System concepts and SQL',
          icon: '🗄️',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/dbms/',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'GeeksforGeeks DSA Self-Paced Basics',
          description: 'Data Structures and Algorithms fundamentals',
          icon: '🔗',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/data-structures/',
          difficulty: 'Beginner to Advanced'
        },
        {
          title: 'CodeWithHarry DSA Course (Hindi)',
          description: 'Complete DSA course in Hindi with examples',
          icon: '🎥',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi',
          difficulty: 'Beginner to Intermediate'
        }
      ]
    },
    {
      title: 'Development (Web + Programming)',
      icon: Code,
      color: 'from-green-500 to-emerald-600',
      resources: [
        {
          title: 'CodeWithHarry C++ Full Course',
          description: 'Complete C++ programming course from basics to advanced',
          icon: '⚡',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL',
          difficulty: 'Beginner to Advanced'
        },
        {
          title: 'CodeWithHarry Python Playlist',
          description: 'Learn Python programming from scratch in Hindi',
          icon: '🐍',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'GeeksforGeeks Language Tutorials',
          description: 'Programming language tutorials and references',
          icon: '📚',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/programming-language/',
          difficulty: 'All Levels'
        },
        {
          title: 'CodeWithHarry Web Dev Full Course (Hindi)',
          description: 'Complete web development course covering HTML, CSS, JS',
          icon: '🌐',
          type: 'Video Course',
          url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'GeeksforGeeks Web Development Guide',
          description: 'Comprehensive web development tutorials and guides',
          icon: '💻',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/web-development/',
          difficulty: 'Beginner to Advanced'
        },
        {
          title: 'Stack Overflow for Doubts',
          description: 'Search programming doubts like "Reverse a linked list in C++"',
          icon: '💬',
          type: 'Q&A Platform',
          url: 'https://stackoverflow.com/',
          difficulty: 'All Levels'
        }
      ]
    },
    {
      title: 'Aptitude & Reasoning',
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      resources: [
        {
          title: 'GeeksforGeeks Aptitude Practice',
          description: 'Comprehensive aptitude questions with detailed solutions',
          icon: '🧮',
          type: 'Practice Platform',
          url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/',
          difficulty: 'All Levels'
        }
      ]
    },
    {
      title: 'AI & AI Agents (Beginner Level)',
      icon: Bot,
      color: 'from-purple-500 to-indigo-600',
      resources: [
        {
          title: 'GeeksforGeeks AI Basics',
          description: 'Introduction to Artificial Intelligence concepts',
          icon: '🤖',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/',
          difficulty: 'Beginner'
        },
        {
          title: 'The Cutting Edge School - AI Course',
          description: 'Comprehensive AI and Machine Learning course for beginners',
          icon: '🎯',
          type: 'Video Content',
          url: 'https://www.youtube.com/@TheCuttingEdgeSchool',
          difficulty: 'Beginner'
        },
        {
          title: 'AI in 2025 Explained (YouTube)',
          description: 'Latest trends and developments in AI technology',
          icon: '🚀',
          type: 'Educational Video',
          url: 'https://www.youtube.com/results?search_query=AI+in+2025+explained',
          difficulty: 'Beginner'
        }
      ]
    },
    {
      title: 'UI/UX Design',
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      resources: [
        {
          title: 'The Cutting Edge School - UI/UX Design',
          description: 'Complete UI/UX design course for beginners and professionals',
          icon: '🎨',
          type: 'Video Course',
          url: 'https://www.youtube.com/@TheCuttingEdgeSchool',
          difficulty: 'Beginner'
        },
        {
          title: 'GeeksforGeeks UI/UX Basics',
          description: 'User Interface and User Experience design fundamentals',
          icon: '📐',
          type: 'Tutorial',
          url: 'https://www.geeksforgeeks.org/ui-ux-design/',
          difficulty: 'Beginner to Intermediate'
        },
        {
          title: 'The Cutting Edge School - Figma Course',
          description: 'Learn Figma design tool from basics to advanced',
          icon: '🎯',
          type: 'Video Course',
          url: 'https://www.youtube.com/@TheCuttingEdgeSchool',
          difficulty: 'Beginner'
        }
      ]
    },
    {
      title: 'Motivation & Career',
      icon: TrendingUp,
      color: 'from-teal-500 to-cyan-600',
      resources: [
        {
          title: 'CodeWithHarry "How to Start Coding" Video',
          description: 'Motivational guide for beginning your coding journey',
          icon: '🚀',
          type: 'Motivational Video',
          url: 'https://www.youtube.com/c/CodeWithHarry',
          difficulty: 'Beginner'
        },
        {
          title: 'Ansh Mehra Career Advice for Students',
          description: 'Career guidance and tips for tech students',
          icon: '💡',
          type: 'Career Guidance',
          url: 'https://www.youtube.com/@AnshMehra',
          difficulty: 'All Levels'
        }
      ]
    }
  ];

  const interviewResources = [
    {
      title: 'LeetCode',
      description: 'Practice coding problems for technical interviews',
      icon: '💻',
      type: 'Practice Platform',
      url: 'https://leetcode.com/',
      difficulty: 'All Levels'
    },
    {
      title: 'InterviewBit',
      description: 'Comprehensive interview preparation platform',
      icon: '🎯',
      type: 'Interview Prep',
      url: 'https://www.interviewbit.com/',
      difficulty: 'Intermediate'
    },
    {
      title: 'GeeksforGeeks Interview Corner',
      description: 'Company-wise interview experiences and questions',
      icon: '📋',
      type: 'Interview Prep',
      url: 'https://www.geeksforgeeks.org/company-interview-corner/',
      difficulty: 'All Levels'
    },
    {
      title: 'System Design Primer',
      description: 'Learn system design for technical interviews',
      icon: '🏗️',
      type: 'Study Guide',
      url: 'https://github.com/donnemartin/system-design-primer',
      difficulty: 'Advanced'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    if (difficulty.includes('Beginner')) return 'bg-green-100 text-green-800';
    if (difficulty.includes('Intermediate')) return 'bg-yellow-100 text-yellow-800';
    if (difficulty.includes('Advanced')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getTypeColor = (type) => {
    const typeColors = {
      'Tutorial': 'bg-blue-100 text-blue-800',
      'Video Course': 'bg-red-100 text-red-800',
      'Practice Platform': 'bg-purple-100 text-purple-800',
      'Q&A Platform': 'bg-orange-100 text-orange-800',
      'Video Content': 'bg-pink-100 text-pink-800',
      'Educational Video': 'bg-indigo-100 text-indigo-800',
      'Social Learning': 'bg-cyan-100 text-cyan-800',
      'Motivational Video': 'bg-emerald-100 text-emerald-800',
      'Career Guidance': 'bg-teal-100 text-teal-800',
      'Interview Prep': 'bg-fuchsia-100 text-fuchsia-800',
      'Study Guide': 'bg-slate-100 text-slate-800'
    };
    return typeColors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-[#FFF8F6]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="h-16 w-16 text-[#00A699] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-[#222222] mb-6">
              Unlock Knowledge 📖
            </h1>
            <p className="text-xl md:text-2xl text-[#484848] mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn and Grow at Your Own Pace
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#484848]">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Student-Focused</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Award className="h-4 w-4 text-green-500" />
                <span>Curated Quality</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Free Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {resourceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">
                      {category.title}
                    </h2>
                    <p className="text-[#484848] mt-1">
                      {category.resources.length} carefully curated resources
                    </p>
                  </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: resourceIndex * 0.1 }}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Resource Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-3xl mb-2">{resource.icon}</div>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#FF5A5F] transition-colors duration-300" />
                        </div>

                        <h3 className="text-lg font-bold text-[#222222] mb-2 group-hover:text-[#FF5A5F] transition-colors duration-300 line-clamp-2">
                          {resource.title}
                        </h3>
                        
                        <p className="text-[#484848] text-sm leading-relaxed mb-4 line-clamp-3">
                          {resource.description}
                        </p>

                        {/* Resource Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                            {resource.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                        </div>

                        {/* Open Button */}
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                        >
                          <span>Open</span>
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interview Preparation Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#222222]">
                Interview Preparation
              </h2>
            </div>
            <p className="text-xl text-[#484848] max-w-2xl mx-auto">
              Ace your technical interviews with these essential resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interviewResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl mb-2">{resource.icon}</div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#00A699] transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-[#222222] mb-2 group-hover:text-[#00A699] transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-[#484848] text-sm leading-relaxed mb-4">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-3 bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-[#484848] mb-8 leading-relaxed">
              Join thousands of students who are already advancing their careers with these carefully curated resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                Explore All Resources
              </button>
              <button
                onClick={() => window.open('/', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                Take a Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <BottomDock />
    </div>
  );
};

export default Learn;