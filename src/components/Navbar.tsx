import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' }
] as const;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  
  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
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
      setActiveSection(sectionId);
    }
  }, []);
  
  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setScrolled(window.pageYOffset > 50);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  // Track active section with optimized IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Clear any pending timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }
          
          // Debounce the state update
          scrollTimeout.current = setTimeout(() => {
            setActiveSection(entry.target.id);
          }, 100);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    NAV_LINKS.forEach(({ to }) => {
      const element = document.getElementById(to);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-[#1F2937]/95 shadow-lg border-b border-[#374151] py-3' 
          : 'bg-[#1F2937]/60 py-5'
      }`}
      style={{ 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        willChange: 'transform'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold cursor-pointer group relative bg-transparent border-none p-0"
          >
            <span className="text-[#2DD4BF]">Thamem</span>
            <span className="text-white">Ansari</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2DD4BF] transition-all duration-200 group-hover:w-full"></span>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.to}
                onClick={() => scrollToSection(link.to)}
                className={`relative px-5 py-2 text-sm font-medium cursor-pointer transition-all duration-150 rounded-lg border-none bg-transparent ${
                  activeSection === link.to
                    ? 'text-[#2DD4BF] bg-[#2DD4BF]/10'
                    : 'text-[#D1D5DB] hover:text-[#2DD4BF] hover:bg-[#374151]/50'
                }`}
                style={{ transform: 'translateZ(0)' }}
              >
                {link.name}
              </button>
            ))}
            
            <div className="pl-4 ml-4 border-l border-[#374151]">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#2DD4BF] hover:bg-[#14b8a6] text-[#111827] text-sm font-semibold rounded-lg transition-all duration-150 inline-flex items-center space-x-2 hover:shadow-lg hover:shadow-[#2DD4BF]/20"
                style={{ transform: 'translateZ(0)' }}
              >
                <FaFileAlt size={16} />
                <span>Resume</span>
                <FaExternalLinkAlt size={12} className="opacity-70" />
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden p-2.5 rounded-lg text-[#D1D5DB] hover:text-[#2DD4BF] hover:bg-[#374151]/50 focus:outline-none transition-colors duration-150 border-none bg-transparent"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden mt-4 py-2 overflow-hidden rounded-xl border border-[#374151] bg-[#1F2937] shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 py-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.to}
                    onClick={() => scrollToSection(link.to)}
                    className={`w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-150 border-none bg-transparent ${
                      activeSection === link.to
                        ? 'text-[#2DD4BF] bg-[#2DD4BF]/10 border-l-2 border-[#2DD4BF]'
                        : 'text-[#D1D5DB] hover:bg-[#374151]/50 hover:text-[#2DD4BF]'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                
                <div className="mt-3 pt-3 border-t border-[#374151]">
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block py-3 px-4 rounded-lg text-sm font-semibold bg-[#2DD4BF]/10 text-[#2DD4BF] hover:bg-[#2DD4BF]/20 transition-colors duration-150 flex items-center justify-center border border-[#2DD4BF]/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaFileAlt className="mr-2" />
                    Download Resume
                    <FaExternalLinkAlt size={12} className="ml-2 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;