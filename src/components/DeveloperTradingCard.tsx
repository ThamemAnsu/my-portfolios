import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDocker, FaCode } from 'react-icons/fa';
import { SiSupabase, SiTypescript, SiPython } from 'react-icons/si';

interface TradingCardProps {
  name?: string;
  title?: string;
}

const DeveloperTradingCard: React.FC<TradingCardProps> = ({
  name = 'Thamem Ansari',
  title = 'Full-Stack Wizard',
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) * -20;
    setTilt({ x, y });
  };

  const stats = [
    { label: 'Years Coding',   value: '2+',   color: '#FF6B6B' },
    { label: 'Projects Built', value: '10+',  color: '#FFD93D' },
    { label: 'Coffees / Day',  value: '∞',    color: '#4ECDC4' },
  ];

  const stack = [
    { icon: FaReact,      color: '#61DAFB', label: 'React'      },
    { icon: FaNodeJs,     color: '#68A063', label: 'Node.js'    },
    { icon: SiSupabase,   color: '#3ECF8E', label: 'Supabase'   },
    { icon: SiTypescript, color: '#3178C6', label: 'TypeScript' },
    { icon: SiPython,     color: '#FFD93D', label: 'Python'     },
    { icon: FaDocker,     color: '#2496ED', label: 'Docker'     },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1,    y: 0   }}
      transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
      className="w-full max-w-sm mx-auto"
      style={{ perspective: '800px' }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        style={{
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: hovered ? 'transform 0.05s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-[24px] p-[2px] cursor-pointer"
      >
        {/* Holographic rainbow border — use CSS class so Framer Motion doesn't intercept the gradient */}
        <div
          className="absolute inset-0 rounded-[24px] opacity-80 animate-shimmer"
          style={{
            background: 'linear-gradient(105deg, #FF6B6B, #FFD93D, #6C63FF, #4ECDC4, #FF8FA3, #FF6B6B)',
            backgroundSize: '300% auto',
          }}
        />

        {/* Card body */}
        <div
          className="relative rounded-[22px] overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {/* Holo overlay */}
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-10"
              style={{
                background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(239,68,68,0.15), transparent 60%)`,
              }}
            />
          )}

          {/* Header strip */}
          <div
            className="px-5 pt-5 pb-3"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.06))',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex justify-between items-start mb-1">
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: '#D97706', fontFamily: 'JetBrains Mono, monospace' }}
              >
                LEGENDARY ⭐
              </span>
              <FaCode style={{ color: '#EF4444' }} size={18} />
            </div>
            <div className="text-[22px] font-black" style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}>
              {name.split(' ')[0]}{' '}
              <span style={{ color: '#EF4444' }}>{name.split(' ').slice(1).join(' ')}</span>
            </div>
            <div className="text-sm font-bold mt-0.5" style={{ color: '#DC2626' }}>
              🧙‍♂️ {title}
            </div>
          </div>

          {/* Obsession banner */}
          <div
            className="px-5 py-2 text-xs font-bold flex items-center gap-2"
            style={{
              background: 'rgba(239,68,68,0.06)',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              color: '#DC2626',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <span className="text-base">🎤</span>
            <span>Current Obsession: <span style={{ color: '#D97706' }}>Tamil Voice AI</span></span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-gray-200/50 px-0 py-4 mx-5 rounded-xl mt-3 mb-2"
            style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center py-1 px-2">
                <div className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Nunito, sans-serif' }}>
                  {s.value}
                </div>
                <div className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack icons */}
          <div className="px-5 pb-5">
            <div className="text-[9px] uppercase tracking-[0.15em] mb-2 font-bold" style={{ color: 'var(--text-muted)' }}>
              Tech Stack
            </div>
            <div className="flex gap-2 flex-wrap">
              {stack.map((t, i) => (
                <div
                  key={i}
                  title={t.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: `${t.color}10`,
                    border: `1px solid ${t.color}25`,
                  }}
                >
                  <t.icon size={18} style={{ color: t.color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperTradingCard;
