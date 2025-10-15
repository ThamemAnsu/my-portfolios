import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' }
] as const;

const SpaceShuttleIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <motion.svg
      width="30"
      height="30"
      viewBox="0 0 200 200"
      initial={false}
      animate={{
        filter: isActive 
          ? 'drop-shadow(0 0 10px rgba(45,212,191,0.9)) drop-shadow(0 0 20px rgba(45,212,191,0.5))' 
          : 'drop-shadow(0 0 5px rgba(0,0,0,0.5))',
      }}
    >
      {/* Rocket Exhaust */}
      <motion.g 
        style={{ transformOrigin: '100px 30px' }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.ellipse
          cx="100" cy="30" rx="40" ry="25"
          fill="#FFD93D"
          opacity="0.5"
          animate={{ ry: [20, 30, 20], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.path
          d="M 80 30 Q 100 -20 120 30 Z"
          fill="#FF6B6B"
          animate={{ 
            d: [
              "M 80 30 Q 100 -20 120 30 Z", 
              "M 80 30 Q 100 -30 120 30 Z", 
              "M 80 30 Q 100 -20 120 30 Z"
            ]
          }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
      </motion.g>

      {/* Shuttle Body */}
      <motion.g animate={{ opacity: isActive ? 1 : 0.4 }}>
        <path d="M 120 100 L 170 130 L 130 140 L 110 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
        <path d="M 80 100 L 30 130 L 70 140 L 90 120 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
        <path d="M 100 25 C 120 25, 120 60, 120 90 L 120 150 L 80 150 L 80 90 C 80 60, 80 25, 100 25 Z" fill="url(#shuttleBody)" stroke="#6B7280" strokeWidth="2"/>
        <path d="M 80 150 C 80 155, 120 155, 120 150 L 120 145 L 80 145 Z" fill="url(#shuttleDark)" />
        <path d="M 100 150 C 115 150, 118 165, 118 175 L 82 175 C 82 165, 85 150, 100 150 Z" fill="url(#shuttleDark)" stroke="#1F2937" strokeWidth="1.5" />
        <path d="M 100 152 C 113 152, 115 163, 115 172 L 85 172 C 85 163, 87 152, 100 152 Z" fill="#2DD4BF" opacity="0.6" />
        <path d="M 100 35 L 125 70 L 100 60 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
        <path d="M 100 35 L 75 70 L 100 60 Z" fill="url(#shuttleBody)" stroke="#4B5563" strokeWidth="2" />
      </motion.g>

      <defs>
        <linearGradient id="shuttleBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="50%" stopColor="#F3F4F6" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <linearGradient id="shuttleDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    NAV_LINKS.forEach(({ to }) => {
      const element = document.getElementById(to);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#0F172A]/95 backdrop-blur-xl border-b border-[#1F2937]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] flex items-center justify-center">
              <span className="text-[#0F172A] font-bold text-lg">T</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Thamem
            </span>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg width="28" height="28" className="transform -rotate-90">
                <circle 
                  cx="14" 
                  cy="14" 
                  r="12" 
                  stroke="#1F2937" 
                  strokeWidth="2.5" 
                  fill="none" 
                  opacity="0.3" 
                />
                <motion.circle
                  cx="14" 
                  cy="14" 
                  r="12" 
                  stroke="#2DD4BF" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 12}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 12 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 12 * (1 - scrollProgress / 100) }}
                  transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                  style={{ filter: 'drop-shadow(0 0 6px rgba(45,212,191,0.8))' }}
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-[#2DD4BF]">
                {Math.round(scrollProgress) || 0}
              </span>
            </div>

            {/* Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] border-2 border-[#374151] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              whileHover={{ borderColor: '#2DD4BF' }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-[#2DD4BF]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-[#2DD4BF]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="md:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border-l border-[#1F2937] z-[60] overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] border-2 border-[#374151] hover:border-[#2DD4BF] flex items-center justify-center z-10"
                whileTap={{ scale: 0.9 }}
                whileHover={{ 
                  borderColor: '#2DD4BF',
                  boxShadow: '0 0 20px rgba(45,212,191,0.4)'
                }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-5 h-5 text-[#2DD4BF]" />
              </motion.button>

              {/* Menu Content */}
              <div className="p-6 pt-20">
                {/* Navigation Links */}
                <nav className="space-y-2">
                  {NAV_LINKS.map((link, index) => {
                    const isActive = activeSection === link.to;
                    
                    return (
                      <motion.button
                        key={link.to}
                        onClick={() => scrollToSection(link.to)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#2DD4BF]/20 to-[#14b8a6]/10 border-2 border-[#2DD4BF]'
                            : 'bg-[#1F2937]/50 border-2 border-[#374151] hover:border-[#2DD4BF]/50'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={
                          isActive
                            ? {
                                boxShadow: '0 0 30px rgba(45,212,191,0.3), inset 0 0 20px rgba(45,212,191,0.1)',
                              }
                            : {}
                        }
                      >
                        {/* Shuttle Icon */}
                        <div className="flex-shrink-0">
                          <SpaceShuttleIcon isActive={isActive} />
                        </div>

                        {/* Link Text */}
                        <span
                          className={`text-lg font-bold tracking-wide ${
                            isActive ? 'text-[#2DD4BF]' : 'text-gray-300'
                          }`}
                        >
                          {link.name}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="ml-auto w-2 h-2 rounded-full bg-[#2DD4BF]"
                            style={{
                              boxShadow: '0 0 10px rgba(45,212,191,0.8)',
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Decorative Space Elements */}
                <motion.div
                  className="mt-8 p-6 rounded-xl bg-gradient-to-br from-[#1F2937]/50 to-[#0F172A]/50 border border-[#374151]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#2DD4BF]"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          '0 0 10px rgba(45,212,191,0.6)',
                          '0 0 20px rgba(45,212,191,1)',
                          '0 0 10px rgba(45,212,191,0.6)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-mono text-[#2DD4BF] font-bold">
                      MISSION CONTROL
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Navigate through space to explore different sections of the portfolio.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;