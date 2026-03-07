import React from 'react';
import { Link } from 'react-router-dom';
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
  Lightbulb,
  Swords,
  BarChart3,
  Code2,
  GraduationCap,
  Heart,
  Github,
  Linkedin,
  Globe,
  ArrowRight,
  Server,
  Database,
  Layers
} from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomDock from '../components/BottomDock';
import techArenaLogo from '../assets/logo.png';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Quiz Arena',
      description: 'Test your knowledge across DSA, DBMS, OS, CN, OOPs, Aptitude, Finance, Development, ML, and programming languages with instant scoring.',
      color: 'from-[#FF5A5F] to-[#FF8E53]',
      link: '/quiz'
    },
    {
      icon: GraduationCap,
      title: 'Learn Hub',
      description: 'Access structured roadmaps, cheatsheets, and curated external resources to master any tech subject.',
      color: 'from-[#00A699] to-[#00C9A7]',
      link: '/learn'
    },
    {
      icon: Swords,
      title: 'DSA Arena',
      description: 'Solve real coding problems with a built-in editor, Judge0-powered execution, and hidden test cases across multiple languages.',
      color: 'from-[#7C3AED] to-[#A78BFA]',
      link: '/dsa'
    },
    {
      icon: Code2,
      title: 'Code Playground',
      description: 'A free-form coding sandbox supporting JavaScript, Python, Java & C++ with real-time execution — no signup required.',
      color: 'from-[#F59E0B] to-[#FBBF24]',
      link: '/playground'
    },
    {
      icon: BarChart3,
      title: 'Live Leaderboard',
      description: 'Compete with peers in real-time. Your quiz and DSA scores combine into one unified ranking system.',
      color: 'from-[#EC4899] to-[#F472B6]',
      link: '/leaderboard'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up in seconds and get a personalized dashboard tracking all your progress across quizzes and coding challenges.',
      icon: Users
    },
    {
      step: '02',
      title: 'Choose Your Arena',
      description: 'Pick from Quiz Arena, DSA Arena, Code Playground, or Learn Hub — each designed for a different learning style.',
      icon: Target
    },
    {
      step: '03',
      title: 'Practice & Compete',
      description: 'Solve quizzes, write code, crack DSA problems — get instant feedback, explanations, and earn points with every challenge.',
      icon: CheckCircle
    },
    {
      step: '04',
      title: 'Climb the Leaderboard',
      description: 'Your combined quiz + DSA scores rank you on the live leaderboard. Track progress and compete with peers.',
      icon: Award
    }
  ];

  const techStack = [
    { name: 'React', icon: Code, description: 'Modern UI library' },
    { name: 'Tailwind CSS', icon: Layers, description: 'Utility-first CSS' },
    { name: 'Framer Motion', icon: Zap, description: 'Smooth animations' },
    { name: 'Node.js', icon: Server, description: 'Backend runtime' },
    { name: 'MongoDB', icon: Database, description: 'NoSQL database' },
    { name: 'Judge0 API', icon: Code2, description: 'Code execution' }
  ];

  const stats = [
    { label: 'Quiz Categories', value: '10+', color: 'text-[#FF5A5F]' },
    { label: 'DSA Problems', value: '20+', color: 'text-[#7C3AED]' },
    { label: 'Languages', value: '4', color: 'text-[#F59E0B]' },
    { label: 'Learning Paths', value: '5+', color: 'text-[#00A699]' }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F6] dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-300 overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="mb-8"
            >
              <img src={techArenaLogo} alt="Tech Arena" className="h-20 w-20 mx-auto rounded-2xl shadow-2xl shadow-[#FF5A5F]/20" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#222222] dark:text-white mb-6 transition-colors duration-300 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent">
                Tech Arena
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#484848] dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              Your all-in-one platform to learn, code, compete, and grow in the tech domain — built by a developer, for developers.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {['Quiz Arena', 'DSA Arena', 'Code Playground', 'Learn Hub', 'Leaderboard'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm font-medium text-[#484848] dark:text-gray-300 rounded-full shadow-md border border-gray-100 dark:border-gray-700"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-[#484848] dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              Our Mission
            </h2>
            <p className="text-xl text-[#484848] dark:text-gray-400 max-w-2xl mx-auto">
              Making tech learning interactive, structured, and rewarding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF5A5F] to-[#FF8E53] rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] dark:text-white mb-3">The Problem</h3>
              <p className="text-lg text-[#484848] dark:text-gray-300 leading-relaxed transition-colors duration-300">
                Students often struggle to find a single platform that combines concept learning, coding practice,
                and competitive assessment. Resources are scattered, feedback is delayed, and motivation fades.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#00A699] to-[#00C9A7] rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] dark:text-white mb-3">Our Solution</h3>
              <p className="text-lg text-[#484848] dark:text-gray-300 leading-relaxed transition-colors duration-300">
                Tech Arena brings everything together — quizzes with instant feedback, a real code execution engine,
                DSA problem solving, learning roadmaps, and a live leaderboard to keep you motivated.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900/50 dark:to-gray-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              Platform Features
            </h2>
            <p className="text-xl text-[#484848] dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Five powerful modules working together to accelerate your growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={feature.link}
                    className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] h-full"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#222222] dark:text-white mb-3 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#484848] dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                      {feature.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] bg-clip-text text-transparent group-hover:gap-2 transition-all duration-300">
                      Try it out <ArrowRight className="h-4 w-4 text-[#FF5A5F]" />
                    </span>
                  </Link>
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
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              How It Works
            </h2>
            <p className="text-xl text-[#484848] dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Get started in four simple steps
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
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shrink-0">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-[#222222] dark:text-white transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-lg text-[#484848] dark:text-gray-300 leading-relaxed transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-r from-[#00A699] to-[#00C9A7] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-4 transition-colors duration-300">
              Built With Modern Tech
            </h2>
            <p className="text-xl text-[#484848] dark:text-gray-400 max-w-2xl mx-auto">
              A robust full-stack architecture powering every feature
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md border-2 border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Icon className="h-9 w-9 text-[#FF5A5F] mx-auto mb-3" />
                  <h4 className="font-bold text-[#222222] dark:text-white mb-1 text-lg">{tech.name}</h4>
                  <p className="text-sm text-[#484848] dark:text-gray-400">{tech.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] dark:text-white mb-12 transition-colors duration-300">
              Meet the Developer
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border-2 border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                viewport={{ once: true }}
                className="w-28 h-28 bg-gradient-to-br from-[#FF5A5F] to-[#FF8E53] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#FF5A5F]/20"
              >
                <span className="text-5xl font-bold text-white">A</span>
              </motion.div>

              <h3 className="text-3xl font-bold text-[#222222] dark:text-white mb-2">Aditya Mohod</h3>
              <p className="text-lg text-[#FF5A5F] font-semibold mb-6">Full-Stack Developer & Creator of Tech Arena</p>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-orange-800 dark:text-orange-200 shadow-sm">
                <p className="text-md font-medium text-center flex items-center justify-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  This is a practice project by Aditya Mohod
                </p>
              </div>

              <p className="text-lg text-[#484848] dark:text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto transition-colors duration-300">
                Tech Arena was designed, developed, and brought to life by <strong className="text-[#222222] dark:text-white">Aditya Mohod</strong>.
                Born from the vision of creating a single platform where students can learn, practice, and compete —
                this project combines a passion for clean design with full-stack engineering to deliver
                a premium learning experience.
              </p>

              <p className="text-[#484848] dark:text-gray-400 mb-8 transition-colors duration-300">
                Originally developed for the <strong className="text-[#222222] dark:text-white">PCET Tech Fest Hackathon</strong>,
                Tech Arena has grown into a comprehensive educational platform covering quizzes, DSA coding challenges,
                a code playground, learning resources, and a live competitive leaderboard.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 bg-[#FF5A5F]/10 text-[#FF5A5F] rounded-full text-sm font-semibold">React</span>
                <span className="px-4 py-2 bg-[#00A699]/10 text-[#00A699] rounded-full text-sm font-semibold">Node.js</span>
                <span className="px-4 py-2 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-sm font-semibold">MongoDB</span>
                <span className="px-4 py-2 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full text-sm font-semibold">Express</span>
                <span className="px-4 py-2 bg-[#EC4899]/10 text-[#EC4899] rounded-full text-sm font-semibold">Judge0 API</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF8E53] text-white rounded-2xl font-semibold shadow-lg shadow-[#FF5A5F]/20">
                    🚀 Production Ready
                  </div>
                  <div className="px-6 py-3 bg-gradient-to-r from-[#00A699] to-[#00C9A7] text-white rounded-2xl font-semibold shadow-lg shadow-[#00A699]/20">
                    📱 Mobile Optimized
                  </div>
                  <div className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white rounded-2xl font-semibold shadow-lg shadow-[#7C3AED]/20">
                    🌙 Dark Mode Support
                  </div>
                </div>
              </div>
            </div>

            {/* Made with love footer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 text-[#484848] dark:text-gray-500 flex items-center justify-center gap-2 text-lg"
            >
              Made with <Heart className="h-5 w-5 text-[#FF5A5F] fill-[#FF5A5F] animate-pulse" /> by Aditya Mohod
            </motion.p>
          </motion.div>
        </div>
      </section>

      <BottomDock />
    </div>
  );
};

export default About;