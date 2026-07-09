import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaReact, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaTerminal } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiSupabase, SiFramer } from 'react-icons/si';

interface FooterProps {
  onTerminalOpen?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onTerminalOpen }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub,   href: 'https://github.com/ThamemAnsu',             color: 'var(--text-primary)' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/thamemansari',       color: '#0A66C2' },
    { icon: FaTwitter,  href: 'https://twitter.com/thamemansari',           color: '#1DA1F2' },
    { icon: FaEnvelope, href: 'mailto:thamemansari@gmail.com',              color: '#EF4444' },
  ];

  const techStack = [
    { icon: FaReact,       name: 'React',    color: '#61DAFB' },
    { icon: SiTypescript,  name: 'TS',       color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: SiFramer,      name: 'Framer',   color: '#E10098' },
    { icon: SiSupabase,    name: 'Supabase', color: '#3ECF8E' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative pt-12 pb-6 overflow-hidden"
      style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Branding */}
          <div className="flex flex-col items-start">
            <motion.button
              onClick={scrollToTop}
              className="text-2xl font-black mb-2"
              style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
              whileHover={{ scale: 1.05 }}
            >
              <span style={{ color: '#EF4444' }}>Thamem</span> Ansari
            </motion.button>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              Full-Stack Wizard · AI Builder · Art Coder 🎨
            </p>
            {/* Terminal hint */}
            <button
              onClick={onTerminalOpen}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#EF4444',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
              }}
            >
              <FaTerminal size={10} />
              Try: Ctrl+K — developer secret
            </button>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center">
            <h4
              className="font-black text-sm mb-3 flex items-center gap-2"
              style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}
            >
              <div className="w-0.5 h-4 rounded-full" style={{ background: 'linear-gradient(to bottom, #EF4444, #DC2626)' }} />
              Navigate
            </h4>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs font-bold transition-colors"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}
                  whileHover={{ x: 2, color: '#EF4444' }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-end">
            <h4
              className="font-black text-sm mb-3 flex items-center gap-2"
              style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}
            >
              Connect
              <div className="w-0.5 h-4 rounded-full" style={{ background: 'linear-gradient(to bottom, #EF4444, #DC2626)' }} />
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: 'var(--text-muted)',
                  }}
                  whileHover={{
                    y: -3,
                    scale: 1.1,
                    color: s.color,
                    borderColor: s.color,
                    boxShadow: '0 6px 20px rgba(239,68,68,0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.25), rgba(245,158,11,0.25), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {currentYear}{' '}
            <span style={{ color: '#EF4444', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>Thamem Ansari</span>
            {' '}· Made with <FaHeart style={{ display: 'inline', color: '#EF4444', margin: '0 2px' }} size={10} /> & lots of ☕
          </p>

          {/* Tech stack badges */}
          <div className="flex items-center flex-wrap justify-center gap-1.5">
            {techStack.map((tech) => (
              <motion.span
                key={tech.name}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all"
                style={{
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  color: 'var(--text-muted)',
                }}
                whileHover={{ y: -2, scale: 1.05, borderColor: tech.color, color: tech.color }}
              >
                <tech.icon style={{ color: tech.color }} size={10} />
                {tech.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;