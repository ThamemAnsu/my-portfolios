import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('hasSeenWelcomePopup', 'true');
    }, 200);
  };

  const handleExplore = () => {
    handleClose();
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      {/* Simple backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Compact popup */}
      <div className={`relative bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>

        {/* Content */}
        <div className="text-center pt-2">
          {/* Simple emoji */}
          <div className="text-4xl mb-3">👋</div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-2">
            Welcome!
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-5">
            Hi, I'm <span className="text-teal-400 font-medium">Thamem Ansari</span>. 
            Thanks for visiting my portfolio.
          </p>

          {/* Single button */}
          <button
            onClick={handleExplore}
            className="w-full px-4 py-2.5 bg-teal-400 hover:bg-teal-500 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
          >
            Explore
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-fadeOut { animation: fadeOut 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
        .animate-scaleOut { animation: scaleOut 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default WelcomePopup;