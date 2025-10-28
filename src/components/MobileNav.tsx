import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  {name :'Certifications', to: 'certifications' },
  { name: 'Contact', to: 'contact' }
] as const;

const SpaceShuttleIcon: React.FC<{ isActive: boolean; direction: 'up' | 'down' }> = ({ isActive, direction }) => {
  const rotation = direction === 'down' ? 180 : 0;
  
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 200 200"
      initial={false}
      animate={{
        rotate: rotation,
        filter: isActive 
          ? 'drop-shadow(0 0 6px rgba(45,212,191,0.8))' 
          : 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
      }}
      transition={{ rotate: { type: 'spring', stiffness: 300, damping: 25 } }}
    >
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
  const [shuttleDirection, setShuttleDirection] = useState<'up' | 'down'>('down');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingRef.current = true;
      
      const currentIndex = NAV_LINKS.findIndex(link => link.to === activeSection);
      const targetIndex = NAV_LINKS.findIndex(link => link.to === sectionId);
      
      setShuttleDirection(targetIndex > currentIndex ? 'down' : 'up');
      setActiveSection(sectionId);
      
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      
      if (!isScrollingRef.current) {
        setShuttleDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      let maxRatio = 0;
      let mostVisibleSection = '';

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      if (mostVisibleSection && maxRatio > 0) {
        setActiveSection(mostVisibleSection);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    const timeoutId = setTimeout(() => {
      NAV_LINKS.forEach(({ to }) => {
        const element = document.getElementById(to);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const activeIndex = NAV_LINKS.findIndex(link => link.to === activeSection);
  const shuttleYPosition = activeIndex >= 0 ? activeIndex * 50 : 0;
  const displayProgress = Math.round(scrollProgress) || 0;

  return (
    <>
      {/* Compact Mobile Header */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-[60] backdrop-blur-xl bg-[#0F172A]/95 border-b border-[#2DD4BF]/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          <motion.div className="flex items-center gap-2" whileTap={{ scale: 0.95 }}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#8B5CF6] flex items-center justify-center">
              <Rocket className="w-4 h-4 text-[#0F172A]" />
            </div>
            <div>
              <span className="block text-white font-bold text-sm leading-none">THAMEM</span>
              <span className="block text-[#2DD4BF] text-[8px] font-mono tracking-widest">PORTFOLIO</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <svg width="32" height="32" className="transform -rotate-90">
                <circle cx="16" cy="16" r="13" stroke="rgba(45,212,191,0.1)" strokeWidth="2.5" fill="none" />
                <motion.circle
                  cx="16" cy="16" r="13" 
                  stroke="#2DD4BF" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 13}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 13 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 13 * (1 - displayProgress / 100) }}
                  transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[#2DD4BF]">
                {displayProgress}
              </span>
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1F2937] to-[#0F172A] border-2 border-[#2DD4BF]/30 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X className="w-4 h-4 text-[#2DD4BF]" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu className="w-4 h-4 text-[#2DD4BF]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Compact Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="md:hidden fixed top-[56px] left-3 right-3 z-[60] rounded-xl overflow-hidden bg-[#0F172A]/98 border-2 border-[#2DD4BF]/30 shadow-2xl"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-3">
                <div className="relative mb-3">
                  <motion.div
                    className="absolute -left-0.5 top-0 pointer-events-none z-10"
                    animate={{ y: shuttleYPosition }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <SpaceShuttleIcon isActive={true} direction={shuttleDirection} />
                  </motion.div>

                  <nav className="space-y-1.5 pl-7">
                    {NAV_LINKS.map((link, index) => {
                      const isActive = activeSection === link.to;
                      
                      return (
                        <motion.button
                          key={link.to}
                          onClick={() => scrollToSection(link.to)}
                          className="group relative w-full"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <div className={`relative px-3 py-2 rounded-lg overflow-hidden transition-all ${isActive ? '' : 'hover:translate-x-1'}`}>
                            <div className={`absolute inset-0 transition-opacity ${isActive ? 'opacity-100 bg-gradient-to-r from-[#2DD4BF]/25 to-transparent' : 'opacity-0 group-hover:opacity-100 bg-[#374151]/30'}`} />
                            <div className={`absolute inset-0 rounded-lg transition-all ${isActive ? 'border-2 border-[#2DD4BF] shadow-[0_0_15px_rgba(45,212,191,0.4)]' : 'border-2 border-transparent group-hover:border-[#2DD4BF]/30'}`} />
                            <div className="relative flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-0.5 h-4 rounded-full ${isActive ? 'bg-[#2DD4BF]' : 'bg-gray-600'}`} />
                                <span className={`text-sm font-bold ${isActive ? 'text-[#2DD4BF]' : 'text-gray-300 group-hover:text-white'}`}>
                                  {link.name}
                                </span>
                              </div>
                              {isActive && (
                                <motion.div layoutId="mobileActiveIndicator" className="flex gap-1">
                                  <div className="w-1 h-1 rounded-full bg-[#2DD4BF]" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;