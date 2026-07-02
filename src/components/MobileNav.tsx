import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', to: 'home', emoji: '🏠' },
  { name: 'About', to: 'about', emoji: '🙋' },
  { name: 'Skills', to: 'skills', emoji: '⚡' },
  { name: 'Projects', to: 'projects', emoji: '🚀' },
  { name: 'Experience', to: 'experience', emoji: '💼' },
  { name: 'Certifications', to: 'certifications', emoji: '🏆' },
  { name: 'Contact', to: 'contact', emoji: '✉️' },
] as const;

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 56;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observerOptions = { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let mostVisibleSection = '';
      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });
      if (mostVisibleSection && maxRatio > 0) setActiveSection(mostVisibleSection);
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const timeoutId = setTimeout(() => {
      NAV_LINKS.forEach(({ to }) => {
        const element = document.getElementById(to);
        if (element && observerRef.current) observerRef.current.observe(element);
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-[60] backdrop-blur-xl"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderBottom: '1px solid rgba(239,68,68,0.15)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Brand */}
          <motion.div className="flex items-center gap-2" whileTap={{ scale: 0.95 }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
            >
              T
            </div>
            <div>
              <span className="block font-black text-sm leading-none" style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}>THAMEM</span>
              <span className="block text-[8px] font-bold tracking-widest" style={{ color: '#EF4444', fontFamily: 'JetBrains Mono, monospace' }}>PORTFOLIO</span>
            </div>
          </motion.div>

          {/* Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.3)',
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}
                  style={{ color: '#EF4444', fontSize: 18, lineHeight: 1 }}>✕</motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}
                  style={{ color: '#EF4444', fontSize: 16, lineHeight: 1 }}>☰</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="md:hidden fixed top-[58px] left-3 right-3 z-[60] rounded-2xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(239,68,68,0.2)',
                boxShadow: '0 20px 60px rgba(239,68,68,0.1)',
              }}
              initial={{ y: -16, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <nav className="p-3 space-y-1">
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeSection === link.to;
                  return (
                    <motion.button
                      key={link.to}
                      onClick={() => scrollToSection(link.to)}
                      className="w-full text-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                        style={{
                          background: isActive ? 'rgba(239,68,68,0.08)' : 'transparent',
                          border: isActive ? '1px solid rgba(239,68,68,0.3)' : '1px solid transparent',
                        }}
                      >
                        <span className="text-lg">{link.emoji}</span>
                        <span
                          className="text-sm font-black"
                          style={{
                            color: isActive ? '#EF4444' : 'var(--text-secondary)',
                            fontFamily: 'Nunito, sans-serif',
                          }}
                        >
                          {link.name}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="ml-auto w-2 h-2 rounded-full"
                            style={{ background: '#EF4444', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }}
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer hint */}
              <div
                className="px-4 py-2 text-[10px] font-bold text-center"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  color: '#6b7280',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                Press <span style={{ color: '#6C63FF' }}>Ctrl+K</span> for terminal 🖥️
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;