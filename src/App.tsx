import React, { useEffect, memo, lazy, Suspense, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarNav from './components/Navbar';
import MobileNav from './components/MobileNav';
import ArtBackground from './components/ArtBackground';
import ResumeViewer from './components/ResumeViewer';
import WelcomePopup from './components/WelcomePopup';
import LiveTicker from './components/LiveTicker';
import SectionDivider from './components/SectionDivider';
import Terminal from './components/Terminal';
import SplashLoader from './components/SplashLoader';

// Lazy load heavy sections
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const AdminPanel = lazy(() => import('./components/adminpanel'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg-primary)' }}>
    <div className="spinner" />
  </div>
);


const MainContent = memo(() => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Global Ctrl+K listener for Terminal Easter Egg
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setTerminalOpen(prev => !prev);
    }
    if (e.key === 'Escape') {
      setTerminalOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="App relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Splash Loader — shown once on first visit */}
      {!splashDone && <SplashLoader onComplete={() => setSplashDone(true)} />}

      {/* Art Background — doodles, blobs, dot-grid */}
      <ArtBackground />



      {/* Terminal Easter Egg */}
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Navigation */}
      <div className="relative z-50">
        <SidebarNav />
        <MobileNav />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />

          {/* Ticker — between Hero and About */}
          <div className="relative z-10">
            <LiveTicker />
          </div>

          <SectionDivider variant="wave" color="#EF4444" />

          <About />

          <SectionDivider variant="brush" color="#EF4444" flip />

          <Skills />

          <SectionDivider variant="splat" color="#DC2626" />

          <Projects />

          <SectionDivider variant="zigzag" color="#EF4444" flip />

          <Experience />

          <SectionDivider variant="ribbon" color="#EF4444" />

          <Certifications />

          <SectionDivider variant="wave" color="#DC2626" flip />

          <Contact />

          <Footer onTerminalOpen={() => setTerminalOpen(true)} />
        </Suspense>
      </div>

      {/* Resume Viewer */}
      <ResumeViewer resumeUrl='https://redekfpzbqdlhhcsnxpi.supabase.co/storage/v1/object/sign/resumes/Thamem_M_(October_2025).pdf.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iMTZkYjYxMi03ZDlmLTQ0YmUtOTM4Ny0yNjU5OTJjNjkzMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWVzL1RoYW1lbV9NXyhPY3RvYmVyXzIwMjUpLnBkZi5wZGYiLCJpYXQiOjE3NjE2MzIzNDYsImV4cCI6MTkxOTMxMjM0Nn0.es9n1smBIZrk9OVMpCYJgjE6uCJ6p7xThs-zwM4pRxA' />

      {/* Welcome Popup */}
      <WelcomePopup />
    </div>
  );
});

MainContent.displayName = 'MainContent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminPanel />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;