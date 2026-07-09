import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { TextScramble } from './ui/TextScramble';

/* ─── Data ─────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    emoji: '🎨',
    color: '#EF4444', // Clean Red
    glow: 'rgba(239,68,68,0.08)',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript',      level: 85 },
      { name: 'HTML & CSS',      level: 95 },
      { name: 'Tailwind CSS',    level: 88 },
      { name: 'Framer Motion',   level: 80 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    emoji: '⚙️',
    color: '#EF4444', // Clean Red
    glow: 'rgba(239,68,68,0.08)',
    skills: [
      { name: 'Node.js & Express', level: 88 },
      { name: 'Python / Flask',    level: 78 },
      { name: 'REST APIs',         level: 90 },
      { name: 'Supabase / Firebase',level: 85 },
      { name: 'PostgreSQL & SQL',  level: 82 },
    ],
  },
  {
    id: 'voiceai',
    label: 'AI & Data Science',
    emoji: '🎙️',
    color: '#EF4444', // Clean Red
    glow: 'rgba(239,68,68,0.08)',
    skills: [
      { name: 'Whisper STT (Real-time)', level: 90 },
      { name: 'LangChain & OpenAI',      level: 82 },
      { name: 'RAG Systems',             level: 80 },
      { name: 'Deepgram / Cartesia API', level: 85 },
      { name: 'NLP & LLM Orchestration', level: 78 },
    ],
  },
  {
    id: 'devops',
    label: 'Tools & DevOps',
    emoji: '🛠️',
    color: '#EF4444', // Clean Red
    glow: 'rgba(239,68,68,0.08)',
    skills: [
      { name: 'Git & GitHub',        level: 90 },
      { name: 'Docker',              level: 75 },
      { name: 'Netlify & Vercel',    level: 88 },
      { name: 'SSO & OAuth (Clerk)', level: 82 },
      { name: 'Linux / Bash Script', level: 80 },
    ],
  },
];

const TOOLS = [
  { label: 'VS Code',   bg: '#007ACC15', border: '#007ACC30', text: '#007ACC' },
  { label: 'Figma',     bg: '#FF7C0015', border: '#FF7C0030', text: '#FF7C00' },
  { label: 'Supabase',  bg: '#3ECF8E15', border: '#3ECF8E30', text: '#3ECF8E' },
  { label: 'GitHub',    bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.08)', text: 'var(--text-primary)' },
  { label: 'Docker',    bg: '#2496ED15', border: '#2496ED30', text: '#2496ED' },
  { label: 'Postman',   bg: '#FF6C3715', border: '#FF6C3730', text: '#FF6C37' },
  { label: 'Vercel',    bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.08)', text: 'var(--text-primary)' },
  { label: 'Notion',    bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.08)', text: 'var(--text-primary)' },
];

/* ─── Sub-components ────────────────────────────────────────── */

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
  active: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, delay, active }) => (
  <div className="mb-5">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}>
        {name}
      </span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: delay + 0.3 }}
        className="text-xs font-black"
        style={{ color, fontFamily: 'JetBrains Mono, monospace' }}
      >
        {level}%
      </motion.span>
    </div>
    <div
      className="relative h-2 rounded-full overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.05)' }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}CC, ${color})` }}
        initial={{ width: 0 }}
        animate={{ width: active ? `${level}%` : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          background: color,
        }}
        initial={{ left: 0, opacity: 0 }}
        animate={{ left: active ? `calc(${level}% - 4px)` : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] }}
      />
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────── */

const Skills: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeTab, setActiveTab] = useState(0);
  const [barsActive, setBarsActive] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    setBarsActive(false);
    const t = setTimeout(() => setBarsActive(true), 80);
    return () => clearTimeout(t);
  }, [activeTab]);

  const cat = CATEGORIES[activeTab];

  const fadeInUp = {
    hidden:  { opacity: 0, y: 40 },
    visible: (c: number) => ({
      opacity: 1, y: 0,
      transition: { delay: c * 0.12, duration: 0.7, ease: 'easeOut' },
    }),
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>

      <div ref={ref} className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Header ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm"
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#EF4444',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            ⚡ My Tech Universe
          </motion.div>

          <h2
            className="text-5xl md:text-6xl font-black mb-5 cursor-default select-none"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            <TextScramble text="Skills & " trigger={headerHovered} />
            <TextScramble
              text="Expertise"
              trigger={headerHovered}
              className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent"
            />
          </h2>

          <motion.div
            className="h-1.5 rounded-full mx-auto mb-4"
            style={{ background: 'linear-gradient(90deg, #EF4444, #DC2626, #EF4444)' }}
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          />

          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            A full-stack wizard spanning frontend craft, backend systems, AI/ML, and DevOps automation.
          </p>
        </motion.div>

        {/* ── Tab Selector + Skill Bars ───────────── */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={1}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Left: Category tabs */}
          <div className="flex flex-col gap-3">
            {CATEGORIES.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => setActiveTab(i)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all overflow-hidden"
                style={{
                  background: activeTab === i
                    ? `linear-gradient(135deg, ${c.color}0D, ${c.color}05)`
                    : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${activeTab === i ? c.color + '35' : 'rgba(0,0,0,0.06)'}`,
                  boxShadow: activeTab === i ? '0 10px 25px rgba(0,0,0,0.03)' : 'none',
                }}
              >
                {/* Active indicator bar */}
                {activeTab === i && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute left-0 inset-y-0 w-1 rounded-r-full"
                    style={{ background: c.color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="text-2xl">{c.emoji}</span>
                <div>
                  <div
                    className="font-black text-base"
                    style={{
                      color: activeTab === i ? c.color : 'var(--text-secondary)',
                      fontFamily: 'Nunito, sans-serif',
                    }}
                  >
                    {c.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {c.skills.length} technologies
                  </div>
                </div>

                {activeTab === i && (
                  <div
                    className="ml-auto text-xs font-black px-2 py-1 rounded-lg"
                    style={{
                      background: c.color + '15',
                      color: c.color,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    Active
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Right: Skill bars panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl p-7"
              style={{
                background: '#FFFFFF',
                border: `1px solid rgba(0,0,0,0.06)`,
                boxShadow: `0 15px 35px rgba(0,0,0,0.03)`,
              }}
            >
              {/* Panel header */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: cat.color + '10', border: `1px solid ${cat.color}25` }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <h3
                    className="font-black text-lg"
                    style={{ color: cat.color, fontFamily: 'Nunito, sans-serif' }}
                  >
                    {cat.label} Stack
                  </h3>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    proficiency rating
                  </span>
                </div>
              </div>

              {/* Skill bars */}
              {cat.skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={cat.color}
                  delay={i * 0.08}
                  active={barsActive}
                />
              ))}

              {/* Average score chip */}
              <div
                className="mt-6 flex items-center justify-between px-4 py-3 rounded-xl"
                style={{
                  background: cat.color + '0C',
                  border: `1px solid ${cat.color}20`,
                }}
              >
                <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                  Avg. Proficiency
                </span>
                <span
                  className="text-sm font-black"
                  style={{ color: cat.color, fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {Math.round(cat.skills.reduce((s, k) => s + k.level, 0) / cat.skills.length)}%
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Stat Cards ──────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={2}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '20+', label: 'Technologies',  color: '#EF4444', emoji: '⚡' },
            { value: '2+',  label: 'Years Coding',  color: '#EF4444', emoji: '💻' },
            { value: '10+', label: 'Projects Built', color: '#EF4444', emoji: '🚀' },
            { value: '∞',   label: 'Coffees / Day', color: '#EF4444', emoji: '☕' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.03, backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              className="text-center rounded-2xl py-6 px-4 cursor-default transition-all duration-200"
              style={{
                background: 'rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div
                className="text-3xl font-black mb-1"
                style={{ color: stat.color, fontFamily: 'Nunito, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tools & Extras ───────────────────────── */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={3}
        >
          <div className="text-center mb-5">
            <span
              className="text-sm font-bold px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#EF4444',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              🛠 Tools I use daily
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map((t, i) => (
              <motion.div
                key={i}
                className="px-5 py-2.5 rounded-full text-sm font-bold cursor-default"
                style={{
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  color: t.text,
                  fontFamily: 'Nunito, sans-serif',
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 8px 24px ${t.border}`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.4 }}
              >
                {t.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;