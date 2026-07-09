import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILES = [
  { name: 'App.tsx', active: false },
  { name: 'me.tsx', active: true },
  { name: 'projects.ts', active: false },
];

const TREE = [
  { name: 'src', type: 'folder', depth: 0 },
  { name: 'App.tsx', type: 'file', depth: 1 },
  { name: 'me.tsx', type: 'file', depth: 1, active: true },
  { name: 'projects.ts', type: 'file', depth: 1 },
  { name: 'skills.json', type: 'file', depth: 1 },
  { name: 'api', type: 'folder', depth: 0 },
  { name: 'contact.ts', type: 'file', depth: 1 },
];

const CODE_LINES = [
  { n: 1, tokens: [{ t: 'kw', v: 'const ' }, { t: 'plain', v: 'me = {' }] },
  { n: 2, tokens: [{ t: 'plain', v: '  name: ' }, { t: 'str', v: '"Thamem Ansari"' }, { t: 'plain', v: ',' }] },
  { n: 3, tokens: [{ t: 'plain', v: '  role: ' }, { t: 'str', v: '"Full-Stack Dev"' }, { t: 'plain', v: ',' }] },
  { n: 4, tokens: [{ t: 'fn', v: '  skills' }, { t: 'plain', v: ': [' }, { t: 'str', v: '"React"' }, { t: 'plain', v: ',' }] },
  { n: 5, tokens: [{ t: 'plain', v: '    ' }, { t: 'str', v: '"Node"' }, { t: 'plain', v: ', ' }, { t: 'str', v: '"AI"' }, { t: 'plain', v: '],' }] },
  { n: 6, tokens: [{ t: 'plain', v: '  open: ' }, { t: 'kw', v: 'true' }, { t: 'plain', v: ', ' }, { t: 'cmt', v: '// hire me' }] },
  { n: 7, tokens: [{ t: 'plain', v: '};' }] },
  { n: 8, tokens: [] },
  { n: 9, tokens: [{ t: 'kw', v: 'export default ' }, { t: 'plain', v: 'me;' }] },
];

const TokenColor: Record<string, string> = {
  kw: '#EF4444',
  fn: '#0066cc',
  str: '#22863a',
  cmt: '#8a8a9f',
  plain: '#1e1e2e',
};

const FolderIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M1.5 3.5A1 1 0 012.5 2.5h3.086a1 1 0 01.707.293L7 3.5H13.5a1 1 0 011 1v8a1 1 0 01-1 1h-11a1 1 0 01-1-1v-8z" fill="#EF4444" opacity="0.85" />
  </svg>
);

const FileIcon = ({ active }: { active?: boolean }) => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2" y="1" width="10" height="14" rx="1.5" fill={active ? '#EF4444' : '#8a8a9f'} opacity={active ? '0.9' : '0.6'} />
    <path d="M9 1v4h3" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.6" />
  </svg>
);

const lineLengths = CODE_LINES.map(line =>
  line.tokens.reduce((acc, tok) => acc + tok.v.length, 0)
);

const totalCodeLength = lineLengths.reduce((acc, len) => acc + len, 0);

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  // Typewriter effect for code lines (character-by-character)
  useEffect(() => {
    if (!isVisible) return;
    setCharIndex(0);
    let current = 0;
    const interval = setInterval(() => {
      // Simulate natural typing rhythm by adding slight variations
      current += 1 + Math.floor(Math.random() * 2);
      if (current >= totalCodeLength) {
        current = totalCodeLength;
        clearInterval(interval);
      }
      setCharIndex(current);
    }, 18);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      localStorage.setItem('hasSeenWelcomePopup', 'true');
    }, 250);
  };

  const handleExplore = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)' }}
            onClick={handleClose}
          />

          {/* IDE Card */}
          <motion.div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: 440,
              borderRadius: 10,
              border: '1px solid rgba(239,68,68,0.15)',
              background: '#ffffff',
              boxShadow: '0 32px 64px rgba(239,68,68,0.08), 0 0 0 0.5px rgba(239,68,68,0.06)',
            }}
            initial={{ scale: 0.88, opacity: 0, y: 16 }}
            animate={{ scale: isClosing ? 0.93 : 1, opacity: isClosing ? 0 : 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            {/* ── Title bar ── */}
            <div
              style={{
                background: '#f5f5f7',
                borderBottom: '1px solid rgba(239,68,68,0.08)',
                padding: '9px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                userSelect: 'none',
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <button
                  onClick={handleClose}
                  style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label="Close"
                />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', display: 'block' }} />
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 2, flex: 1, marginLeft: 6 }}>
                {FILES.map((f) => (
                  <span
                    key={f.name}
                    style={{
                      fontSize: 10,
                      fontFamily: 'JetBrains Mono, DM Mono, monospace',
                      padding: '3px 10px',
                      borderRadius: '4px 4px 0 0',
                      background: f.active ? '#ffffff' : 'transparent',
                      color: f.active ? '#1e1e2e' : '#8a8a9f',
                      borderTop: f.active ? '1px solid #EF4444' : '1px solid transparent',
                      borderLeft: f.active ? '1px solid rgba(239,68,68,0.08)' : 'none',
                      borderRight: f.active ? '1px solid rgba(239,68,68,0.08)' : 'none',
                      cursor: 'default',
                    }}
                  >
                    {f.name}
                  </span>
                ))}
              </div>

              {/* Filename right */}
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#8a8a9f' }}>
                portfolio/
              </span>
            </div>

            {/* ── Body: sidebar + editor ── */}
            <div style={{ display: 'flex', minHeight: 210 }}>

              {/* Sidebar */}
              <div
                style={{
                  width: 140,
                  background: '#fafafa',
                  borderRight: '1px solid rgba(239,68,68,0.08)',
                  padding: '10px 0',
                  flexShrink: 0,
                }}
              >
                <p style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#8a8a9f', padding: '0 10px', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Explorer
                </p>
                {TREE.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: `3px ${item.depth === 1 ? 22 : 10}px`,
                      background: item.active ? 'rgba(239,68,68,0.08)' : 'transparent',
                      borderLeft: item.active ? '2px solid #EF4444' : '2px solid transparent',
                      cursor: 'default',
                    }}
                  >
                    {item.type === 'folder' ? <FolderIcon /> : <FileIcon active={item.active} />}
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: item.active ? '#EF4444' : item.type === 'folder' ? '#5c5c70' : '#8a8a9f',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Editor pane */}
              <div style={{ flex: 1, padding: '12px 10px 12px 0', overflowX: 'hidden', background: '#ffffff' }}>
                {(() => {
                  let startPos = 0;
                  return CODE_LINES.map((line, idx) => {
                    const lineLen = lineLengths[idx];
                    const currentLineStart = startPos;
                    startPos += lineLen;

                    // Compute visible chars for this line
                    const charsToShow = Math.max(0, Math.min(lineLen, charIndex - currentLineStart));
                    if (charsToShow === 0 && idx > 0 && charIndex < currentLineStart) return null;

                    // Determine if the blinking cursor should display on this line
                    const isCursorLine = 
                      (charIndex >= currentLineStart && charIndex < currentLineStart + lineLen) ||
                      (charIndex === totalCodeLength && idx === CODE_LINES.length - 1);

                    // Helper to slice tokens to fit charsToShow limit
                    let renderedCount = 0;
                    const renderedTokens = line.tokens.map((tok, ti) => {
                      if (renderedCount >= charsToShow) return null;
                      const sliceLen = charsToShow - renderedCount;
                      const text = tok.v.slice(0, sliceLen);
                      renderedCount += tok.v.length;
                      return (
                        <span key={ti} style={{ color: TokenColor[tok.t] ?? '#1e1e2e' }}>
                          {text}
                        </span>
                      );
                    });

                    return (
                      <div
                        key={line.n}
                        style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1.75 }}
                      >
                        <span
                          style={{
                            width: 28,
                            textAlign: 'right',
                            paddingRight: 12,
                            fontSize: 10,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: '#a0a0b0',
                            flexShrink: 0,
                            userSelect: 'none',
                          }}
                        >
                          {line.n}
                        </span>
                        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#1e1e2e' }}>
                          {renderedTokens}
                          {isCursorLine && (
                            <span
                              style={{
                                width: 6,
                                height: 13,
                                background: '#EF4444',
                                display: 'inline-block',
                                animation: 'blink 1s step-end infinite',
                                verticalAlign: 'text-bottom',
                                marginLeft: 1,
                              }}
                            />
                          )}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* ── Status bar ── */}
            <div
              style={{
                borderTop: '1px solid rgba(239,68,68,0.08)',
                background: '#EF4444',
                padding: '4px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#fff', opacity: 0.9 }}>
                ⎇ main
              </span>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#fff', opacity: 0.8 }}>
                TypeScript
              </span>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#fff', opacity: 0.8 }}>
                UTF-8
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#fff', opacity: 0.85 }}>
                ✓ 0 errors · 0 warnings
              </span>
            </div>

            {/* ── CTA footer ── */}
            <div
              style={{
                background: '#f5f5f7',
                borderTop: '1px solid rgba(239,68,68,0.08)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#1e1e2e', fontFamily: 'JetBrains Mono, monospace', marginBottom: 2 }}>
                  Thamem Ansari
                </p>
                <p style={{ fontSize: 10, color: '#5c5c70', fontFamily: 'JetBrains Mono, monospace' }}>
                  Full-Stack · AI Builder · Tamil Coder
                </p>
              </div>

              <motion.button
                onClick={handleExplore}
                style={{
                  padding: '7px 16px',
                  background: '#EF4444',
                  border: 'none',
                  borderRadius: 6,
                  color: '#fff',
                  fontSize: 11,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  flexShrink: 0,
                }}
                whileHover={{ scale: 1.04, background: '#DC2626' }}
                whileTap={{ scale: 0.96 }}
              >
                Run → explore()
              </motion.button>
            </div>

            {/* Ctrl+K hint */}
            <div
              style={{
                background: '#f5f5f7',
                borderTop: '1px solid rgba(239,68,68,0.05)',
                padding: '6px 14px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#8a8a9f' }}>
                Press <span style={{ color: '#EF4444' }}>Ctrl+K</span> for a developer secret 👀
              </p>
            </div>
          </motion.div>

          {/* Blink keyframes */}
          <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;