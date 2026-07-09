import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'center';
  level: number; // 1-100
  orbitRadius: number;
  angle: number;
  speed: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#FF6B6B',
  backend:  '#6C63FF',
  devops:   '#FFD93D',
  ai:       '#4ECDC4',
  center:   '#FF8FA3',
};

const NODES: Omit<Node, 'angle'>[] = [
  // Frontend — inner orbit
  { id: 'react',  label: 'React',       category: 'frontend', level: 90, orbitRadius: 110, speed: 0.6  },
  { id: 'ts',     label: 'TypeScript',  category: 'frontend', level: 82, orbitRadius: 110, speed: 0.6  },
  { id: 'next',   label: 'Next.js',     category: 'frontend', level: 78, orbitRadius: 110, speed: 0.6  },
  { id: 'html',   label: 'HTML/CSS',    category: 'frontend', level: 92, orbitRadius: 110, speed: 0.6  },
  // Backend — mid orbit
  { id: 'node',   label: 'Node.js',     category: 'backend',  level: 85, orbitRadius: 185, speed: 0.4  },
  { id: 'express',label: 'Express',     category: 'backend',  level: 80, orbitRadius: 185, speed: 0.4  },
  { id: 'pg',     label: 'PostgreSQL',  category: 'backend',  level: 80, orbitRadius: 185, speed: 0.4  },
  { id: 'supa',   label: 'Supabase',    category: 'backend',  level: 88, orbitRadius: 185, speed: 0.4  },
  { id: 'flask',  label: 'Flask',       category: 'backend',  level: 70, orbitRadius: 185, speed: 0.4  },
  // AI/DevOps — outer orbit
  { id: 'lchain', label: 'LangChain',   category: 'ai',       level: 75, orbitRadius: 260, speed: 0.25 },
  { id: 'whisper',label: 'Whisper STT', category: 'ai',       level: 72, orbitRadius: 260, speed: 0.25 },
  { id: 'python', label: 'Python',      category: 'ai',       level: 76, orbitRadius: 260, speed: 0.25 },
  { id: 'docker', label: 'Docker',      category: 'devops',   level: 70, orbitRadius: 260, speed: 0.25 },
  { id: 'git',    label: 'Git/CI',      category: 'devops',   level: 82, orbitRadius: 260, speed: 0.25 },
];

const SkillConstellation: React.FC = () => {
  const animRef = useRef<number>(0);
  const [angles, setAngles] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    const byOrbit: Record<number, string[]> = {};
    NODES.forEach(n => {
      (byOrbit[n.orbitRadius] ??= []).push(n.id);
    });
    Object.values(byOrbit).forEach(ids => {
      ids.forEach((id, i) => { init[id] = (360 / ids.length) * i; });
    });
    return init;
  });
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: Node | null }>({ x: 0, y: 0, node: null });

  // Animate orbit
  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngles(prev => {
        const next = { ...prev };
        NODES.forEach(n => { next[n.id] = (prev[n.id] + n.speed * dt * 30) % 360; });
        return next;
      });
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const cx = 300;
  const cy = 300;

  const getPos = (node: typeof NODES[0]) => {
    const rad = (angles[node.id] * Math.PI) / 180;
    return {
      x: cx + node.orbitRadius * Math.cos(rad),
      y: cy + node.orbitRadius * Math.sin(rad),
    };
  };

  const orbits = [110, 185, 260];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.entries({ Frontend: 'frontend', Backend: 'backend', 'AI / ML': 'ai', DevOps: 'devops' }).map(([label, key]) => (
          <div key={key} className="flex items-center gap-2 text-sm font-bold" style={{ color: '#A0A0B8' }}>
            <div className="w-3 h-3 rounded-full" style={{ background: CATEGORY_COLORS[key] }} />
            {label}
          </div>
        ))}
      </div>

      {/* SVG canvas */}
      <div className="relative" style={{ width: 600, maxWidth: '100%' }}>
        <svg
          viewBox="0 0 600 600"
          className="w-full h-auto"
          style={{ overflow: 'visible' }}
        >
          {/* Orbit rings */}
          {orbits.map(r => (
            <circle
              key={r}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
          ))}

          {/* Connection lines to center (faint) */}
          {NODES.map(n => {
            const pos = getPos(n);
            return (
              <line
                key={`line-${n.id}`}
                x1={cx} y1={cy}
                x2={pos.x} y2={pos.y}
                stroke={`${CATEGORY_COLORS[n.category]}20`}
                strokeWidth="1"
              />
            );
          })}

          {/* Orbit nodes */}
          {NODES.map(n => {
            const pos = getPos(n);
            const color = CATEGORY_COLORS[n.category];
            const isHov = hovered === n.id;
            const r = isHov ? 16 : 11;
            return (
              <g
                key={n.id}
                onMouseEnter={(e) => {
                  setHovered(n.id);
                  const svg = (e.currentTarget as SVGGElement).closest('svg')!;
                  const rect = svg.getBoundingClientRect();
                  const scale = rect.width / 600;
                  setTooltip({
                    x: pos.x * scale,
                    y: pos.y * scale,
                    node: { ...n, angle: angles[n.id] },
                  });
                }}
                onMouseLeave={() => { setHovered(null); setTooltip({ x: 0, y: 0, node: null }); }}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow */}
                {isHov && (
                  <circle cx={pos.x} cy={pos.y} r={r + 10} fill={`${color}22`} />
                )}
                {/* Node circle */}
                <circle
                  cx={pos.x} cy={pos.y} r={r}
                  fill={`${color}20`}
                  stroke={color}
                  strokeWidth={isHov ? 2.5 : 1.5}
                />
                {/* Proficiency arc */}
                {isHov && (() => {
                  const pct = n.level / 100;
                  const circumference = 2 * Math.PI * (r + 8);
                  return (
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={r + 8}
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeDasharray={`${circumference * pct} ${circumference}`}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${pos.x} ${pos.y})`}
                      style={{ transition: 'all 0.3s' }}
                    />
                  );
                })()}
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + r + 14}
                  textAnchor="middle"
                  fill={isHov ? color : '#A0A0B8'}
                  fontSize={isHov ? '11' : '9'}
                  fontFamily="Inter, sans-serif"
                  fontWeight={isHov ? '700' : '500'}
                >
                  {n.label}
                </text>
              </g>
            );
          })}

          {/* Center node */}
          <g>
            <circle cx={cx} cy={cy} r={42} fill="rgba(108,99,255,0.15)" stroke="#6C63FF" strokeWidth="2" />
            <circle cx={cx} cy={cy} r={34}
              fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="3 5"
              style={{ animation: 'spin 20s linear infinite', transformOrigin: `${cx}px ${cy}px` }}
            />
            <text x={cx} y={cy - 6} textAnchor="middle" fill="#F8F7FF"
              fontSize="13" fontFamily="Nunito, sans-serif" fontWeight="800">
              Thamem
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#FF6B6B"
              fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              &lt;wizard/&gt;
            </text>
          </g>
        </svg>

        {/* Tooltip */}
        {tooltip.node && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute pointer-events-none z-20 px-3 py-2 rounded-xl text-xs font-bold"
            style={{
              left: tooltip.x,
              top: tooltip.y - 60,
              transform: 'translateX(-50%)',
              background: '#1E1B2E',
              border: `1px solid ${CATEGORY_COLORS[tooltip.node.category]}60`,
              color: '#F8F7FF',
              whiteSpace: 'nowrap',
              boxShadow: `0 8px 30px ${CATEGORY_COLORS[tooltip.node.category]}30`,
            }}
          >
            <div style={{ color: CATEGORY_COLORS[tooltip.node.category] }}>{tooltip.node.label}</div>
            <div style={{ color: '#A0A0B8', marginTop: 2 }}>Proficiency: {tooltip.node.level}%</div>
            <div style={{ color: '#A0A0B8', textTransform: 'capitalize' }}>Category: {tooltip.node.category}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SkillConstellation;
