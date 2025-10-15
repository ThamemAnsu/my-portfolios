import React, { useEffect, memo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarNav from './components/Navbar';
import MobileNav from './components/MobileNav';
import SpaceBackground from './components/SpaceBackground';
import SpaceForeground from './components/SpaceForeground'; // Add this import

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const AdminPanel = lazy(() => import('./components/adminpanel'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
    <div className="spinner"></div>
  </div>
);

// Memoized main content to prevent unnecessary re-renders
const MainContent = memo(() => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="App relative">
      {/* Space Background - Behind everything (z-0) */}
      <SpaceBackground />
      
      {/* Navigation - Middle layer (z-10) */}
      <div className="relative z-10">
        <SidebarNav />
        <MobileNav />
      </div>
      
      {/* Main content - Middle layer (z-10) */}
      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </Suspense>
      </div>

      {/* Space Foreground - In front of everything (z-40) */}
      <SpaceForeground />
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