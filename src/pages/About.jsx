import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Users, 
  Award, 
  Zap, 
  Brain, 
  TrendingUp, 
  Shield,
  CheckCircle,
  Star,
  Code,
  Database,
  Cpu,
  Network,
  Lightbulb
} from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Topic-Based Quizzes',
      description: 'Test your knowledge on DSA, DBMS, OS, CN, OOPs, Aptitude, Finance, Development, Machine Learning, and programming languages.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Instant Feedback & Explanations',
      description: 'Understand why answers are correct or incorrect with detailed explanations for every question.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: TrendingUp,
      title: 'Leaderboard & Progress Tracking',
      description: 'Track your performance, compare with peers, and improve continuously with our ranking system.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Curated guides, tutorials, and references to enhance your skills across all technical domains.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Star,
      title: 'Motivational & Engaging UI',
      description: 'Modern, premium design inspired by industry leaders with smooth animations and intuitive navigation.',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Select a Quiz Category',
      description: 'Pick a topic or go for a random mix of questions from our comprehensive question bank.',
      icon: Target
    },
    {
      step: '02',
      title: 'Answer Questions',
      description: 'Each question has a timer and provides immediate feedback to enhance your learning experience.',
      icon: CheckCircle
    },
    {
      step: '03',
      title: 'Check Your Score',
      description: 'View total score, category-wise strengths, and detailed explanations for better understanding.',
      icon: Award
    },
    {
      step: '04',
      title: 'Explore Learning Resources',
      description: 'Access suggested materials based on your performance to strengthen weak areas.',
      icon: BookOpen
    }
  ];

  const techStack = [
    { name: 'React', icon: Code, description: 'Modern JavaScript library for building user interfaces' },
    { name: 'Tailwind CSS', icon: Lightbulb, description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Framer Motion', icon: Zap, description: 'Production-ready motion library for React' },
    { name: 'React Router', icon: Network, description: 'Declarative routing for React applications' }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F6]">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-[#FF5A5F] mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold text-[#222222]">
                About Tech Arena
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-[#484848] mb-8 max-w-4xl mx-auto leading-relaxed">
              Your One-Stop Platform to Learn, Practice, and Compete in the Tech Domain
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#484848]">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Users className="h-4 w-4 text-[#FF5A5F]" />
                <span>Student-Focused</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Award className="h-4 w-4 text-[#00A699]" />
                <span>Performance Tracking</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Brain className="h-4 w-4 text-[#FF8E53]" />
                <span>Interactive Learning</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-8">
              Our Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <Target className="h-12 w-12 text-[#FF5A5F] mb-6" />
                <p className="text-lg text-[#484848] leading-relaxed">
                  Tech Arena is designed to empower students and professionals in the tech domain. 
                  Our mission is to provide a fun, interactive, and engaging way to learn computer 
                  science, programming, and related skills.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <Users className="h-12 w-12 text-[#00A699] mb-6" />
                <p className="text-lg text-[#484848] leading-relaxed">
                  We aim to make learning accessible, structured, and rewarding by combining 
                  quizzes, resources, and performance tracking to help you unlock your true potential.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6">
              Key Features
            </h2>
            <p className="text-xl text-[#484848] max-w-3xl mx-auto">
              Discover what makes Tech Arena the perfect platform for your learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-[#484848] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6">
              How Tech Arena Works
            </h2>
            <p className="text-xl text-[#484848] max-w-3xl mx-auto">
              Follow these simple steps to start your learning journey
            </p>
          </motion.div>

          <div className="space-y-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-[#222222]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-lg text-[#484848] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="w-24 h-24 bg-gradient-to-r from-[#00A699] to-[#00C9A7] rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-8">
              Why We Built Tech Arena
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-2xl flex items-center justify-center mb-6">
                    <Lightbulb className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-lg text-[#484848] leading-relaxed mb-6">
                    Many students struggle to find a structured, fun way to practice computer science 
                    and programming concepts. Tech Arena bridges that gap by combining quizzes, 
                    real-time feedback, learning resources, and gamified progression.
                  </p>
                  <p className="text-lg text-[#484848] leading-relaxed">
                    We believe learning should be interactive, rewarding, and engaging — so students 
                    can unlock their true potential and excel in their technical careers.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, index) => {
                    const Icon = tech.icon;
                    return (
                      <div key={tech.name} className="bg-gray-50 rounded-2xl p-4 text-center">
                        <Icon className="h-8 w-8 text-[#FF5A5F] mx-auto mb-2" />
                        <h4 className="font-bold text-[#222222] mb-1">{tech.name}</h4>
                        <p className="text-xs text-[#484848]">{tech.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-8">
              Credits & Information
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <Code className="h-12 w-12 text-[#FF5A5F] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#222222] mb-2">Built With</h3>
                  <p className="text-[#484848]">React, Tailwind CSS, Framer Motion</p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 text-[#00A699] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#222222] mb-2">Purpose</h3>
                  <p className="text-[#484848]">Learning & Interview Preparation</p>
                </div>
                <div className="text-center">
                  <Star className="h-12 w-12 text-[#FF8E53] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#222222] mb-2">Version</h3>
                  <p className="text-[#484848]">Tech Arena v1.0</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8">
                <p className="text-lg text-[#484848] leading-relaxed mb-4">
                  Tech Arena is a comprehensive educational platform designed to help users explore and practice technical and logical concepts. This project was developed by Aditya Mohod for the PCET Tech Fest Hackathon. It combines knowledge from multiple domains such as DSA, DBMS, Operating Systems, OOPs, AI, Machine Learning, Finance, Development, and Aptitude into an interactive quiz-based learning experience.
                </p>
                <p className="text-[#484848] mb-6">
                  <strong>Developed by:</strong> Aditya Mohod
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white rounded-2xl font-semibold">
                    🚀 Ready for Production
                  </div>
                  <div className="px-6 py-3 bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white rounded-2xl font-semibold">
                    📱 Mobile Optimized
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BottomDock />
    </div>
  );
};

export default About;