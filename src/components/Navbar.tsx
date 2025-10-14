import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' }
] as const;

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  
  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use scrollIntoView for more accurate positioning
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setActiveSection(sectionId);
    }
  };
  
  // Track active section with IntersectionObserver
  useEffect(() => {
    // Wait for sections to load
    const setupObserver = () => {
      const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (scrollTimeout.current) {
              clearTimeout(scrollTimeout.current);
            }
            
            scrollTimeout.current = setTimeout(() => {
              setActiveSection(entry.target.id);
            }, 50);
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
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      };
    };

    // Delay to ensure sections are mounted
    const timer = setTimeout(setupObserver, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-end gap-6">
        {NAV_LINKS.map((link, index) => {
          const isActive = activeSection === link.to;
          const isHovered = hoveredSection === link.to;
          
          return (
            <motion.button
              key={link.to}
              onClick={() => scrollToSection(link.to)}
              onMouseEnter={() => setHoveredSection(link.to)}
              onMouseLeave={() => setHoveredSection(null)}
              className="group relative flex items-center gap-4 cursor-pointer bg-transparent border-none p-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: -8 }}
            >
              {/* Label */}
              <motion.span 
                className={`text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? 'text-[#2DD4BF]' 
                    : 'text-[#94A3B8] group-hover:text-white'
                }`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: isHovered || isActive ? 1 : 0,
                  x: isHovered || isActive ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.span>

              {/* Line Indicator */}
              <div className="relative flex items-center">
                {/* Glow effect for active */}
                {isActive && (
                  <motion.div
                    className="absolute right-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      width: 60,
                      height: 4,
                      background: 'radial-gradient(circle, rgba(45,212,191,0.6) 0%, transparent 70%)',
                      filter: 'blur(8px)',
                    }}
                  />
                )}

                {/* Main line */}
                <motion.div
                  className={`rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#2DD4BF]' : 'bg-[#374151] group-hover:bg-[#94A3B8]'
                  }`}
                  animate={{
                    width: isActive ? 60 : isHovered ? 40 : 24,
                    height: isActive ? 4 : 2,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />

                {/* Animated dot at the end of active line */}
                {isActive && (
                  <motion.div
                    className="absolute right-0 w-2 h-2 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Index number (optional) */}
              <motion.span 
                className="absolute -right-8 text-xs font-mono text-[#374151]"
                animate={{ 
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1.2 : 1
                }}
              >
                0{index + 1}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      {/* Vertical connecting line */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#374151] to-transparent -z-10" />
    </nav>
  );
};

export default SidebarNav;