import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SpaceBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Different parallax speeds for depth
  const rocket1Y = useTransform(smoothProgress, [0, 1], [0, -800]);
  const rocket2Y = useTransform(smoothProgress, [0, 1], [0, -600]);
  const satellite1Y = useTransform(smoothProgress, [0, 1], [0, -1000]);
  const satellite2Y = useTransform(smoothProgress, [0, 1], [0, -400]);
  const ufo1Y = useTransform(smoothProgress, [0, 1], [0, -700]);
  const ufo2Y = useTransform(smoothProgress, [0, 1], [0, -500]);
  const planet1Y = useTransform(smoothProgress, [0, 1], [0, -300]);
  const planet2Y = useTransform(smoothProgress, [0, 1], [0, -200]);
  const planet3Y = useTransform(smoothProgress, [0, 1], [0, -450]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Rocket 1 - Top Right */}
      <motion.div
        className="absolute top-[10%] right-[15%]"
        style={{ y: rocket1Y }}
        initial={{ opacity: 0, x: 100, rotate: -45 }}
        animate={{ opacity: 1, x: 0, rotate: -45 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [-45, -50, -45],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
            {/* Rocket body */}
            <path d="M50 20 L60 60 L50 70 L40 60 Z" fill="#2DD4BF" />
            <path d="M50 20 L60 60 L50 55 Z" fill="#14b8a6" opacity="0.7" />
            
            {/* Rocket window */}
            <circle cx="50" cy="40" r="6" fill="#0F172A" />
            <circle cx="50" cy="40" r="4" fill="#8B5CF6" opacity="0.6" />
            
            {/* Fins */}
            <path d="M40 60 L35 70 L40 65 Z" fill="#8B5CF6" />
            <path d="M60 60 L65 70 L60 65 Z" fill="#8B5CF6" />
            
            {/* Flame */}
            <motion.g
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <path d="M45 70 L50 85 L55 70" fill="#FF6B6B" opacity="0.8" />
              <path d="M47 70 L50 80 L53 70" fill="#FFD93D" />
            </motion.g>
          </svg>
          
          {/* Exhaust trail */}
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-[#2DD4BF] to-transparent rounded-full opacity-40 blur-sm"
            animate={{
              height: [40, 60, 40],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Rocket 2 - Bottom Left */}
      <motion.div
        className="absolute bottom-[20%] left-[10%]"
        style={{ y: rocket2Y }}
        initial={{ opacity: 0, x: -100, rotate: 45 }}
        animate={{ opacity: 1, x: 0, rotate: 45 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [45, 50, 45],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <path d="M50 20 L60 60 L50 70 L40 60 Z" fill="#8B5CF6" />
            <path d="M50 20 L60 60 L50 55 Z" fill="#6D28D9" opacity="0.7" />
            <circle cx="50" cy="40" r="6" fill="#0F172A" />
            <circle cx="50" cy="40" r="4" fill="#2DD4BF" opacity="0.6" />
            <path d="M40 60 L35 70 L40 65 Z" fill="#2DD4BF" />
            <path d="M60 60 L65 70 L60 65 Z" fill="#2DD4BF" />
            <motion.g animate={{ opacity: [0.6, 1, 0.6], scale: [0.8, 1, 0.8] }} transition={{ duration: 0.5, repeat: Infinity }}>
              <path d="M45 70 L50 85 L55 70" fill="#FF6B6B" opacity="0.8" />
              <path d="M47 70 L50 80 L53 70" fill="#FFD93D" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Satellite 1 - Top Left */}
      <motion.div
        className="absolute top-[25%] left-[20%]"
        style={{ y: satellite1Y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="70" height="70" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]">
            {/* Solar panels */}
            <rect x="10" y="45" width="25" height="10" fill="#8B5CF6" rx="2" />
            <rect x="65" y="45" width="25" height="10" fill="#8B5CF6" rx="2" />
            <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <rect x="12" y="47" width="21" height="2" fill="#2DD4BF" />
              <rect x="67" y="47" width="21" height="2" fill="#2DD4BF" />
            </motion.g>
            
            {/* Main body */}
            <rect x="38" y="35" width="24" height="30" fill="#1F2937" rx="2" />
            <rect x="40" y="37" width="20" height="26" fill="#374151" rx="2" />
            
            {/* Antenna */}
            <line x1="50" y1="35" x2="50" y2="20" stroke="#2DD4BF" strokeWidth="2" />
            <circle cx="50" cy="20" r="3" fill="#2DD4BF" />
            <motion.circle 
              cx="50" 
              cy="20" 
              r="5" 
              fill="none" 
              stroke="#2DD4BF" 
              strokeWidth="1"
              animate={{ r: [5, 8, 5], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Details */}
            <circle cx="50" cy="50" r="6" fill="#8B5CF6" opacity="0.6" />
            <rect x="42" y="56" width="16" height="2" fill="#2DD4BF" opacity="0.8" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Satellite 2 - Middle Right */}
      <motion.div
        className="absolute top-[60%] right-[25%]"
        style={{ y: satellite2Y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            <rect x="10" y="45" width="25" height="10" fill="#2DD4BF" rx="2" />
            <rect x="65" y="45" width="25" height="10" fill="#2DD4BF" rx="2" />
            <rect x="38" y="35" width="24" height="30" fill="#1F2937" rx="2" />
            <rect x="40" y="37" width="20" height="26" fill="#374151" rx="2" />
            <line x1="50" y1="35" x2="50" y2="20" stroke="#8B5CF6" strokeWidth="2" />
            <circle cx="50" cy="20" r="3" fill="#8B5CF6" />
            <circle cx="50" cy="50" r="6" fill="#2DD4BF" opacity="0.6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* UFO 1 - Top Middle */}
      <motion.div
        className="absolute top-[35%] left-[50%]"
        style={{ y: ufo1Y }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="90" height="90" viewBox="0 0 120 120" className="drop-shadow-[0_0_25px_rgba(45,212,191,0.6)]">
            {/* Light beam */}
            <motion.path
              d="M40 75 L30 110 L70 110 L60 75 Z"
              fill="url(#beamGradient)"
              opacity="0.4"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* UFO base */}
            <ellipse cx="50" cy="75" rx="35" ry="8" fill="#374151" />
            <ellipse cx="50" cy="73" rx="35" ry="8" fill="#8B5CF6" />
            
            {/* UFO dome */}
            <ellipse cx="50" cy="60" rx="20" ry="15" fill="#2DD4BF" opacity="0.3" />
            <ellipse cx="50" cy="58" rx="18" ry="13" fill="#14b8a6" opacity="0.5" />
            
            {/* Windows */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={30 + i * 10}
                cy="73"
                r="3"
                fill="#FFD93D"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
            
            {/* Antenna */}
            <line x1="50" y1="50" x2="50" y2="40" stroke="#2DD4BF" strokeWidth="2" />
            <circle cx="50" cy="40" r="3" fill="#FFD93D">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
      </motion.div>

      {/* UFO 2 - Bottom Right */}
      <motion.div
        className="absolute bottom-[30%] right-[12%]"
        style={{ y: ufo2Y }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="70" height="70" viewBox="0 0 120 120" className="drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            <ellipse cx="50" cy="75" rx="30" ry="7" fill="#374151" />
            <ellipse cx="50" cy="73" rx="30" ry="7" fill="#2DD4BF" />
            <ellipse cx="50" cy="60" rx="18" ry="13" fill="#8B5CF6" opacity="0.4" />
            <ellipse cx="50" cy="58" rx="16" ry="11" fill="#6D28D9" opacity="0.6" />
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={32 + i * 12}
                cy="73"
                r="2.5"
                fill="#FFD93D"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </svg>
        </motion.div>
      </motion.div>

      {/* Planet 1 - Large Saturn-like */}
      <motion.div
        className="absolute top-[15%] left-[5%]"
        style={{ y: planet1Y }}
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            {/* Ring */}
            <ellipse cx="60" cy="60" rx="70" ry="20" fill="none" stroke="#8B5CF6" strokeWidth="3" opacity="0.4" />
            <ellipse cx="60" cy="60" rx="70" ry="20" fill="none" stroke="#2DD4BF" strokeWidth="1" opacity="0.6" />
            
            {/* Planet */}
            <circle cx="60" cy="60" r="30" fill="url(#planetGradient1)" />
            <defs>
              <radialGradient id="planetGradient1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#4C1D95" />
              </radialGradient>
            </defs>
            
            {/* Atmosphere glow */}
            <circle cx="60" cy="60" r="32" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
            
            {/* Surface details */}
            <circle cx="55" cy="55" r="5" fill="#4C1D95" opacity="0.6" />
            <circle cx="70" cy="65" r="4" fill="#4C1D95" opacity="0.4" />
            <circle cx="60" cy="70" r="3" fill="#4C1D95" opacity="0.5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Planet 2 - Earth-like */}
      <motion.div
        className="absolute top-[70%] left-[45%]"
        style={{ y: planet2Y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[0_0_25px_rgba(45,212,191,0.3)]">
            <circle cx="50" cy="50" r="35" fill="url(#planetGradient2)" />
            <defs>
              <radialGradient id="planetGradient2">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0D9488" />
              </radialGradient>
            </defs>
            
            <circle cx="50" cy="50" r="37" fill="none" stroke="#2DD4BF" strokeWidth="2" opacity="0.3" />
            
            {/* Continents */}
            <path d="M30 40 Q35 35 40 40 T50 40" fill="#0D9488" opacity="0.6" />
            <path d="M55 30 Q60 28 65 32 L70 38 Q68 42 65 40" fill="#0D9488" opacity="0.6" />
            <ellipse cx="40" cy="60" rx="12" ry="8" fill="#0D9488" opacity="0.6" />
            
            {/* Clouds */}
            <motion.g
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ellipse cx="35" cy="45" rx="8" ry="4" fill="white" opacity="0.4" />
              <ellipse cx="62" cy="35" rx="6" ry="3" fill="white" opacity="0.4" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Planet 3 - Mars-like */}
      <motion.div
        className="absolute bottom-[15%] right-[8%]"
        style={{ y: planet3Y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(255,107,107,0.3)]">
            <circle cx="50" cy="50" r="30" fill="url(#planetGradient3)" />
            <defs>
              <radialGradient id="planetGradient3">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="50%" stopColor="#EE5A5A" />
                <stop offset="100%" stopColor="#DC3545" />
              </radialGradient>
            </defs>
            
            <circle cx="50" cy="50" r="32" fill="none" stroke="#FF6B6B" strokeWidth="2" opacity="0.3" />
            
            {/* Craters */}
            <circle cx="45" cy="45" r="4" fill="#DC3545" opacity="0.6" />
            <circle cx="60" cy="50" r="6" fill="#DC3545" opacity="0.5" />
            <circle cx="52" cy="62" r="3" fill="#DC3545" opacity="0.7" />
            <circle cx="38" cy="58" r="2" fill="#DC3545" opacity="0.6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          initial={{ opacity: 0, x: -100, y: -100 }}
          animate={{ 
            opacity: [0, 1, 0],
            x: [0, 200],
            y: [0, 200],
          }}
          transition={{ 
            duration: 2,
            delay: i * 5 + 2,
            repeat: Infinity,
            repeatDelay: 10,
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full" />
          <motion.div
            className="absolute top-0 left-0 w-20 h-0.5 bg-gradient-to-r from-white to-transparent origin-left"
            style={{ rotate: 45 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SpaceBackground;