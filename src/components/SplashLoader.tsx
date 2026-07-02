import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashLoaderProps {
  onComplete: () => void;
}

/**
 * Layout 1 — "Boot Sequence"
 * A dark terminal window that boots, runs a short whoami / git clone / npm build
 * narrative, then exits. Identity is revealed *through* the commands rather than
 * a separate name block — the terminal output IS the bio.
 */

// ---- tunable timeline (ms) -------------------------------------------------
const T = {
  frameIn: 0,
  whoami: 300,
  whoamiOut: 700,
  clone: 1000,
  cloneOut1: 1750,
  cloneOut2: 2050,
  cloneOut3: 2350,
  buildCmd: 2700,
  progressStart: 3100,
};

// ---- typewriter primitive ---------------------------------------------------
const TypedText: React.FC<{
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
  style?: React.CSSProperties;
}> = ({ text, speed = 22, startDelay = 0, onDone, className, style }) => {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span className={className} style={style}>
      {text.slice(0, shown)}
    </span>
  );
};

const FadeLine: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay,
  children,
  style,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -4 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay / 1000, duration: 0.25 }}
    style={style}
  >
    {children}
  </motion.div>
);

const SplashLoaderTerminal: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const startTimer = setTimeout(() => {
      let p = 0;
      interval = setInterval(() => {
        p += Math.random() * 16 + 5;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              setExiting(true);
              setTimeout(onComplete, 650);
            }, 550);
          }, 250);
        } else {
          setProgress(Math.round(p));
        }
      }, 90);
    }, T.progressStart);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  const blocks = 24;
  const filled = Math.round((progress / 100) * blocks);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ 
            background: 'rgba(255, 255, 255, 0.65)', 
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            overflow: 'hidden' 
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(239,68,68,0.06) 0%, transparent 70%)',
            }}
          />
          {/* grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #EF4444 1px, transparent 1px), linear-gradient(to bottom, #EF4444 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* floating 0/1 glyphs */}
          {['0', '1', '0', '1', '0', '1'].map((g, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: 'rgba(239,68,68,0.08)',
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 3) * 22}%`,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            >
              {g}
            </motion.span>
          ))}

          {/* terminal window */}
          <motion.div
            className="relative z-10 rounded-xl overflow-hidden"
            style={{
              width: 420,
              maxWidth: '88vw',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(239,68,68,0.15)',
              boxShadow: '0 24px 60px rgba(239,68,68,0.08), 0 0 0 1px rgba(239,68,68,0.06)',
            }}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* title bar */}
            <div
              className="flex items-center gap-2 px-3 py-2.5"
              style={{ background: 'rgba(245, 245, 247, 0.85)', borderBottom: '1px solid rgba(239,68,68,0.08)' }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
              <div className="flex-1 flex items-center justify-center gap-1.5">
                <span
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #EF4444, #ff7c7c)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 900,
                    fontSize: 9,
                    color: '#ffffff',
                  }}
                >
                  T
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8a8f9c' }}>
                  thamem@everest: ~
                </span>
              </div>
            </div>

            {/* body */}
            <div className="px-4 py-4" style={{ background: 'transparent', fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, lineHeight: 1.9, minHeight: 200 }}>
              <div style={{ color: '#1e1e2e' }}>
                <span style={{ color: '#EF4444' }}>➜</span> <TypedText text="whoami" startDelay={T.whoami} style={{ color: '#1e1e2e' }} />
              </div>
              <FadeLine delay={T.whoamiOut} style={{ color: '#8a8f9c', paddingLeft: 2 }}>
                thamem-ansari <span style={{ color: '#8a8f9c' }}>— full-stack · ai · builder</span>
              </FadeLine>

              <div style={{ color: '#1e1e2e', marginTop: 4 }}>
                <span style={{ color: '#EF4444' }}>➜</span>{' '}
                <TypedText text="git clone teameverest/portfolio" speed={16} startDelay={T.clone} style={{ color: '#1e1e2e' }} />
              </div>
              <FadeLine delay={T.cloneOut1} style={{ color: '#8a8f9c' }}>
                Cloning into 'portfolio'...
              </FadeLine>
              <FadeLine delay={T.cloneOut2} style={{ color: '#8a8f9c' }}>
                remote: enumerating objects: 142, done.
              </FadeLine>
              <FadeLine delay={T.cloneOut3} style={{ color: '#22863a' }}>
                ✓ repository ready
              </FadeLine>

              <div style={{ color: '#1e1e2e', marginTop: 4 }}>
                <span style={{ color: '#EF4444' }}>➜</span>{' '}
                <TypedText text="npm run build" speed={20} startDelay={T.buildCmd} style={{ color: '#1e1e2e' }} />
                {!done && progress === 0 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    style={{ color: '#EF4444' }}
                  >
                    ▍
                  </motion.span>
                )}
              </div>

              {/* progress */}
              {progress > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 6 }}>
                  <span style={{ color: '#8a8f9c' }}>
                    [
                    <span style={{ color: '#EF4444' }}>{'█'.repeat(filled)}</span>
                    <span style={{ color: '#f0f0f5' }}>{'░'.repeat(blocks - filled)}</span>
                    ] {progress}%
                  </span>
                </motion.div>
              )}

              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#22863a', marginTop: 6 }}
                >
                  ✓ build complete <span style={{ color: '#8a8f9c' }}>· starting session</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    style={{ color: '#22863a', marginLeft: 4 }}
                  >
                    ▍
                  </motion.span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoaderTerminal;