import React from 'react';
import { tickerItems } from '../data/ticker';

const LiveTicker: React.FC = () => {
  // Duplicate items so the marquee loops seamlessly
  const items = [...tickerItems, ...tickerItems];

  return (
    <div
      className="ticker-wrap relative w-full py-3 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #1A1730, #1E1B2E, #1A1730)',
        borderTop: '1px solid rgba(255,107,107,0.15)',
        borderBottom: '1px solid rgba(108,99,255,0.15)',
      }}
      aria-label="Currently building — live update ticker"
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #13111C, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #13111C, transparent)' }}
      />

      <div className="ticker-content flex items-center gap-0">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <span
              className="inline-flex items-center gap-2 px-6 whitespace-nowrap"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}
            >
              <span className="text-base">{item.emoji}</span>
              <span style={{ color: '#A0A0B8', fontWeight: 600 }}>{item.label}:</span>
              <span style={{ color: '#F8F7FF', fontWeight: 700 }}>{item.value}</span>
            </span>
            {/* Separator dot */}
            <span style={{ color: 'rgba(108,99,255,0.6)', fontSize: '0.7rem' }}>◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;
