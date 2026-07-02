import React from 'react';

type DividerVariant = 'wave' | 'splat' | 'brush' | 'zigzag' | 'ribbon';

interface SectionDividerProps {
  variant?: DividerVariant;
  color?: string;
  flip?: boolean;
}

const dividers: Record<DividerVariant, (color: string) => JSX.Element> = {
  wave: (color) => (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,40 C240,90 480,-10 720,40 C960,90 1200,-10 1440,40 L1440,80 L0,80 Z"
        fill={color}
        fillOpacity="0.12"
      />
      <path
        d="M0,55 C200,20 400,80 600,50 C800,20 1100,70 1440,45"
        stroke={color}
        strokeWidth="2.5"
        strokeOpacity="0.35"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
  splat: (color) => (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,45 C100,10 200,80 350,40 C500,0 550,70 700,45 C850,20 950,75 1100,38 C1250,0 1380,65 1440,45 L1440,90 L0,90 Z"
        fill={color}
        fillOpacity="0.10"
      />
      <path
        d="M0,45 C100,10 200,80 350,40 C500,0 550,70 700,45 C850,20 950,75 1100,38 C1250,0 1380,65 1440,45"
        stroke={color}
        strokeWidth="3"
        strokeOpacity="0.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
  brush: (color) => (
    <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,35 Q180,5 360,35 Q540,65 720,35 Q900,5 1080,35 Q1260,65 1440,35"
        stroke={color}
        strokeWidth="4"
        strokeOpacity="0.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0,42 Q200,18 400,42 Q600,66 800,42 Q1000,18 1200,42 Q1320,54 1440,42"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
  zigzag: (color) => (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points="0,40 120,15 240,40 360,15 480,40 600,15 720,40 840,15 960,40 1080,15 1200,40 1320,15 1440,40"
        stroke={color}
        strokeWidth="2.5"
        strokeOpacity="0.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ribbon: (color) => (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,20 C160,60 320,0 480,40 C640,80 800,10 960,50 C1120,80 1280,20 1440,55 L1440,80 L0,80 Z"
        fill={color}
        fillOpacity="0.08"
      />
      <path
        d="M0,20 C160,60 320,0 480,40 C640,80 800,10 960,50 C1120,80 1280,20 1440,55"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.45"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  color = '#FF6B6B',
  flip = false,
}) => {
  return (
    <div
      className="section-divider"
      style={{
        transform: flip ? 'scaleX(-1)' : undefined,
        margin: '-1px 0',
        lineHeight: 0,
      }}
      aria-hidden
    >
      {dividers[variant](color)}
    </div>
  );
};

export default SectionDivider;
