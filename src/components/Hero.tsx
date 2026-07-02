import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaPaperPlane } from 'react-icons/fa';
import { IconWrapper } from '../utils/IconUtils';
import { useProfile } from '../hooks/useSupabase';
import DeveloperTradingCard from './DeveloperTradingCard';
import InkDrawWrapper from './InkDrawWrapper';

const ROLES = [
  'Frontend Developer 🎨',
  'AI Specialist 🤖',
  'Full-Stack Engineer 🚀',
  'React Wizard 🧙‍♂️',
];

const Hero: React.FC = () => {
  const { profile, loading } = useProfile();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 140;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % ROLES.length;
      const fullText = ROLES[current];
      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        if (text.length === fullText.length) {
          setTypingSpeed(2000);
          setTimeout(() => { setIsDeleting(true); setTypingSpeed(50); }, 2000);
        }
      } else {
        setText(fullText.substring(0, text.length - 1));
        if (text.length === 0) { setIsDeleting(false); setTypingSpeed(150); setLoopNum(loopNum + 1); }
      }
    };
    typingRef.current = setTimeout(handleTyping, typingSpeed);
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [text, isDeleting, loopNum, typingSpeed]);

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center" style={{ background: '#13111C' }}>
        <div className="spinner" />
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 md:pt-20">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ─── Left Content ─────────────────────────── */}
          <div className="max-w-2xl">
            {/* Open to work badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-bold text-sm"
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#EF4444',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#EF4444', boxShadow: '0 0 8px rgba(239,68,68,0.4)' }}
              />
              Open to Work 🚀
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1]"
                style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
              >
                <span className="block text-xl md:text-2xl font-bold mb-1" style={{ color: 'var(--text-muted)' }}>
                  {profile?.intro_text || "Hello, I'm"}
                </span>
                <span style={{ color: '#EF4444' }}>
                  {profile?.name?.split(' ')[0] || 'Thamem'}
                </span>
                {' '}
                <span style={{ color: 'var(--text-primary)' }}>
                  {profile?.name?.split(' ').slice(1).join(' ') || 'Ansari'}
                </span>
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <InkDrawWrapper color="#EF4444" delay={400}>
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                  style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}
                >
                  <FaCode style={{ color: '#EF4444', flexShrink: 0 }} size={20} />
                  <span className="text-xl md:text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}>
                    {text}
                    <span
                      className="ml-1 inline-block w-0.5 h-6 md:h-7 animate-blink rounded-full"
                      style={{ background: '#EF4444', verticalAlign: 'middle' }}
                    />
                  </span>
                </div>
              </InkDrawWrapper>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              {profile?.bio ||
                'I craft exceptional digital experiences that blend art, code & AI. Currently obsessed with Tamil voice AI & building things people love. ✨'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 font-black rounded-2xl overflow-hidden shadow-xl text-base"
                style={{
                  background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                  color: '#ffffff',
                  fontFamily: 'Nunito, sans-serif',
                  boxShadow: '0 8px 30px rgba(239,68,68,0.25)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(239,68,68,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">🎨 View My Work</span>
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 font-black rounded-2xl border-2 text-base transition-all"
                style={{
                  background: 'transparent',
                  border: '2px solid rgba(239,68,68,0.4)',
                  color: '#EF4444',
                  fontFamily: 'Nunito, sans-serif',
                }}
                whileHover={{
                  scale: 1.05,
                  background: 'rgba(239,68,68,0.06)',
                  borderColor: '#EF4444',
                  boxShadow: '0 8px 30px rgba(239,68,68,0.15)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <FaPaperPlane size={14} /> Let's Talk
                </span>
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              {[
                { url: profile?.github_url,   icon: FaGithub,   color: '#111827', glow: '#111827' },
                { url: profile?.linkedin_url, icon: FaLinkedin, color: '#0A66C2', glow: '#0A66C2' },
                { url: profile?.twitter_url,  icon: FaTwitter,  color: '#1DA1F2', glow: '#1DA1F2' },
              ].filter(s => s.url).map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: 'var(--text-muted)',
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.15,
                    color: s.color,
                    boxShadow: `0 8px 24px ${s.glow}40`,
                    borderColor: s.color,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {IconWrapper(s.icon, { size: 18 })}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Developer Trading Card ─────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="hidden lg:flex items-center justify-center"
          >
            <DeveloperTradingCard
              name={profile?.name || 'Thamem Ansari'}
              title="Full-Stack Wizard"
            />
          </motion.div>

        </div>
      </div>

      {/* Decorative floating code words */}
      {[
        { text: '<div>', x: '8%',  y: '15%', color: '#FF6B6B30', size: 14, dur: 8  },
        { text: 'async', x: '88%', y: '20%', color: '#6C63FF30', size: 12, dur: 6  },
        { text: '{ }',   x: '5%',  y: '70%', color: '#FFD93D30', size: 18, dur: 9  },
        { text: '=>',    x: '92%', y: '75%', color: '#4ECDC430', size: 16, dur: 7  },
      ].map((el, i) => (
        <motion.span
          key={i}
          className="absolute select-none pointer-events-none font-mono font-black"
          style={{ left: el.x, top: el.y, fontSize: el.size, color: el.color }}
          animate={{ y: [0, -16, 0], x: [0, 6, 0] }}
          transition={{ duration: el.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        >
          {el.text}
        </motion.span>
      ))}
    </section>
  );
};

export default Hero;