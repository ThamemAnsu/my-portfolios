import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', to: 'home', key: 'ESC', emoji: '🏠' },
  { name: 'About', to: 'about', key: 'A', emoji: '🙋' },
  { name: 'Skills', to: 'skills', key: 'S', emoji: '⚡' },
  { name: 'Projects', to: 'projects', key: 'P', emoji: '🚀' },
  { name: 'Experience', to: 'experience', key: 'E', emoji: '💼' },
  { name: 'Certifications', to: 'certifications', key: 'F1', emoji: '🏆' },
  { name: 'Contact', to: 'contact', key: 'C', emoji: '✉️' },
] as const;

const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset by 140px to prevent keyboard from covering headers
      const navHeight = 140;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
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
      if (mostVisibleSection && maxRatio > 0) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setActiveSection(mostVisibleSection);
        }, 50);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const timeoutId = setTimeout(() => {
      NAV_LINKS.forEach(({ to }) => {
        const element = document.getElementById(to);
        if (element) observer.observe(element);
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none">
      {/* Floating Mechanical Keyboard Case Tray — White / Minimal Theme */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="pointer-events-auto p-2 rounded-[20px] flex items-center"
        style={{
          background: '#ffffff',
          border: '1px solid #E4E4E7',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        {/* Left bezel screw aesthetic */}
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] border border-neutral-300 relative flex items-center justify-center ml-1.5 mr-2.5 select-none">
          <div className="w-1.5 h-[1px] bg-neutral-400 rotate-45" />
        </div>

        {/* Keyboard Brand Badge */}
        <div className="flex flex-col justify-center items-start px-2 py-0.5 border-r border-neutral-200 mr-2.5 select-none">
          <span className="text-[9px] font-black tracking-wider text-[#EF4444]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            MX-60
          </span>
          <span className="text-[6.5px] font-bold tracking-widest text-neutral-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            CLASSIC
          </span>
        </div>

        {/* Recessed Switch Plate holding the keycaps */}
        <div
          className="flex gap-1.5 p-1 rounded-[12px] shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)]"
          style={{
            background: '#F4F4F5',
            border: '1px solid #E4E4E7',
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.to;
            const isHovered = hoveredSection === link.to;
            const abbreviatedName =
              link.name === 'Certifications'
                ? 'Certs'
                : link.name === 'Experience'
                  ? 'Exp'
                  : link.name;

            return (
              <motion.button
                key={link.to}
                onClick={() => scrollToSection(link.to)}
                onMouseEnter={() => setHoveredSection(link.to)}
                onMouseLeave={() => setHoveredSection(null)}
                className="outline-none cursor-pointer flex flex-col justify-between items-center"
                style={{
                  width: '58px',
                  height: '48px',
                  borderRadius: '8px',
                  background: isActive
                    ? 'linear-gradient(180deg, #EF4444 0%, #DC2626 100%)'
                    : isHovered
                      ? 'linear-gradient(180deg, #F4F4F5 0%, #E4E4E7 100%)'
                      : 'linear-gradient(180deg, #FFFFFF 0%, #F4F4F5 100%)',
                  borderTop: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid #ffffff',
                  borderLeft: isActive ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #ffffff',
                  borderRight: isActive ? '1px solid #B91C1C' : '1px solid #E4E4E7',
                  borderBottom: isActive ? '1.5px solid #991B1B' : '4px solid #C4C4C7',
                  boxShadow: isActive
                    ? '0 1px 2px rgba(0,0,0,0.1), inset 0 2px 3px rgba(0,0,0,0.15)'
                    : '0 2.5px 3.5px rgba(0,0,0,0.06), inset 0 1px 0 #ffffff',
                  transform: isActive ? 'translateY(2.5px)' : 'translateY(0px)',
                  transition: 'background-color 0.1s, border 0.1s, box-shadow 0.1s, transform 0.08s',
                }}
                whileTap={{
                  transform: 'translateY(3.5px)',
                  borderBottomWidth: '1px',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
                }}
              >
                {/* Keycap Legend (e.g. ESC, A, S) */}
                <span
                  className="text-[6.5px] font-black w-full px-1.5 pt-0.5 text-left block tracking-wider opacity-60"
                  style={{
                    color: isActive ? '#ffffff' : '#71717A',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {link.key}
                </span>

                {/* Main Keycap Label & Icon */}
                <div className="flex flex-col items-center justify-center w-full pb-1 select-none">
                  <span className="text-[12px] leading-none mb-0.5">{link.emoji}</span>
                  <span
                    className="text-[7.5px] font-extrabold tracking-wide uppercase text-center truncate w-full px-0.5"
                    style={{
                      color: isActive ? '#ffffff' : '#27272A',
                      fontFamily: 'Nunito, sans-serif',
                    }}
                  >
                    {abbreviatedName}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* OLED Screen Widget (Premium custom keyboard aesthetic) */}
        <div
          className="flex flex-col justify-between px-2.5 py-1.5 rounded-lg border ml-2.5 select-none"
          style={{
            width: '95px',
            height: '48px',
            background: '#09090B',
            borderColor: '#27272A',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[5.5px] font-bold text-neutral-500 tracking-wider">OLED SCREEN</span>
            <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[5px] text-neutral-500">MODE_ACTIVE:</span>
            <span
              className="text-[7.5px] font-black text-[#EF4444] tracking-wide uppercase truncate animate-pulse"
              style={{ textShadow: '0 0 3px rgba(239,68,68,0.4)' }}
            >
              {activeSection || 'HOME'}
            </span>
          </div>
        </div>

        {/* Right bezel screw aesthetic */}
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] border border-neutral-300 relative flex items-center justify-center mr-1 ml-2.5 select-none">
          <div className="w-1.5 h-[1px] bg-neutral-400 -rotate-45" />
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarNav;