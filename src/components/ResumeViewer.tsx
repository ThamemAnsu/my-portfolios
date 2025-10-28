import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

interface ResumeViewerProps {
  resumeUrl: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ resumeUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 group transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="View Resume"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 rounded-full blur-xl opacity-60 group-hover:opacity-90 animate-pulse"></div>
      
      {/* Button */}
      <div className="relative bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-teal-400/50 transition-all duration-300 hover:scale-110 active:scale-95 sm:hover:rotate-12">
        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
      </div>

      {/* Tooltip - Hidden on mobile, visible on hover for desktop */}
      <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm border border-teal-400/30 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        View Resume
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-900/95"></div>
      </div>

      {/* Mobile label - Shows below button on mobile only */}
      <div className="sm:hidden absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-teal-400/30 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-active:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Resume
      </div>
    </button>
  );
};

export default ResumeViewer;