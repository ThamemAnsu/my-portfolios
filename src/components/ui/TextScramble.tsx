import React, { useState, useEffect, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  trigger?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  trigger = false,
  className = '',
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const frameRef = useRef<number | null>(null);
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([]);
  const frameCountRef = useRef(0);

  const scramble = () => {
    let frame = 0;
    const queue = [];
    for (let i = 0; i < text.length; i++) {
      const from = displayText[i] || '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * 15) + 5;
      queue.push({ from, to, start, end });
    }

    queueRef.current = queue;
    frameCountRef.current = frame;

    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = queueRef.current.length; i < n; i++) {
        let { from, to, start, end, char } = queueRef.current[i];
        if (frameCountRef.current >= end) {
          complete++;
          output += to;
        } else if (frameCountRef.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queueRef.current[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete === queueRef.current.length) {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      } else {
        frameCountRef.current++;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (trigger) {
      scramble();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <Component className={className}>
      {displayText}
    </Component>
  );
};
