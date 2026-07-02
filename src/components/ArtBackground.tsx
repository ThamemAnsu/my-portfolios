import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DoodleEl {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  color: string;
  rotate: number;
}

const DOODLES = [
  '{ }', '< />', '=>', '// ', '&&', '||', '/**', '*/', '===',
  '☕', '💡', '🎨', '🖥️', '⌨️', '🔥', '✨', '📦', '#!',
  'npm', 'git', 'API', 'UI', 'DB', 'fn()', 'async', 'await',
];

const COLORS = ['#FF6B6B', '#FFD93D', '#6C63FF', '#4ECDC4', '#FF8FA3'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const ArtBackground: React.FC = () => {
  const [elements, setElements] = useState<DoodleEl[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const els: DoodleEl[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      text: DOODLES[i % DOODLES.length],
      x: randomBetween(2, 98),
      y: randomBetween(2, 98),
      size: randomBetween(11, 22),
      dur: randomBetween(5, 12),
      delay: randomBetween(0, 6),
      color: COLORS[i % COLORS.length],
      rotate: randomBetween(-30, 30),
    }));
    setElements(els);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Warm dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6C63FF 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Warm color blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          top: '-100px', left: '-100px',
          background: 'radial-gradient(circle, #FF6B6B, transparent 70%)',
          animation: 'blobPulse 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          bottom: '5%', right: '-80px',
          background: 'radial-gradient(circle, #6C63FF, transparent 70%)',
          animation: 'blobPulse 14s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          top: '40%', left: '40%',
          background: 'radial-gradient(circle, #FFD93D, transparent 70%)',
          animation: 'blobPulse 18s ease-in-out infinite',
        }}
      />

      {/* Floating doodle code elements */}
      {elements.map((el) => (
        <motion.span
          key={el.id}
          className="absolute select-none font-mono font-bold opacity-0"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            color: el.color,
            rotate: el.rotate,
          }}
          animate={{
            opacity: [0, 0.25, 0.18, 0.25, 0],
            y: [0, -24, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: el.dur,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {el.text}
        </motion.span>
      ))}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(10,8,20,0.6) 100%)',
        }}
      />
    </div>
  );
};

export default ArtBackground;
