import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUser, FaCode, FaBriefcase, FaFolder, 
  FaEnvelope, FaSignOutAlt, FaPlus, FaBell, 
  FaCog, FaTachometerAlt, 
  FaAngleRight, FaAngleLeft, FaBook, FaLock,
  FaPlusCircle
} from 'react-icons/fa';
import './AdminPanel.css';
import { SkillsManagement, SkillForm } from './SkillsManagement';
import { ExperienceManagement, ExperienceForm } from './ExperienceManagement';
import { ProjectsManagement, ProjectForm } from './ProjectsManagement';
import ProfileManagement from './ProfileManagement';
import MessagesManagement from './MessagesManagement';
import Resume from './Resume';
import Settings from './Settings';
import { Star } from 'lucide-react';



// Initialize Supabase client
const supabaseUrl = 'https://redekfpzbqdlhhcsnxpi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZGVrZnB6YnFkbGhoY3NueHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MzIxMjgsImV4cCI6MjA5ODQwODEyOH0._txyfFm7GE2fL9QgcgnuBJoPb2S3zu_1nixDed69kac';
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
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export function AnimatedWaveBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-30 dark:opacity-20">
      <motion.svg
        viewBox="0 0 1000 1000"
        className="w-[150%] h-[150%] min-w-[1200px]"
        preserveAspectRatio="xMidYMid slice"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d="M485.5 137.5C646.5 137.5 777.5 268.5 777.5 429.5C777.5 590.5 646.5 721.5 485.5 721.5C324.5 721.5 193.5 590.5 193.5 429.5C193.5 268.5 324.5 137.5 485.5 137.5Z"
          className="stroke-red-500/20 dark:stroke-red-500/10 transition-colors duration-500"
          strokeWidth="1.5"
          fill="none"
          animate={{
            d: [
              "M485.5 137.5C646.5 137.5 777.5 268.5 777.5 429.5C777.5 590.5 646.5 721.5 485.5 721.5C324.5 721.5 193.5 590.5 193.5 429.5C193.5 268.5 324.5 137.5 485.5 137.5Z",
              "M415.5 197.5C596.5 107.5 837.5 228.5 797.5 459.5C757.5 690.5 546.5 781.5 385.5 721.5C224.5 661.5 143.5 540.5 243.5 379.5C343.5 218.5 234.5 287.5 415.5 197.5Z",
              "M485.5 137.5C646.5 137.5 777.5 268.5 777.5 429.5C777.5 590.5 646.5 721.5 485.5 721.5C324.5 721.5 193.5 590.5 193.5 429.5C193.5 268.5 324.5 137.5 485.5 137.5Z"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M515.5 217.5C636.5 217.5 737.5 318.5 737.5 439.5C737.5 560.5 636.5 661.5 515.5 661.5C394.5 661.5 293.5 560.5 293.5 439.5C293.5 318.5 394.5 217.5 515.5 217.5Z"
          className="stroke-red-500/20 dark:stroke-red-500/10 transition-colors duration-500"
          strokeWidth="1.5"
          fill="none"
          animate={{
            d: [
              "M515.5 217.5C636.5 217.5 737.5 318.5 737.5 439.5C737.5 560.5 636.5 661.5 515.5 661.5C394.5 661.5 293.5 560.5 293.5 439.5C293.5 318.5 394.5 217.5 515.5 217.5Z",
              "M455.5 277.5C606.5 207.5 767.5 278.5 757.5 429.5C747.5 580.5 586.5 691.5 455.5 641.5C324.5 591.5 273.5 490.5 333.5 359.5C393.5 228.5 304.5 347.5 455.5 277.5Z",
              "M515.5 217.5C636.5 217.5 737.5 318.5 737.5 439.5C737.5 560.5 636.5 661.5 515.5 661.5C394.5 661.5 293.5 560.5 293.5 439.5C293.5 318.5 394.5 217.5 515.5 217.5Z"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.svg>
    </div>
  );
}

type Review = {
  id?: string;
  name: string;
  role?: string;
  text: string;
  rating: number;
  avatar_url?: string;
};

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Senthil Kumar",
    role: "Tech Lead at AuraTech",
    text: "Thamem's frontend skills are absolute wizardry. He designed our entire real-time speech analytics dashboard with flawless performance.",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
  },
  {
    id: "2",
    name: "Priyanka R.",
    role: "Product Manager",
    text: "Extremely detail-oriented. Thamem translated our complex Figma designs into clean, responsive React code ahead of schedule.",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Anand Jay",
    role: "AI Research Engineer",
    text: "The integration of our Tamil Speech recognition models with Thamem's client-side Audio API was seamless and sub-100ms. Stellar work!",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80"
  },
  {
    id: "4",
    name: "Karthik Raja",
    role: "Open Source Contributor",
    text: "Thamem builds with clean code and amazing styling. His projects are highly educational and standard-setting in responsiveness.",
    rating: 5,
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80"
  }
];

const TestimonialCard = ({ review }: { review: Review }) => {
  const avatarText = review.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  return (
    <motion.div 
      className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/50 shadow-sm dark:shadow-none rounded-2xl p-5 mb-5 break-inside-avoid relative z-10 cursor-pointer backdrop-blur-sm transition-colors duration-500"
      whileHover={{ 
        scale: 1.03, 
        y: -5, 
        boxShadow: "0 20px 40px -12px rgba(239, 68, 68, 0.15)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn("w-3.5 h-3.5", i < review.rating ? 'fill-red-500 text-red-500' : 'fill-neutral-300 dark:fill-neutral-800 text-neutral-300 dark:text-neutral-800')} 
          />
        ))}
      </div>
      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
      <div className="flex items-center gap-3">
        {review.avatar_url ? (
          <img src={review.avatar_url} alt={review.name} className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-700" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 font-bold text-xs border border-neutral-200 dark:border-neutral-700">
            {avatarText}
          </div>
        )}
        <div>
          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{review.name}</div>
          <div className="text-[10px] text-neutral-500">{review.role || 'Partner'}</div>
        </div>
      </div>
    </motion.div>
  );
};

export function ScrollingTestimonials() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="flex gap-1.5 h-6 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-red-500 rounded-full h-full"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    );
  }

  const displayReviews = [...MOCK_REVIEWS, ...MOCK_REVIEWS];
  const col1 = displayReviews.slice(0, 4);
  const col2 = displayReviews.slice(4, 8);

  return (
    <div className="w-full h-full relative flex flex-col justify-center">
      <AnimatedWaveBackground />
      
      <div className="w-full flex flex-col items-center justify-center pb-6 bg-transparent relative z-30 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2 text-center max-w-2xl leading-tight">
          What My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">Peers Say</span>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm max-w-lg text-center mb-4">
          Collaboration, clean design systems, and real results.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full shadow-sm"></div>
      </div>

      <div className="flex-1 overflow-hidden relative z-10 px-4 max-h-[450px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
          <div className="flex flex-col overflow-hidden relative pt-4">
            <motion.div
              className="flex flex-col w-full"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
              {[...col1, ...col1].map((review, i) => (
                <TestimonialCard key={`col1-${i}`} review={review} />
              ))}
            </motion.div>
          </div>
          <div className="hidden sm:flex flex-col overflow-hidden relative pt-8">
            <motion.div
              className="flex flex-col w-full"
              animate={{ y: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            >
              {[...col2, ...col2].map((review, i) => (
                <TestimonialCard key={`col2-${i}`} review={review} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HighlightItem {
  id: string;
  menuName: string;
  imageUrl: string | null; 
}

const MOCK_HIGHLIGHTS: HighlightItem[] = [
  { id: '1', menuName: 'FRONTEND WIZARD', imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=500&h=300&fit=crop&q=80' },
  { id: '2', menuName: 'PORTFOLIO ADMIN', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&q=80' },
  { id: '3', menuName: 'CREATIVE DESIGN', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop&q=80' },
  { id: '4', menuName: 'REACT & TS', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop&q=80' },
  { id: '5', menuName: 'TAMIL VOICE AI', imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&h=300&fit=crop&q=80' },
];

const SmartMarqueeItem = ({ item }: { item: HighlightItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [popConfig, setPopConfig] = useState({ x: 0, y: 0, rotate: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const { clientX, clientY } = e;
    const distX = Math.abs(clientX - centerX);
    const distY = Math.abs(clientY - centerY);

    let newX = 0;
    let newY = 0;
    let newRotate = 0;

    if (distY > distX) {
      if (clientY < centerY) {
        newY = -120;
        newRotate = clientX < centerX ? -8 : 8;
      } else {
        newY = 120;
        newRotate = clientX < centerX ? 8 : -8;
      }
    } else {
      if (clientX < centerX) {
        newX = 140;
        newRotate = 12;
      } else {
        newX = -140;
        newRotate = -12;
      }
    }

    setPopConfig({ x: newX, y: newY, rotate: newRotate });
  };

  return (
    <div 
      className="relative flex items-center gap-16 shrink-0 font-sans cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className={cn(
          "text-4xl md:text-6xl font-black tracking-tighter uppercase transition-colors duration-300",
          isHovered ? "text-red-500" : "text-zinc-800/20 dark:text-zinc-800/10"
        )}
      >
        {item.menuName}
      </span>

      {item.imageUrl && (
        <motion.div 
          className="absolute z-[100] left-1/2 top-1/2 -ml-14 -mt-18 md:-ml-20 md:-mt-26 w-28 h-36 md:w-36 md:h-48 pointer-events-none shadow-2xl rounded-xl bg-white overflow-hidden origin-center"
          initial={{ scale: 0, opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={isHovered ? { 
            scale: 1, 
            opacity: 1, 
            x: popConfig.x, 
            y: popConfig.y, 
            rotate: popConfig.rotate 
          } : { 
            scale: 0, 
            opacity: 0, 
            x: 0, 
            y: 0, 
            rotate: 0 
          }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
        >
          <img src={item.imageUrl} alt={item.menuName} className="w-full h-full object-cover" />
        </motion.div>
      )}
    </div>
  );
};

export const LoginMarquee: React.FC = () => {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);

  useEffect(() => {
    setHighlights(MOCK_HIGHLIGHTS);
  }, []);

  if (highlights.length === 0) return <div className="absolute inset-0 bg-zinc-950" />;

  const TOTAL_ROWS = 8;
  const horizontalLoop = Array(5).fill(null); 

  return (
    <div className="absolute inset-0 bg-zinc-950 flex flex-col justify-center overflow-hidden py-2 gap-4 select-none z-0">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />

      {Array.from({ length: TOTAL_ROWS }).map((_, rowIndex) => {
        const item = highlights[rowIndex % highlights.length];
        const isEven = rowIndex % 2 === 0;

        return (
          <div key={`${item.id}-${rowIndex}`} className="w-full flex items-center py-1">
              <motion.div
              className="flex items-center whitespace-nowrap gap-16 w-max"
              animate={{ x: isEven ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {[...horizontalLoop, ...horizontalLoop].map((_, idx) => (
                <SmartMarqueeItem key={idx} item={item} />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
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
    <div className="w-full h-screen overflow-hidden flex flex-col lg:flex-row bg-zinc-950 font-sans">
      
      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-4 bg-transparent z-10 shadow-2xl">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <LoginMarquee />
        </div>
        
        <div className="relative z-50 w-full max-w-md p-6 md:p-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 isolate">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-red-500/10 border-2 border-red-500/30"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0],
                boxShadow: ['0 0 0 rgba(239,68,68,0.3)', '0 0 20px rgba(239,68,68,0.6)', '0 0 0 rgba(239,68,68,0.3)']
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <FaUser className="text-red-500 text-2xl" />
            </motion.div>
            
            <h2 className="text-2xl font-black mb-1 text-zinc-900 dark:text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Welcome Back
            </h2>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Sign in to access your portfolio dashboard
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-xl border bg-red-500/10 text-red-400 border-red-500/20 text-xs flex items-center"
            >
              <svg className="w-4 h-4 mr-2 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold text-xs leading-none">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FaEnvelope className="text-zinc-400 text-sm" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FaLock className="text-zinc-400 text-sm" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`w-full py-3 px-4 rounded-xl font-black text-sm transition-all shadow-md mt-4 text-white ${
                loading 
                  ? 'bg-zinc-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-red-500/10'
              }`}
              style={{
                fontFamily: 'Nunito, sans-serif'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying credentials...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-5 border-t text-center text-xs border-zinc-200 dark:border-zinc-800 text-zinc-500">
            <p>🔒 Secure login powered by Supabase</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-full overflow-hidden p-8 lg:p-12 bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-500 relative border-l border-zinc-200/50 dark:border-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent z-0 pointer-events-none" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          <ScrollingTestimonials />
        </div>
      </div>

    </div>
  );
};

// Dashboard Layout with Premium Glassmorphism Sidebar
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  
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

  const pageTitle = menuItems.find(item => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))?.label || 'Dashboard';
  const greeting = currentTime.getHours() < 12 ? 'Good Morning' : currentTime.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';
  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="flex h-screen admin-layout" style={{ background: 'linear-gradient(135deg, #F8F9FF 0%, #F0F2FF 50%, #FFF0F0 100%)' }}>
      {/* ─── PREMIUM SIDEBAR ─────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 72 : 268 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-y-0 left-0 z-40 overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #1A1A1A 100%)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.4)'
        }}
      >
        {/* Sidebar decorative blob */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #EF4444, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #EF4444, transparent)', transform: 'translate(-30%, 30%)' }} />

        {/* Brand */}
        <div className={`relative h-[72px] flex items-center border-b border-white/10 ${isCollapsed ? 'justify-center px-3' : 'px-5 justify-between'}`}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}>
                <FaTachometerAlt size={15} className="text-white" />
              </div>
              <div>
                <p className="font-black text-white text-sm tracking-wide">PORTFOLIO</p>
                <p className="text-white/40 text-[10px] tracking-widest">ADMIN PANEL</p>
              </div>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}>
              <FaTachometerAlt size={15} className="text-white" />
            </div>
          )}
          {!isCollapsed && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsCollapsed(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <FaAngleLeft size={14} />
            </motion.button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <div className="flex justify-center py-2 border-b border-white/10">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsCollapsed(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <FaAngleRight size={14} />
            </motion.button>
          </div>
        )}

        {/* Nav items */}
        <div className="flex-1 py-5 px-2.5 overflow-y-auto space-y-1 scrollbar-hide">
          {!isCollapsed && (
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Navigation</p>
          )}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <Link key={item.path} to={item.path} className="block">
                <motion.div
                  whileHover={{ x: isCollapsed ? 0 : 3 }}
                  className={`relative flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-xl transition-all duration-200 group`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(239,68,68,0.08) 100%)',
                    boxShadow: 'inset 0 0 0 1px rgba(239,68,68,0.3)'
                  } : {}}
                >
                  {isActive && !isCollapsed && (
                    <motion.div layoutId="sidebarActive"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 rounded-r-full"
                      style={{ background: 'linear-gradient(180deg, #EF4444, #DC2626)', boxShadow: '0 0 8px rgba(239,68,68,0.6)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${ isActive ? 'text-red-400' : 'text-white/50 group-hover:text-white/80' }`}>
                    <item.icon size={18} />
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className={`ml-3 text-sm font-semibold flex-1 ${ isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90' }`}>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">{item.badge}</span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">{item.badge}</span>
                  )}
                  {/* Tooltip for collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* User footer */}
        <div className={`p-3 border-t border-white/10 ${isCollapsed ? 'flex flex-col items-center gap-2' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center px-3 py-2.5 rounded-xl mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 12px rgba(239,68,68,0.35)' }}>
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">{user?.email?.split('@')[0] || 'Admin'}</p>
                <p className="text-white/40 text-[10px] truncate">{user?.email}</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 12px rgba(239,68,68,0.35)' }}>
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center py-2' : 'px-3 py-2'} rounded-xl text-red-400 hover:text-red-300 transition-all group`}
            style={{ background: 'rgba(239,68,68,0.08)' }}
            title="Logout"
          >
            <FaSignOutAlt size={14} />
            {!isCollapsed && <span className="ml-2.5 text-xs font-semibold">Sign Out</span>}
          </motion.button>
        </div>
      </motion.div>

      {/* ─── MAIN CONTENT ────────────────────────────────────── */}
      <motion.div
        animate={{ marginLeft: isCollapsed ? 72 : 268 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Premium Header */}
        <header className="relative h-[72px] flex items-center justify-between px-8 border-b flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{pageTitle}</h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full text-red-600" style={{ background: 'rgba(239,68,68,0.1)' }}>LIVE</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{greeting}, {user?.email?.split('@')[0] || 'Admin'} · {dateStr}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Time display */}
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-gray-700">{timeStr}</span>
              <span className="text-[10px] text-gray-400">Local Time</span>
            </div>

            {/* Search */}
            <motion.div whileHover={{ scale: 1.02 }}
              className="hidden md:flex items-center px-3 py-2 rounded-xl text-gray-400 text-sm cursor-pointer"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">Search...</span>
            </motion.div>

            {/* Notifications */}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}
              onClick={() => addNotification('All systems operational!', 'info')}
            >
              <FaBell size={15} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">3</span>
            </motion.button>

            {/* View site */}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}
                title="View live site"
              >
                <FaHome size={15} />
              </motion.button>
            </a>

            {/* Avatar */}
            <Link to="/admin/profile">
              <motion.div whileHover={{ scale: 1.05 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}
              >
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </motion.div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto" style={{ padding: '28px 32px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      {/* Notifications */}
      <div className="fixed top-24 right-8 z-50 space-y-3">
        <AnimatePresence>
          {notifications.map(notification => (
            <Notification key={notification.id} message={notification.message} type={notification.type} onDismiss={() => removeNotification(notification.id)} />
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
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      const dummyProjects = [
        {
          title: "AuraCast - Tamil Voice AI Assistant",
          description: "A cutting-edge conversational voice AI developed specifically for Tamil language nuances.",
          long_description: "AuraCast is a state-of-the-art voice assistant built using React, Python, and custom transformer models. It handles Tamil dialect variations, offering sub-100ms response times for home automation and transcription tasks. Implemented full client-side Web Audio API streaming and WebSocket back-pressure management.",
          technologies: ["React", "Python", "Web Audio API", "WebSockets", "FastAPI"],
          live_url: "https://auracast-demo.thamem.dev",
          github_url: "https://github.com/ThamemAnsu/auracast-tamil-voice-ai",
          featured: true,
          order_index: 0
        },
        {
          title: "SynthFlow - Interactive Audio Node Canvas",
          description: "Visual node graph editor for real-time web audio synthesis and patching.",
          long_description: "SynthFlow is a visual patch-cable editor for generating complex synthesizer sounds in the browser. Features real-time visualizer, custom Web Audio oscillator nodes, and exportable sound configurations. Built using React Flow and Web Audio API.",
          technologies: ["React", "TypeScript", "Web Audio API", "React Flow", "TailwindCSS"],
          live_url: "https://synthflow.thamem.dev",
          github_url: "https://github.com/ThamemAnsu/synthflow-patch-editor",
          featured: true,
          order_index: 1
        }
      ];

      const dummyExperiences = [
        {
          company: "AuraTech Solutions",
          role: "Frontend Developer",
          location: "Chennai, India",
          start_date: "2024-01-01",
          end_date: null,
          current: true,
          description: [
            "Spearheaded the development of custom React voice widgets, improving loading times by 40%.",
            "Integrated complex real-time WebSockets connections for streaming audio processing.",
            "Designed modern, glassmorphic UI components aligning with a strict white/red design system."
          ],
          technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Supabase"],
          company_url: "https://auratech.solutions",
          order_index: 0
        },
        {
          company: "CodeCraft Studios",
          role: "Junior Developer Intern",
          location: "Chennai, India",
          start_date: "2023-06-01",
          end_date: "2023-12-31",
          current: false,
          description: [
            "Maintained and updated customer-facing dashboard panels using React and Sass.",
            "Wrote comprehensive unit tests using Jest and React Testing Library, boosting coverage to 85%.",
            "Collaborated with UI/UX designers to translate Figma frames into responsive web layouts."
          ],
          technologies: ["JavaScript", "React", "Sass", "Jest", "Git"],
          company_url: "https://codecraft.co",
          order_index: 1
        }
      ];

      const dummyCertifications = [
        {
          title: "Advanced React & State Management Patterns",
          issuer: "Frontend Masters",
          date: "2024-03-01",
          credential_url: "https://frontendmasters.com/certificates/react-patterns",
          credential_id: "FM-REACT-99812",
          skills: ["React", "State Management", "Performance Optimization"],
          is_featured: true,
          display_order: 0
        },
        {
          title: "Full-Stack Development with Supabase & Serverless",
          issuer: "Supabase Academy",
          date: "2023-09-01",
          credential_url: "https://supabase.com/certificates/fullstack-serverless",
          credential_id: "SUPA-FS-38291",
          skills: ["Supabase", "PostgreSQL", "Database Design", "Auth"],
          is_featured: true,
          display_order: 1
        }
      ];

      const { error: pErr } = await supabase.from('projects').insert(dummyProjects);
      if (pErr) throw pErr;

      const { error: eErr } = await supabase.from('experiences').insert(dummyExperiences);
      if (eErr) throw eErr;

      const { error: cErr } = await supabase.from('certifications').insert(dummyCertifications);
      if (cErr) throw cErr;

      setSeedSuccess("Dummy projects, experiences, and certifications seeded successfully!");
      
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

      setTimeout(() => setSeedSuccess(null), 5000);
    } catch (err: any) {
      console.error("Seeding error:", err);
      alert("Failed to seed data: " + (err.message || err));
    } finally {
      setSeeding(false);
    }
  };
  
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
  
  const StatCard = ({ title, count, icon: Icon, color, bg, delay, link }: { 
    title: string; 
    count: number; 
    icon: any;
    color: string;
    bg: string;
    delay: number;
    link: string;
  }) => (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
      onClick={() => navigate(link)}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color})` }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            {isLoading ? (
              <div className="w-16 h-8 bg-gray-100 rounded-lg animate-pulse" />
            ) : (
              <motion.p
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: delay + 0.2, type: 'spring' }}
                className="text-4xl font-black text-gray-900"
              >
                {count.toString().padStart(2, '0')}
              </motion.p>
            )}
          </div>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: bg }}
          >
            <Icon size={22} className="text-white" />
          </motion.div>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.05)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((count / 20) * 100, 100)}%` }}
            transition={{ duration: 1.2, delay: delay + 0.4, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color})` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Click to manage →</p>
      </div>
      {/* Decorative corner blob */}
      <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color.split(',')[0].replace('linear-gradient(90deg, ', '')}, transparent)`, transform: 'translate(40%, 40%)' }} />
    </motion.div>
  );
  
  return (
    <div>
      {seedSuccess && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-6 text-sm font-semibold text-green-700"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.06))', border: '1px solid rgba(16,185,129,0.3)' }}>
          <span className="text-lg">🎉</span> {seedSuccess}
        </motion.div>
      )}

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-8 mb-7 text-white"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1A1A1A 40%, #222222 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #EF4444, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #60A5FA, transparent)', transform: 'translate(-50%, 50%)' }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Dashboard Overview</p>
            <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>Welcome Back! 👋</h2>
            <p className="text-white/60 text-sm">Here's what's happening with your portfolio today.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={handleSeedData} disabled={seeding}
              className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
            >
              <FaPlusCircle className="mr-2 text-red-400" />
              {seeding ? 'Seeding...' : 'Seed Test Data'}
            </motion.button>
            <Link to="/admin/profile">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}
              >
                <FaUser className="mr-2" />
                Update Profile
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        <StatCard title="Projects" count={stats.projects} icon={FaFolder}
          color="#EF4444, #DC2626" bg="linear-gradient(135deg, #EF4444, #B91C1C)" delay={0.1} link="/admin/projects" />
        <StatCard title="Skills" count={stats.skills} icon={FaCode}
          color="#10B981, #059669" bg="linear-gradient(135deg, #10B981, #047857)" delay={0.2} link="/admin/skills" />
        <StatCard title="Experience" count={stats.experience} icon={FaBriefcase}
          color="#8B5CF6, #6D28D9" bg="linear-gradient(135deg, #8B5CF6, #5B21B6)" delay={0.3} link="/admin/experience" />
        <StatCard title="Messages" count={stats.messages} icon={FaEnvelope}
          color="#F59E0B, #D97706" bg="linear-gradient(135deg, #F59E0B, #B45309)" delay={0.4} link="/admin/messages" />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages - span 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>
                <FaEnvelope size={13} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Recent Messages</h3>
            </div>
            <Link to="/admin/messages">
              <motion.span whileHover={{ x: 3 }}
                className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer">
                View All <FaAngleRight size={10} />
              </motion.span>
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(0,0,0,0.04)' }} />)
            ) : (
              [{ name: 'Alex Johnson', email: 'alex@example.com', msg: 'I love your portfolio! Would love to collaborate on a project.', time: '2h', unread: true },
               { name: 'Sarah Chen', email: 'sarah@example.com', msg: 'Great work on the AI voice assistant. Very impressive!', time: '1d', unread: true },
               { name: 'Mike Torres', email: 'mike@example.com', msg: 'Hi, I saw your portfolio and I am impressed with your skills.', time: '3d', unread: false }
              ].map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="flex items-start gap-3 p-3 rounded-xl group cursor-pointer transition-all"
                  style={{ background: 'rgba(0,0,0,0.02)' }}
                  whileHover={{ background: 'rgba(239,68,68,0.04)' }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 55%), hsl(${i * 60 + 30}, 70%, 45%))` }}>
                    {msg.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-800">{msg.name} {msg.unread && <span className="ml-1 inline-block w-1.5 h-1.5 bg-red-500 rounded-full" />}</p>
                      <span className="text-[10px] text-gray-400">{msg.time} ago</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{msg.msg}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions - span 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center space-x-2 px-6 py-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>
              <FaPlus size={13} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-2.5">
            {[
              { icon: FaFolder, label: 'New Project', sub: 'Add to portfolio', path: '/admin/projects/new', grad: 'linear-gradient(135deg, #EF4444, #B91C1C)' },
              { icon: FaCode, label: 'New Skill', sub: 'Update expertise', path: '/admin/skills/new', grad: 'linear-gradient(135deg, #10B981, #047857)' },
              { icon: FaBriefcase, label: 'New Experience', sub: 'Work history', path: '/admin/experience/new', grad: 'linear-gradient(135deg, #8B5CF6, #5B21B6)' },
              { icon: FaHome, label: 'View Portfolio', sub: 'Live preview', path: '/', external: true, grad: 'linear-gradient(135deg, #F59E0B, #B45309)' },
            ].map((action, i) => (
              <motion.div key={i} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}
                onClick={() => !action.external ? navigate(action.path) : window.open(action.path, '_blank')}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all"
                style={{ background: 'rgba(0,0,0,0.02)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md" style={{ background: action.grad }}>
                  <action.icon size={14} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors">{action.label}</p>
                  <p className="text-[10px] text-gray-400">{action.sub}</p>
                </div>
                <FaAngleRight size={12} className="ml-auto text-gray-300 group-hover:text-red-400 transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
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