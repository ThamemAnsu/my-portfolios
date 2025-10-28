// import React, { useEffect, memo, lazy, Suspense } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SidebarNav from './components/Navbar';
// import MobileNav from './components/MobileNav';
// import SpaceBackground from './components/SpaceBackground';
// import SpaceForeground from './components/SpaceForeground'; // Add this import

// // Lazy load components for better performance
// const Hero = lazy(() => import('./components/Hero'));
// const About = lazy(() => import('./components/About'));
// const Skills = lazy(() => import('./components/Skills'));
// const Projects = lazy(() => import('./components/Projects'));
// const Experience = lazy(() => import('./components/Experience'));
// const Contact = lazy(() => import('./components/Contact'));
// const Footer = lazy(() => import('./components/Footer'));
// const AdminPanel = lazy(() => import('./components/adminpanel'));

// // Loading component
// const LoadingSpinner = () => (
//   <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
//     <div className="spinner"></div>
//   </div>
// );

// // Memoized main content to prevent unnecessary re-renders
// const MainContent = memo(() => {
//   useEffect(() => {
//     // Scroll to top on mount
//     window.scrollTo(0, 0);
//   }, []);
  
//   return (
//     <div className="App relative">
//       {/* Space Background - Behind everything (z-0) */}
//       <SpaceBackground />
      
//       {/* Navigation - Middle layer (z-10) */}
//       <div className="relative z-10">
//         <SidebarNav />
//         <MobileNav />
//       </div>
      
//       {/* Main content - Middle layer (z-10) */}
//       <div className="relative z-10">
//         <Suspense fallback={<LoadingSpinner />}>
//           <Hero />
//           <About />
//           <Skills />
//           <Projects />
//           <Experience />
//           <Contact />
//           <Footer />
//         </Suspense>
//       </div>

//       {/* Space Foreground - In front of everything (z-40) */}
//       <SpaceForeground />
//     </div>
//   );
// });

// MainContent.displayName = 'MainContent';

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<MainContent />} />
//         <Route 
//           path="/admin/*" 
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               <AdminPanel />
//             </Suspense>
//           } 
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React, { useEffect, memo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarNav from './components/Navbar';
import MobileNav from './components/MobileNav';
import SpaceBackground from './components/SpaceBackground';
import SpaceForeground from './components/SpaceForeground';
import ResumeViewer from './components/ResumeViewer';
import WelcomePopup from './components/WelcomePopup';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
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
    <div className="App relative min-h-screen">
      {/* Space Background - Behind everything (z-0) */}
      <SpaceBackground />
      
      {/* Main content - Middle layer (z-10) */}
      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
          <Footer />
        </Suspense>
      </div>

      {/* Space Foreground - In front of content (z-40) */}
      <SpaceForeground />

      {/* Navigation - Top layer (z-50+) - Must be last to be on top */}
      <div className="relative z-50">
        <SidebarNav />
        <MobileNav />
      </div>

      {/* Resume Viewer - Floating button (z-50) */}
      <ResumeViewer resumeUrl='https://tscpiiiregsqkvztjxba.supabase.co/storage/v1/object/sign/resumes/Thamem_M_(October_2025).pdf.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iMTZkYjYxMi03ZDlmLTQ0YmUtOTM4Ny0yNjU5OTJjNjkzMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWVzL1RoYW1lbV9NXyhPY3RvYmVyXzIwMjUpLnBkZi5wZGYiLCJpYXQiOjE3NjE2MzIzNDYsImV4cCI6MTkxOTMxMjM0Nn0.es9n1smBIZrk9OVMpCYJgjE6uCJ6p7xThs-zwM4pRxA' />

      {/* Welcome Popup - Highest layer (z-200) */}
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