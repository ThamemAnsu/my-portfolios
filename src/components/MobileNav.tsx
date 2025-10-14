import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Experience', to: 'experience' },
  { name: 'Contact', to: 'contact' }
] as const;

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
    }
  };
  
  return (
    <div className="md:hidden fixed top-6 right-6 z-50">
      {/* Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] border-2 border-[#374151] flex items-center justify-center text-[#2DD4BF] shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-24 right-6 w-72 bg-gradient-to-br from-[#1F2937] to-[#0F172A] border-2 border-[#374151] rounded-3xl p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Logo/Title */}
              <div className="mb-6 pb-4 border-b-2 border-[#374151]">
                <h3 className="text-2xl font-black">
                  <span className="text-[#2DD4BF]">Menu</span>
                </h3>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    key={link.to}
                    onClick={() => scrollToSection(link.to)}
                    className="w-full text-left px-5 py-4 rounded-xl text-white font-bold hover:bg-[#2DD4BF]/10 hover:text-[#2DD4BF] transition-all duration-200 border-none bg-transparent flex items-center justify-between group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{link.name}</span>
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#2DD4BF] opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Footer Text */}
              <div className="mt-6 pt-4 border-t-2 border-[#374151] text-center">
                <p className="text-[#94A3B8] text-xs font-mono">
                  Swipe to explore
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;