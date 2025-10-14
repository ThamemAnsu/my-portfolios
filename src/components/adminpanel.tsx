import React, { useState, useEffect, useRef,Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUser, FaCode, FaBriefcase, FaFolder, 
  FaEnvelope, FaSignOutAlt, FaPlus, FaBell, FaSun, 
  FaMoon, FaCog, FaTachometerAlt, FaChartLine,
  FaAngleRight, FaAngleLeft, FaBars,FaBook,FaLock
} from 'react-icons/fa';
import './AdminPanel.css';
import { SkillsManagement, SkillForm } from './SkillsManagement';
import { ExperienceManagement, ExperienceForm } from './ExperienceManagement';
import { ProjectsManagement, ProjectForm } from './ProjectsManagement';
import ProfileManagement from './ProfileManagement';
import MessagesManagement from './MessagesManagement';
import Resume from './Resume';
import Settings from './Settings';
import { GenerativeArtScene } from './loginUI';



// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Notification component
interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className={`notification notification-${type}`}
    >
      <div>{message}</div>
      <button className="close-notification" onClick={onDismiss}>×</button>
    </motion.div>
  );
};

// Authentication components
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Three.js Animated Background - Full Screen */}
      {isDarkMode && (
        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
          <GenerativeArtScene />
        </Suspense>
      )}
      
      {/* Subtle Gradient Overlay - Only on the form side */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-l from-black/80 via-transparent to-transparent' : 'bg-gradient-to-l from-gray-100/80 to-transparent'} z-10 pointer-events-none`} />
      
      {/* Left Side - Branding & Animation Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative z-20 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg"
        >
          <motion.h1 
            className="text-5xl xl:text-6xl font-bold text-white mb-6"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(252, 252, 252, 0.3)",
                "0 0 40px rgba(45, 212, 191, 0.5)",
                "0 0 20px rgba(45, 212, 191, 0.3)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            Portfolio
            <br />
            <span className="text-white">Admin Panel</span>
          </motion.h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Manage your portfolio with ease. Control your projects, skills, and experiences all in one place.
          </p>
          
          <div className="space-y-4">
            {[
              { icon: '🎨', text: 'Beautiful & Modern Interface' },
              { icon: '🔒', text: 'Secure Authentication' },
              { icon: '⚡', text: 'Fast & Responsive' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="flex items-center space-x-3 text-gray-300"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-lg">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 relative z-20 flex items-center justify-center p-6 lg:p-12">
        {/* Dark Mode Toggle */}
        

        {/* Login Form Container */}
       <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="p-8 lg:p-10 rounded-2xl shadow-2xl backdrop-blur-xl border border-gray-800 bg-black/95">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-white/10 border-2 border-white/30"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0, -5, 0],
              boxShadow: ['0 0 0 rgba(255,255,255,0.3)', '0 0 20px rgba(255,255,255,0.6)', '0 0 0 rgba(255,255,255,0.3)']
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <FaUser className="text-white text-3xl" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2 text-white">
            Welcome Back
          </h2>
          
          <p className="text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
          
          {/* Decorative Line */}
          <motion.div 
            className="mt-4 mx-auto w-16 h-1 bg-white rounded-full"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              boxShadow: ['0 0 5px rgba(255,255,255,0.5)', '0 0 15px rgba(255,255,255,0.8)', '0 0 5px rgba(255,255,255,0.5)']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
        
        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl border bg-red-500/10 text-red-400 border-red-500/30"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </motion.div>
        )}
        
        {/* Login Form */}
        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/70 transition-all border bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/70 transition-all border bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className={`w-full py-4 px-4 rounded-xl font-bold text-base transition-all shadow-lg mt-6 ${
              loading 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-100 text-black'
            }`}
            style={{
              boxShadow: loading ? 'none' : '0 0 15px rgba(255, 255, 255, 0.7)'
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-300">Logging in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-6 border-t text-center text-sm border-gray-800 text-gray-400">
          <p>
            Need help? Contact{' '}
            <a href="#" className="text-white hover:text-gray-200 font-semibold transition-colors">
              support
            </a>
          </p>
        </div>
      </div>
      
      {/* Bottom Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mt-6 text-sm text-gray-500"
      >
        🔒 Secure login powered by Supabase
      </motion.p>
    </motion.div>
      </div>
      
      {/* Decorative Elements for Light Mode */}
      {!isDarkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full bg-[#2DD4BF]/5"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(100px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Dashboard Layout with Expanded Sidebar
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/admin');
        return;
      }
      setUser(data.user);
    };
    
    checkUser();
  }, [navigate]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };
  
  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications([...notifications, { id, message, type }]);
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const menuItems = [
    { icon: FaTachometerAlt, label: 'Dashboard', path: '/admin/dashboard', badge: null },
    { icon: FaUser, label: 'Profile', path: '/admin/profile', badge: null },
    { icon: FaCode, label: 'Skills', path: '/admin/skills', badge: null },
    { icon: FaFolder, label: 'Projects', path: '/admin/projects', badge: null },
    { icon: FaBriefcase, label: 'Experience', path: '/admin/experience', badge: null },
    { icon: FaEnvelope, label: 'Messages', path: '/admin/messages', badge: '3' },
    { icon: FaBook, label: 'Resume', path: '/admin/resume', badge: null },
    { icon: FaCog, label: 'Settings', path: '/admin/settings', badge: null },
  ];
  
  if (!user) return null;
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0B1528] via-[#0D1A2D] to-[#0B1528] text-white">
      {/* Expanded sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-[#0E1A2E] to-[#0A1324] border-r border-[#1C2636]/50 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Logo/Brand at top */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#1C2636]/50">
           <motion.div 
    className="flex items-center space-x-3"
    animate={{ opacity: isCollapsed ? 0 : 1 }}
    transition={{ duration: 0.2 }}
  >
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-500/30">
      <FaUser size={18} className="text-white" />
    </div>
    {!isCollapsed && (
      <div>
        <h2 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Portfolio</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>
    )}
  </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-[#16213E]/50 hover:bg-[#16213E] text-gray-400 hover:text-white transition-all"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaBars size={14} />
            </motion.div>
          </motion.button>
        </div>
        
        {/* Menu items */}
        <div className="flex-1 py-6 px-3 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block"
                >
                  <motion.div
                    whileHover={{ x: isCollapsed ? 0 : 4 }}
                    className={`relative flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 text-[#3B82F6] shadow-lg shadow-blue-500/10' 
                        : 'text-gray-400 hover:text-white hover:bg-[#16213E]/30'
                    }`}
                  >
                    {isActive && !isCollapsed && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-[#2563EB] rounded-r-full shadow-lg shadow-blue-500/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {isActive && isCollapsed && (
                      <motion.div 
                        layoutId="activeTabCollapsed"
                        className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/30 to-[#3B82F6]/10 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className={`relative ${isCollapsed ? 'w-full flex justify-center' : ''}`}>
                      <item.icon size={20} className={isActive ? 'text-[#3B82F6]' : ''} />
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <span className="ml-4 font-medium flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-[#3B82F6] text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    
                    {isCollapsed && item.badge && (
  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#3B82F6] rounded-full text-xs flex items-center justify-center font-semibold text-white">
    {item.badge}
  </span>
)}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User profile & logout at bottom */}
        <div className="p-4 border-t border-[#1C2636]/50 bg-[#0A1324]/50">
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-semibold shadow-lg">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.email?.split('@')[0] || 'Admin'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-semibold shadow-lg">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-start px-4'} py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all border border-red-500/20`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <FaSignOutAlt size={16} />
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </motion.button>
        </div>
      </motion.div>
      
      {/* Main content with dynamic margin */}
      <motion.div 
        animate={{ marginLeft: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <header className="h-20 flex items-center justify-between px-8 bg-[#101C33]/50 backdrop-blur-xl border-b border-[#1C2636]/50">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {menuItems.find(item => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))?.label || 'Dashboard'}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Welcome back to your dashboard</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-[#16213E] text-gray-300 hover:text-white transition-all hover:shadow-lg"
              onClick={() => addNotification('New notification received!', 'info')}
              title="Notifications"
            >
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-semibold">
                3
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-[#16213E] text-gray-300 hover:text-white transition-all hover:shadow-lg"
            >
              <FaSun size={18} />
            </motion.button>
            
            <Link
              to="/admin/profile"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-pink-500 font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
              title="Profile"
            >
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </Link>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </motion.div>
      
      {/* Notifications */}
      <div className="fixed top-24 right-8 z-50 space-y-3">
        <AnimatePresence>
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onDismiss={() => removeNotification(notification.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
// Dashboard Components
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    messages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [
          { count: projectCount }, 
          { count: skillCount }, 
          { count: experienceCount },
          { count: messageCount }
        ] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('skills').select('*', { count: 'exact', head: true }),
          supabase.from('experiences').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true })
        ]);
        
        setStats({
          projects: projectCount || 0,
          skills: skillCount || 0,
          experience: experienceCount || 0,
          messages: messageCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const StatCard = ({ title, count, icon: Icon, color, delay }: { 
    title: string; 
    count: number; 
    icon: any;
    color: string;
    delay: number;
  }) => (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-dark-card p-6 rounded-2xl border border-dark-lightest relative overflow-hidden backdrop-blur-sm`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`}></div>
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="text-gray-300 font-medium">{title}</h3>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`${color.split(' ')[0].replace('from-', 'bg-')}/20 p-3 rounded-xl`}
        >
          <Icon size={26} className={`${color.split(' ')[0].replace('from-', 'text-')}`} />
        </motion.div>
      </div>
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-12 h-8 bg-dark-lightest/50 rounded-md animate-pulse"></div>
        </div>
      ) : (
        <motion.p 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className="text-3xl font-bold text-white"
        >
          {count}
        </motion.p>
      )}
      
      <div className="absolute bottom-0 right-0 w-full h-1">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: delay + 0.5 }}
          className={`h-full ${color.split(' ')[0].replace('from-', 'bg-')}/30`}
        ></motion.div>
      </div>
    </motion.div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Welcome Back!</h2>
          <p className="text-gray-400">Here's an overview of your portfolio content.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 md:mt-0"
        >
          <Link
            to="/admin/profile"
            className="bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white px-5 py-3 rounded-xl transition-all duration-300 inline-flex items-center shadow-lg shadow-secondary/20 hover:shadow-secondary/40 font-medium"
          >
            <FaUser className="mr-2" />
            Update Profile
          </Link>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Projects" 
          count={stats.projects} 
          icon={FaFolder} 
          color="from-blue-500 to-blue-700" 
          delay={0.1} 
        />
        <StatCard 
          title="Skills" 
          count={stats.skills} 
          icon={FaCode} 
          color="from-green-500 to-green-700" 
          delay={0.2} 
        />
        <StatCard 
          title="Experience" 
          count={stats.experience} 
          icon={FaBriefcase} 
          color="from-purple-500 to-purple-700" 
          delay={0.3} 
        />
        <StatCard 
          title="Messages" 
          count={stats.messages} 
          icon={FaEnvelope} 
          color="from-amber-500 to-amber-700" 
          delay={0.4} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-dark-card p-7 rounded-2xl border border-dark-lightest shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/70 to-secondary/10"></div>
          <h3 className="text-xl font-bold mb-5 flex items-center">
            <FaEnvelope className="mr-3 text-secondary" />
            Recent Messages
          </h3>
          
          <div className="space-y-4">
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="p-4 rounded-xl bg-dark-lightest/70 animate-pulse h-20"></div>
              ))
            ) : (
              [1, 2, 3].map(index => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  key={index} 
                  className="p-4 rounded-xl bg-dark-lightest/70 border border-dark-lightest hover:border-secondary/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-medium mr-3 shadow-md group-hover:shadow-purple-500/20 transition-all duration-300">
                        V{index}
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-white transition-colors duration-300">Visitor {index}</h4>
                        <p className="text-sm text-gray-400">visitor{index}@example.com</p>
                      </div>
                    </div>
                    <span className="text-xs bg-dark-card px-2 py-1 rounded-full text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-300">
                      {index} day{index > 1 ? 's' : ''} ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2 ml-11">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                  </p>
                </motion.div>
              ))
            )}
          </div>
          
          <div className="mt-5 text-center">
            <Link
              to="/admin/messages"
              className="text-secondary hover:text-white group inline-flex items-center px-4 py-2 rounded-lg hover:bg-secondary/10 transition-all duration-300"
            >
              <span>View all messages</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:ml-3 transition-all" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.span>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-dark-card p-7 rounded-2xl border border-dark-lightest shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/70 to-blue-500/10"></div>
          <h3 className="text-xl font-bold mb-5 flex items-center">
            <FaPlus className="mr-3 text-blue-500" />
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: FaFolder, title: "Add New Project", description: "Showcase your work", color: "from-blue-500 to-blue-700", path: "/admin/projects/new", delay: 0.1 },
              { icon: FaCode, title: "Add New Skill", description: "Update your expertise", color: "from-green-500 to-green-700", path: "/admin/skills/new", delay: 0.2 },
              { icon: FaBriefcase, title: "Add New Experience", description: "Update your work history", color: "from-purple-500 to-purple-700", path: "/admin/experience/new", delay: 0.3 },
              { icon: FaHome, title: "View Portfolio", description: "See the live site", color: "from-amber-500 to-amber-700", path: "/", external: true, delay: 0.4 }
            ].map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + item.delay }}
                key={index}
                onClick={item.external ? undefined : () => navigate(item.path)}
                className={`group p-5 rounded-xl border border-dark-lightest hover:border-opacity-0 transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
                  item.external ? "" : "cursor-pointer"
                }`}
              >
                {item.external ? (
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-center h-full"
                  >
                    <div className={`p-3 rounded-xl mb-3 transition-all duration-300 group-hover:scale-110 bg-${item.color.split(' ')[0].replace('from-', '')}/20`}>
                      <item.icon className={`text-2xl text-${item.color.split(' ')[0].replace('from-', '')}`} />
                    </div>
                    <span className="font-medium group-hover:text-white transition-colors duration-300">{item.title}</span>
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  </a>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div className={`p-3 rounded-xl mb-3 transition-all duration-300 group-hover:scale-110 bg-${item.color.split(' ')[0].replace('from-', '')}/20`}>
                      <item.icon className={`text-2xl text-${item.color.split(' ')[0].replace('from-', '')}`} />
                    </div>
                    <span className="font-medium group-hover:text-white transition-colors duration-300">{item.title}</span>
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  </div>
                  
                )}
                
                <motion.div 
                  className={`absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Settings Component




// Authentication Guard
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/admin');
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-white">
        <div className="animate-spin h-12 w-12 border-4 border-secondary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : null;
};

// Main Admin Component
const AdminPanel: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <AuthGuard>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/projects" element={
        <AuthGuard>
          <DashboardLayout>
            <ProjectsManagement/>
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/projects/new" element={
        <AuthGuard>
          <DashboardLayout>
            <ProjectForm projectId={null} onClose={() => window.history.back()} />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/projects/edit/:id" element={
        <AuthGuard>
          <DashboardLayout>
            <ProjectForm projectId={window.location.pathname.split('/').pop() || null} onClose={() => window.history.back()} />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/skills" element={
        <AuthGuard>
          <DashboardLayout>
            <SkillsManagement />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/skills/new" element={
        <AuthGuard>
          <DashboardLayout>
            <SkillForm skillId={null} onClose={() => window.history.back()} />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/skills/edit/:id" element={
        <AuthGuard>
          <DashboardLayout>
            <SkillForm skillId={window.location.pathname.split('/').pop() || null} onClose={() => window.history.back()} />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/experience" element={
        <AuthGuard>
          <DashboardLayout>
            <ExperienceManagement />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/experience/new" element={
        <AuthGuard>
          <DashboardLayout>
            <ExperienceForm />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/experience/edit/:id" element={
        <AuthGuard>
          <DashboardLayout>
            <ExperienceForm />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/messages" element={
        <AuthGuard>
          <DashboardLayout>
            <MessagesManagement/>
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/profile" element={
        <AuthGuard>
          <DashboardLayout>
            <ProfileManagement />
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/settings" element={
        <AuthGuard>
          <DashboardLayout>
            <Settings/>
          </DashboardLayout>
        </AuthGuard>
      } />
      <Route path="/resume" element={
  <AuthGuard>
    <DashboardLayout>
    <Resume/>
    </DashboardLayout>
  </AuthGuard>
} />
      <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminPanel;