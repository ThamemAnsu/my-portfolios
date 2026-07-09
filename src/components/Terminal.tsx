import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'prompt' | 'output' | 'comment' | 'error' | 'blank';
  text: string;
}

const COMMANDS: Record<string, TerminalLine[]> = {
  '--help': [
    { type: 'comment', text: '# Thamem CLI v2.4.1 — Available commands:' },
    { type: 'output',  text: '  thamem --version         Show version info' },
    { type: 'output',  text: '  thamem skills --list     List all skills' },
    { type: 'output',  text: '  thamem projects          Show projects' },
    { type: 'output',  text: '  thamem contact           Get contact info' },
    { type: 'output',  text: '  thamem vibes             ✨ secret ✨' },
    { type: 'output',  text: '  clear                    Clear terminal' },
    { type: 'blank',   text: '' },
  ],
  '--version': [
    { type: 'comment', text: '# thamem-ansari@2.4.1' },
    { type: 'output',  text: '  Name:      Thamem Ansari' },
    { type: 'output',  text: '  Role:      Full-Stack Wizard 🧙‍♂️' },
    { type: 'output',  text: '  Location:  India 🇮🇳' },
    { type: 'output',  text: '  Status:    ✅ Open to Work' },
    { type: 'output',  text: '  Uptime:    2+ years of coding' },
    { type: 'blank',   text: '' },
  ],
  'skills --list': [
    { type: 'comment', text: '# Loading skill matrix...' },
    { type: 'output',  text: '  ► [Frontend]   React · Next.js · TypeScript · HTML/CSS' },
    { type: 'output',  text: '  ► [Backend]    Node.js · Express · Flask · PostgreSQL · Supabase' },
    { type: 'output',  text: '  ► [AI / ML]    LangChain · Whisper STT · OCR · RAG' },
    { type: 'output',  text: '  ► [DevOps]     Docker · GitHub Actions · Netlify · Vercel' },
    { type: 'output',  text: '  ► [Design]     Figma · UX · Tailwind · Framer Motion' },
    { type: 'blank',   text: '' },
  ],
  'projects': [
    { type: 'comment', text: '# Recent projects:' },
    { type: 'output',  text: '  01. AI Voice Conversation Agent — 500+ daily calls' },
    { type: 'output',  text: '  02. Enterprise SSO Platform — Authentik + Supabase' },
    { type: 'output',  text: '  03. OCR Document Pipeline — multi-format parsing' },
    { type: 'output',  text: '  04. WhatsApp Business Automation — Turn.io + Meta Flow' },
    { type: 'output',  text: '  05. Interactive Quiz App — React + Supabase + AI' },
    { type: 'blank',   text: '' },
  ],
  'contact': [
    { type: 'comment', text: '# Reach me at:' },
    { type: 'output',  text: '  📧  thamemansari@gmail.com' },
    { type: 'output',  text: '  🔗  linkedin.com/in/thamemansari' },
    { type: 'output',  text: '  🐙  github.com/ThamemAnsu' },
    { type: 'output',  text: '  ☕  Always down for a virtual coffee chat!' },
    { type: 'blank',   text: '' },
  ],
  'vibes': [
    { type: 'comment', text: '# You found the secret command! 🎉' },
    { type: 'output',  text: '  ☕ Fuel: Cold brew + lo-fi beats' },
    { type: 'output',  text: '  🎤 Passion: Tamil Voice AI (making tech speak Tamil)' },
    { type: 'output',  text: '  🎨 Hobby: UI design at 2am' },
    { type: 'output',  text: '  🧠 Superpower: Googling errors faster than anyone' },
    { type: 'output',  text: '  🚀 Dream: Build something 1 million people use' },
    { type: 'blank',   text: '' },
  ],
};

const UNKNOWN = (cmd: string): TerminalLine[] => [
  { type: 'error',  text: `  Command not found: thamem ${cmd}` },
  { type: 'comment',text: '  Type "thamem --help" to see available commands' },
  { type: 'blank',  text: '' },
];

const WELCOME: TerminalLine[] = [
  { type: 'comment', text: '# Welcome to Thamem\'s Terminal 🖥️ — Ctrl+K to toggle' },
  { type: 'output',  text: '  Type "thamem --help" to get started.' },
  { type: 'blank',   text: '' },
];

interface TerminalProps {
  open: boolean;
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ open, onClose }) => {
  const [history, setHistory] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(scrollToBottom, [history, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const promptLine: TerminalLine = { type: 'prompt', text: `thamem ${raw}` };

    let output: TerminalLine[];
    if (raw === 'clear') {
      setHistory(WELCOME);
      setInput('');
      setCmdHistory(prev => [raw, ...prev]);
      setHistIdx(-1);
      return;
    } else if (COMMANDS[raw]) {
      output = COMMANDS[raw];
    } else {
      output = UNKNOWN(raw);
    }

    setHistory(prev => [...prev, promptLine, ...output]);
    setCmdHistory(prev => [raw, ...prev]);
    setHistIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowUp') {
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx] ?? '');
    }
    if (e.key === 'ArrowDown') {
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : cmdHistory[idx]);
    }
  };

  const lineColor: Record<TerminalLine['type'], string> = {
    prompt:  '#FFD93D',
    output:  '#a0e8af',
    comment: '#6b7280',
    error:   '#FF6B6B',
    blank:   'transparent',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="terminal-window"
            initial={{ scale: 0.88, y: 30 }}
            animate={{ scale: 1,    y: 0  }}
            exit={{ scale: 0.88,    y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Title bar */}
            <div className="terminal-titlebar">
              <button
                onClick={onClose}
                className="terminal-dot"
                style={{ background: '#FF5F57', cursor: 'pointer' }}
                title="Close"
              >
                ✕
              </button>
              <div className="terminal-dot" style={{ background: '#FFBD2E' }}>─</div>
              <div className="terminal-dot" style={{ background: '#28C840' }}>+</div>
              <span style={{ marginLeft: 10, color: '#A0A0B8', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                thamem-cli — bash
              </span>
            </div>

            {/* Body */}
            <div className="terminal-body" ref={bodyRef}>
              {history.map((line, i) => (
                <div key={i} className="terminal-line" style={{ color: lineColor[line.type] }}>
                  {line.type === 'prompt' ? (
                    <span>
                      <span style={{ color: '#4ECDC4' }}>❯ </span>
                      <span style={{ color: '#FFD93D' }}>{line.text}</span>
                    </span>
                  ) : (
                    <span style={{ whiteSpace: 'pre' }}>{line.text || '\u00A0'}</span>
                  )}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <span style={{ color: '#4ECDC4', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>❯ thamem</span>
                <input
                  ref={inputRef}
                  className="terminal-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="--help"
                />
              </form>
            </div>

            {/* Footer hint */}
            <div style={{ padding: '8px 20px', borderTop: '1px solid rgba(108,99,255,0.15)', color: '#6b7280', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace' }}>
              Esc or click outside to close · ↑↓ command history
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
