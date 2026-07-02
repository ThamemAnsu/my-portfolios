import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen, FaCode, FaStar, FaThLarge, FaBookOpen } from 'react-icons/fa';
import { IconWrapper } from '../utils/IconUtils';
import { useProjects } from '../hooks/useSupabase';
import type { Project } from '../lib/supabase';
import { TextScramble } from './ui/TextScramble';

// Developer-themed placeholder images (art/code themed)
const getArtPlaceholder = (index: number): string => {
  const images = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', // code screen
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', // laptop coding
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop', // dev workspace
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', // team coding
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', // monitor code
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop', // typing
  ];
  return images[index % images.length];
};

// Process peek data per project
const PROJECT_PROCESS: Record<string, { diagram: string; snippet: string; note: string }> = {
  default: {
    diagram: `User → API → LangChain → DB
              ↓          ↓
           Whisper    Supabase
              ↓
           Response`,
    snippet: `// Core handler\nasync function process(input) {\n  const result = await chain.call(input);\n  await db.save(result);\n  return result;\n}`,
    note: 'Event-driven architecture with async queues for scalability.',
  },
};

interface FlipCardProps {
  project: Project;
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ project, index }) => {
  const [flipped, setFlipped] = useState(false);
  const imageUrl = project.image_url || getArtPlaceholder(index);
  const process = PROJECT_PROCESS[project.id] || PROJECT_PROCESS.default;
  const accentColors = ['#FF6B6B', '#6C63FF', '#FFD93D', '#4ECDC4', '#FF8FA3'];
  const accent = accentColors[index % accentColors.length];

  return (
    <div
      className="flip-card h-[440px]"
      style={{ minHeight: 440 }}
    >
      <motion.div
        className={`flip-card-inner h-full ${flipped ? 'flipped' : ''}`}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0.2, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ─── FRONT ─── */}
        <div
          className="flip-card-front absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          }}
        >
          {/* Image */}
          <div className="relative h-52 flex-shrink-0 overflow-hidden" style={{ background: '#F3F4F6' }}>
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, var(--bg-elevated), ${accent}05, transparent)` }}
            />
            {project.featured && (
              <div
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#ffffff' }}
              >
                <FaStar size={10} /> Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3
              className="text-lg font-black mb-2 line-clamp-2"
              style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}
            >
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed mb-4 line-clamp-3 flex-1" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2.5 py-1 rounded-lg font-bold font-mono"
                  style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[10px] px-2.5 py-1 rounded-lg font-bold font-mono" style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-muted)' }}>
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', color: 'var(--text-muted)' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {IconWrapper(FaGithub, { size: 16 })}
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
                    onClick={e => e.stopPropagation()}
                  >
                    {IconWrapper(FaExternalLinkAlt, { size: 14 })}
                  </a>
                )}
              </div>
              <button
                onClick={() => setFlipped(true)}
                className="text-xs font-black px-4 py-2 rounded-xl transition-all hover:scale-105"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                How I Built It →
              </button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </div>

        {/* ─── BACK (Process Peek) ─── */}
        <div
          className="flip-card-back absolute inset-0 rounded-3xl p-5 flex flex-col"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaCode style={{ color: accent }} size={16} />
              <span
                className="font-black text-sm"
                style={{ color: accent, fontFamily: 'Nunito, sans-serif' }}
              >
                Process Peek 🔍
              </span>
            </div>
            <button
              onClick={() => setFlipped(false)}
              className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
              style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              ← Back
            </button>
          </div>

          {/* Architecture diagram */}
          <div
            className="rounded-xl p-4 mb-3 font-mono text-xs leading-relaxed flex-shrink-0"
            style={{ background: '#F3F4F6', border: `1px solid rgba(0,0,0,0.06)`, color: 'var(--text-primary)' }}
          >
            <div className="text-[9px] mb-2 font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{"// Architecture"}</div>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#B91C1C' }}>{process.diagram}</pre>
          </div>

          {/* Code snippet */}
          <div
            className="rounded-xl p-4 mb-3 font-mono text-xs flex-1 overflow-hidden"
            style={{ background: '#F3F4F6', border: `1px solid rgba(0,0,0,0.06)` }}
          >
            <div className="text-[9px] mb-2 font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{"// Code Snippet"}</div>
            <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '10px', overflow: 'hidden' }}>{process.snippet}</pre>
          </div>

          {/* Dev note */}
          <div
            className="rounded-xl px-4 py-3 text-xs font-bold"
            style={{ background: `${accent}0D`, border: `1px solid ${accent}25`, color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}
          >
            💡 {process.note}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [headerHovered, setHeaderHovered] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'story' | 'grid'>('story');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const allTechnologies = ['all', ...Array.from(new Set(
    projects.flatMap(project => project.technologies)
  ))];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.technologies.includes(activeFilter));

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track active project card in story mode using Intersection Observer
  useEffect(() => {
    if (layoutMode !== 'story' || filteredProjects.length === 0) return;

    // Reset index when filter changes
    setActiveProjectIndex(0);

    const observers = sectionRefs.current.map((ref, idx) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            setActiveProjectIndex(idx);
          }
        },
        {
          threshold: [0.15, 0.3, 0.5, 0.7],
          rootMargin: "-25% 0px -25% 0px"
        }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, activeFilter, layoutMode]);

  // Framer Motion useScroll for parallax translations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yMockup = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yBadges = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotateMockup = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  if (loading) {
    return (
      <section id="projects" className="py-32 relative w-full">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-center">
          <div className="spinner" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-32 relative w-full">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.3)' }}>
            <h3 className="font-black text-xl mb-2" style={{ color: '#FF6B6B', fontFamily: 'Nunito, sans-serif' }}>Error Loading Projects</h3>
            <p className="text-sm" style={{ color: '#A0A0B8' }}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 relative w-full overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm"
            style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}
          >
            🚀 My Work
          </div>

          <h2
            className="text-5xl md:text-6xl font-black mb-5 cursor-default select-none"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            <TextScramble text="Featured " trigger={headerHovered} />
            <TextScramble
              text="Projects"
              trigger={headerHovered}
              className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent"
            />
          </h2>

          <motion.div
            className="h-1.5 rounded-full mx-auto mb-5"
            style={{ background: 'linear-gradient(90deg, #EF4444, #DC2626, #EF4444)' }}
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Flip a card to see the architecture & code behind each project 🃏
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {allTechnologies.slice(0, 8).map((tech, i) => {
            const active = activeFilter === tech;
            return (
              <motion.button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className="px-5 py-2.5 rounded-xl text-sm font-black transition-all"
                style={{
                  background: active ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'rgba(0,0,0,0.02)',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  border: active ? 'none' : '1px solid rgba(0,0,0,0.06)',
                  fontFamily: 'Nunito, sans-serif',
                  boxShadow: active ? '0 6px 20px rgba(239,68,68,0.2)' : 'none',
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {tech.charAt(0).toUpperCase() + tech.slice(1)}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Layout Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setLayoutMode('story')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${layoutMode === 'story' ? 'bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white shadow-md shadow-red-500/20' : 'bg-transparent text-gray-500 border border-gray-200 hover:border-red-500/50 hover:text-red-500'}`}
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <FaBookOpen /> Story Mode
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${layoutMode === 'grid' ? 'bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white shadow-md shadow-red-500/20' : 'bg-transparent text-gray-500 border border-gray-200 hover:border-red-500/50 hover:text-red-500'}`}
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <FaThLarge /> Classic Grid
          </button>
        </div>

        {/* Projects View */}
        {layoutMode === 'story' && filteredProjects.length > 0 ? (
          <div ref={containerRef} className="flex flex-col lg:flex-row gap-12 relative items-start">

            {/* Sticky Visual Column (Left) */}
            <div
              className="hidden lg:block w-1/2 sticky top-24 h-[calc(100vh-160px)] rounded-3xl overflow-hidden shadow-2xl relative"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                minHeight: '520px'
              }}
            >
              {/* Parallax Background layer */}
              <motion.div
                className="absolute inset-0 opacity-15 filter blur-[60px] pointer-events-none"
                style={{
                  y: yBg,
                  background: `radial-gradient(circle, ${activeProjectIndex % 2 === 0 ? '#EF4444' : '#B32F2F'} 0%, transparent 65%)`
                }}
              />

              {/* Tactile grid pattern */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="h-full flex flex-col items-center justify-center p-8 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProjectIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex flex-col items-center justify-center h-full relative"
                  >
                    {/* Device Mockup with Parallax */}
                    <motion.div
                      className="w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl bg-gray-900 relative mt-4"
                      style={{ y: yMockup, rotate: rotateMockup }}
                    >
                      <div className="h-6 bg-gray-800 flex items-center px-4 gap-1.5 border-b border-gray-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        <span className="text-[9px] font-mono text-gray-500 mx-auto">localhost:3000/{filteredProjects[activeProjectIndex]?.id}</span>
                      </div>
                      <img
                        src={filteredProjects[activeProjectIndex]?.image_url || getArtPlaceholder(activeProjectIndex)}
                        alt="Project Screen"
                        className="w-full h-[calc(100%-24px)] object-cover"
                      />
                    </motion.div>

                    {/* Floating Tech Badges (Parallax layer) */}
                    <motion.div
                      className="flex flex-wrap gap-2 justify-center mt-6 max-w-[400px]"
                      style={{ y: yBadges }}
                    >
                      {filteredProjects[activeProjectIndex]?.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-500 border border-red-500/25 shadow-md flex items-center gap-1.5"
                          style={{ fontFamily: 'Nunito, sans-serif' }}
                        >
                          ⚡ {tech}
                        </span>
                      ))}
                    </motion.div>

                    {/* Terminal Status Printout */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl font-mono text-[9px] text-red-500 border border-red-500/20 bg-black/60 shadow-inner">
                      <div>&gt; INITIALIZING PREVIEW_CONSOLE...</div>
                      <div>&gt; LOADED: {filteredProjects[activeProjectIndex]?.title.toUpperCase()}</div>
                      <div>&gt; STATUS: STABLE // RENDERED_SUCCESSFULLY</div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Scrolling Details Column (Right) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-12">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  ref={el => sectionRefs.current[index] = el}
                  className="scroll-mt-32"
                >
                  <FlipCard project={project} index={index} />
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* Classic Grid Layout */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
              >
                <FlipCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <FaFolderOpen style={{ color: '#FF6B6B', margin: '0 auto 16px', fontSize: '4rem', opacity: 0.3 }} />
            <p style={{ color: '#A0A0B8' }}>No projects found for this filter</p>
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href="https://github.com/ThamemAnsu"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-base transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,107,107,0.3)',
              color: '#F8F7FF',
              fontFamily: 'Nunito, sans-serif',
            }}
            whileHover={{
              scale: 1.05,
              borderColor: '#FF6B6B',
              boxShadow: '0 20px 40px rgba(255,107,107,0.25)',
              background: 'rgba(255,107,107,0.08)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {IconWrapper(FaGithub, { size: 22 })}
            <span>View All on GitHub</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;