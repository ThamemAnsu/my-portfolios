import React, { useEffect, useRef, useState } from 'react';

interface InkDrawWrapperProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}

/**
 * Wraps children in an SVG border that traces itself when scrolled into view.
 * Uses stroke-dasharray / stroke-dashoffset for the hand-drawn effect.
 */
const InkDrawWrapper: React.FC<InkDrawWrapperProps> = ({
  children,
  className = '',
  color = '#6C63FF',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const updateDims = () => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    };
    updateDims();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setDrawn(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const { w, h } = dims;
  // Total perimeter of the rect
  const perimeter = w && h ? 2 * (w + h) : 2000;
  const r = 16; // border-radius

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* SVG traced border */}
      {w > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none z-10"
          width={w}
          height={h}
          style={{ overflow: 'visible' }}
        >
          <rect
            x="1" y="1"
            width={w - 2}
            height={h - 2}
            rx={r} ry={r}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={perimeter}
            strokeDashoffset={drawn ? 0 : perimeter}
            style={{
              transition: drawn
                ? `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`
                : 'none',
              opacity: 0.7,
            }}
          />
        </svg>
      )}
      {children}
    </div>
  );
};

export default InkDrawWrapper;
