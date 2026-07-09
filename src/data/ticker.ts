// src/data/ticker.ts
// ─── Edit this to update the live "Currently Building" ticker ───
export interface TickerItem {
  emoji: string;
  label: string;
  value: string;
}

export const tickerItems: TickerItem[] = [
  { emoji: '⚡', label: 'Building',       value: 'McKinsey SCORM Scraper' },
  { emoji: '☕', label: 'Stack',          value: 'React + Supabase + Zoho' },
  { emoji: '🎤', label: 'Experimenting', value: 'Tamil Voice TTS' },
  { emoji: '🤖', label: 'Learning',       value: 'LangChain Agents + RAG' },
  { emoji: '🚀', label: 'Deployed',       value: 'Enterprise SSO Platform' },
  { emoji: '🎨', label: 'Designing',      value: 'Portfolio Art Theme v2' },
  { emoji: '🔥', label: 'Open to',        value: 'Full-Stack / AI Roles' },
];
