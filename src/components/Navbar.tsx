import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showIndicator, setShowIndicator] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);
  
  // Track current section for active state
  useEffect(() => {
    const handleSectionObserver = () => {
      const sections = document.querySelectorAll('section[id]');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0px -80% 0px' }
      );
      
      sections.forEach((section) => {
        observer.observe(section);
      });
      
      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    };
    
    handleSectionObserver();
  }, []);
  
  // Animation variants
  const navbarVariants = {
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 25
      }
    },
    hidden: { 
      opacity: 0,
      y: -50,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 25
      }
    }
  };
  
  const mobileMenuVariants = {
    open: { 
      opacity: 1,
      height: 'auto',
      transition: { 
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const mobileItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };
  
  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' }
  ];
  
  return (
    <motion.nav 
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/90 backdrop-blur-sm shadow-xl border-b border-teal-500/10 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="home" 
            smooth={true} 
            duration={800} 
            className="text-2xl font-bold cursor-pointer group relative"
          >
            <span className="text-teal-400">Thamem</span>
            <span className="text-white">Ansari</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative">
              {showIndicator && (
                <motion.div 
                  ref={indicatorRef}
                  className="absolute bottom-0 h-0.5 bg-teal-400 transition-all duration-300"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={800}
                  onSetActive={() => setActiveSection(link.to)}
                  className={`relative px-5 py-2 text-sm font-medium cursor-pointer transition-all duration-300 hover:text-teal-400 ${
                    activeSection === link.to
                      ? 'text-teal-400'
                      : 'text-gray-300'
                  }`}
                >
                  <span 
                    onMouseEnter={() => setShowIndicator(true)}
                    onMouseLeave={() => setShowIndicator(false)}
                    className="inline-block"
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="pl-6 ml-6 border-l border-gray-700">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2 bg-gray-800/80 hover:bg-teal-500 text-white text-sm font-medium rounded-md transition-all duration-300 flex items-center space-x-2 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/20 border border-gray-700 hover:border-transparent"
              >
                <FaFileAlt className="text-teal-400 group-hover:text-white" />
                <span>Resume</span>
                <FaExternalLinkAlt size={12} className="ml-1 opacity-70" />
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-teal-400 hover:bg-gray-800/50 focus:outline-none transition-colors duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen 
                ? <FaTimes size={20} />
                : <FaBars size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden mt-4 py-2 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/95 backdrop-blur-md shadow-2xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 py-2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={mobileItemVariants}
                  >
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      className={`block py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-800/50 transition-all duration-300 ${
                        activeSection === link.to
                          ? 'text-teal-400 bg-gray-800/30'
                          : 'text-gray-300'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  variants={mobileItemVariants}
                  className="mt-2 pt-2 border-t border-gray-800"
                >
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block py-3 px-4 rounded-md text-sm font-medium bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-all duration-300 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaFileAlt className="mr-2" />
                    Resume
                    <FaExternalLinkAlt size={12} className="ml-2 opacity-70" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;