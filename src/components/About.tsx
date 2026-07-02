import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaLightbulb, FaAward } from 'react-icons/fa';
import InkDrawWrapper from './InkDrawWrapper';
import { TextScramble } from './ui/TextScramble';

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [headerHovered, setHeaderHovered] = useState(false);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const fadeInUp = {
    hidden:  { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1, y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const highlights = [
    { icon: FaCode,   title: 'Clean Code',      description: 'Readable, scalable code',  color: '#EF4444' },
    { icon: FaBrain,  title: 'AI Integration',  description: 'LangChain & Whisper',     color: '#EF4444' },
    { icon: FaRocket, title: 'Fast Delivery',   description: 'Concept → Production',     color: '#EF4444' },
  ];

  const funFacts = [
    { emoji: '☕', text: 'Cold brew fueled' },
    { emoji: '🎤', text: 'Tamil Voice AI builder' },
    { emoji: '🎨', text: 'UI designer at heart' },
    { emoji: '🔥', text: 'Open to roles' },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden flex items-center min-h-[90vh]" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-12 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 font-bold text-xs"
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#EF4444',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            <FaLightbulb />
            Get To Know Me
          </div>

          <h2
            className="text-4xl md:text-5xl font-black mb-3 cursor-default select-none"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            <TextScramble text="About " trigger={headerHovered} />
            <TextScramble
              text="Me"
              trigger={headerHovered}
              className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent"
            />
          </h2>

          {/* Animated underline */}
          <motion.div
            className="h-1 rounded-full mx-auto"
            style={{ background: 'linear-gradient(90deg, #EF4444, #DC2626, #EF4444)', width: 80 }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* ─── Left Column: Image Area (5 cols) ─── */}
          <motion.div
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            animate={controls}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Profile image wrapper */}
              <InkDrawWrapper color="#EF4444" delay={300}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-xl"
                  style={{ border: '1px solid rgba(239,68,68,0.15)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="absolute inset-0 z-10 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 60%)' }}
                  />
                  <motion.img
                    src="/developer.gif"
                    alt="Thamem Ansari Coding"
                    className="w-full h-auto object-cover rounded-2xl"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </InkDrawWrapper>

              {/* Coding GIF badge (compact) */}
              <motion.div
                className="absolute -bottom-4 -right-4 rounded-xl overflow-hidden shadow-lg border"
                style={{
                  borderColor: 'rgba(239,68,68,0.4)',
                  background: '#FFFFFF',
                  width: 100,
                  height: 70,
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <img
                  src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                  alt="Coding animation"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 text-center text-[8px] font-bold py-0.5"
                  style={{ background: 'rgba(239,68,68,0.85)', color: '#FFFFFF', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  &lt;vibes ☕&gt;
                </div>
              </motion.div>

              {/* Years exp badge (compact) */}
              <motion.div
                className="absolute -top-4 -left-4 p-2.5 rounded-xl shadow-lg border"
                style={{ background: '#FFFFFF', borderColor: 'rgba(239,68,68,0.2)' }}
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}
                  >
                    <FaAward style={{ color: '#FFFFFF' }} size={14} />
                  </div>
                  <div>
                    <div className="text-lg font-black leading-tight" style={{ color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}>2+</div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase">Exp</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── Right Column: Content side (7 cols) ─── */}
          <motion.div
            variants={fadeInUp}
            custom={2}
            initial="hidden"
            animate={controls}
            className="lg:col-span-7 space-y-5"
          >
            {/* Bio text block (one card for compactness) */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(239,68,68,0.03)',
                border: '1px solid rgba(239,68,68,0.1)',
              }}
            >
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-3">
                I'm <span style={{ color: '#EF4444', fontWeight: 800, fontFamily: 'Nunito, sans-serif' }}>Thamem Ansari</span> — a results-driven developer
                specializing in <span style={{ color: '#EF4444', fontWeight: 800 }}>AI-powered applications</span> and full-stack development.
                I build real-time voice AI systems, enterprise SSO platforms, and intelligent automation workflows.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                My core stack is <span style={{ color: '#EF4444', fontWeight: 800 }}>MERN + Supabase</span>.
                I also build Whisper STT pipelines and OCR solutions, and I am currently focused on
                making <span style={{ color: '#EF4444', fontWeight: 800 }}>Tamil Voice AI</span> a reality. 🎤
              </p>
            </motion.div>

            {/* Highlights Grid (Compact horizontal items) */}
            <motion.div
              variants={fadeInUp}
              custom={4}
              className="grid grid-cols-3 gap-3"
            >
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border text-center"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 mx-auto"
                    style={{ background: 'rgba(239,68,68,0.06)' }}
                  >
                    <item.icon style={{ color: '#EF4444' }} size={15} />
                  </div>
                  <div className="text-[11px] font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.title}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5 line-clamp-1">{item.description}</div>
                </div>
              ))}
            </motion.div>

            {/* Fun facts & Stats combined in a single clean row */}
            <motion.div
              variants={fadeInUp}
              custom={5}
              className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border"
              style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.05)' }}
            >
              {/* Mini Stats list */}
              <div className="flex gap-4">
                {[
                  { val: '10+', label: 'Projects' },
                  { val: '15+', label: 'Techs' },
                ].map((s, i) => (
                  <div key={i} className="text-left">
                    <div className="text-lg font-black leading-none" style={{ color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}>{s.val}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick fact badges */}
              <div className="flex flex-wrap gap-1.5">
                {funFacts.slice(0, 3).map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold text-gray-600 flex items-center gap-1"
                    style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <span>{f.emoji}</span>
                    <span>{f.text}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Compact CTA */}
            <motion.div variants={fadeInUp} custom={6} className="pt-2">
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 font-black rounded-xl text-sm text-white shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                  fontFamily: 'Nunito, sans-serif',
                  boxShadow: '0 4px 15px rgba(239,68,68,0.2)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(239,68,68,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <FaRocket /> View My Work →
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;