import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  delay: number;
}

interface Asteroid {
  id: number;
  size: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
  rotation: number;
}

const SpaceForeground: React.FC = () => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

  // Generate shooting stars periodically
  useEffect(() => {
    const generateShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100,
        startY: Math.random() * 50, // Start from top half
        angle: 45 + Math.random() * 30, // Angle between 45-75 degrees
        duration: 1 + Math.random() * 1.5,
        delay: 0
      };

      setShootingStars(prev => [...prev, newStar]);

      // Remove after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, (newStar.duration + newStar.delay) * 1000);
    };

    // Generate shooting stars every 3-8 seconds
    const interval = setInterval(() => {
      generateShootingStar();
    }, 3000 + Math.random() * 5000);

    // Generate initial shooting star
    generateShootingStar();

    return () => clearInterval(interval);
  }, []);

  // Generate asteroids periodically
  useEffect(() => {
    const generateAsteroid = () => {
      const size = 20 + Math.random() * 40;
      const newAsteroid: Asteroid = {
        id: Date.now() + Math.random(),
        size,
        startX: Math.random() > 0.5 ? -10 : 110, // Start from left or right
        startY: Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: 0,
        rotation: Math.random() * 360
      };

      setAsteroids(prev => [...prev, newAsteroid]);

      // Remove after animation completes
      setTimeout(() => {
        setAsteroids(prev => prev.filter(ast => ast.id !== newAsteroid.id));
      }, (newAsteroid.duration + newAsteroid.delay) * 1000);
    };

    // Generate asteroids every 8-15 seconds
    const interval = setInterval(() => {
      generateAsteroid();
    }, 8000 + Math.random() * 7000);

    // Generate initial asteroids
    generateAsteroid();
    setTimeout(() => generateAsteroid(), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Shooting Stars */}
      <AnimatePresence>
        {shootingStars.map((star) => {
          const endX = star.startX + Math.cos(star.angle * Math.PI / 180) * 150;
          const endY = star.startY + Math.sin(star.angle * Math.PI / 180) * 150;

          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.8],
                x: `${endX - star.startX}vw`,
                y: `${endY - star.startY}vh`,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                ease: "easeOut"
              }}
            >
              {/* Main shooting star body */}
              <div className="relative">
                {/* Core */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-white"
                  style={{
                    boxShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(139,92,246,0.8)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(139,92,246,0.8)',
                      '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(139,92,246,1)',
                      '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(139,92,246,0.8)',
                    ]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                
                {/* Trail */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full"
                  style={{
                    width: '80px',
                    background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(139,92,246,0.6), rgba(45,212,191,0.3), transparent)',
                    transform: `rotate(${-star.angle}deg)`,
                    transformOrigin: 'left center',
                  }}
                />
                
                {/* Sparkles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white"
                    style={{
                      left: `-${i * 15}px`,
                      top: '50%',
                      transform: `translateY(-50%) rotate(${-star.angle}deg)`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Asteroids */}
      <AnimatePresence>
        {asteroids.map((asteroid) => {
          const endX = asteroid.startX < 50 ? 120 : -20;
          const wobbleY = Math.sin(asteroid.rotation) * 20;

          return (
            <motion.div
              key={asteroid.id}
              className="absolute opacity-40"
              style={{
                left: `${asteroid.startX}%`,
                top: `${asteroid.startY}%`,
                width: asteroid.size,
                height: asteroid.size,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.4, 0.4, 0],
                scale: [0.5, 1, 1, 0.8],
                x: `${endX - asteroid.startX}vw`,
                y: [`0vh`, `${wobbleY}vh`, `${wobbleY * 2}vh`],
                rotate: [asteroid.rotation, asteroid.rotation + 360],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: asteroid.duration,
                delay: asteroid.delay,
                ease: "linear"
              }}
            >
              {/* Asteroid body - irregular shape */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              >
                {/* Asteroid shape with craters */}
                <path
                  d="M50,10 L65,20 L75,15 L85,30 L90,50 L80,70 L70,85 L50,90 L30,85 L20,70 L15,50 L20,30 L35,20 Z"
                  fill="#4B5563"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                
                {/* Craters */}
                <circle cx="40" cy="35" r="8" fill="#374151" opacity="0.6" />
                <circle cx="60" cy="50" r="6" fill="#374151" opacity="0.6" />
                <circle cx="45" cy="65" r="5" fill="#374151" opacity="0.6" />
                
                {/* Highlights */}
                <ellipse cx="35" cy="30" rx="4" ry="3" fill="#9CA3AF" opacity="0.4" />
                <ellipse cx="65" cy="45" rx="3" ry="2" fill="#9CA3AF" opacity="0.4" />
                
                {/* Glow effect */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(139,92,246,0.3)"
                  strokeWidth="1"
                  animate={{
                    r: [40, 50, 40],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </svg>

              {/* Trailing dust particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gray-500"
                  style={{
                    left: asteroid.startX < 50 ? '-10px' : 'auto',
                    right: asteroid.startX >= 50 ? '-10px' : 'auto',
                    top: '50%',
                  }}
                  animate={{
                    x: asteroid.startX < 50 ? [-10, -30] : [10, 30],
                    opacity: [0.6, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Floating space dust particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-0.5 h-0.5 rounded-full bg-white opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 50 - 25],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Occasional large meteorite passing by */}
      <motion.div
        className="absolute opacity-50"
        initial={{ x: '-100vw', y: '20vh', opacity: 0 }}
        animate={{
          x: ['0vw', '120vw'],
          y: ['20vh', '80vh'],
          opacity: [0, 0.5, 0.5, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          delay: 5,
          repeat: Infinity,
          repeatDelay: 20,
          ease: "linear",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 100 100">
          {/* Large meteorite */}
          <path
            d="M50,5 L75,25 L85,20 L95,40 L90,60 L75,80 L50,95 L25,80 L10,60 L15,40 L25,20 Z"
            fill="#6B7280"
            stroke="#9CA3AF"
            strokeWidth="3"
          />
          <circle cx="45" cy="40" r="10" fill="#4B5563" opacity="0.7" />
          <circle cx="60" cy="60" r="8" fill="#4B5563" opacity="0.7" />
          
          {/* Flame trail */}
          <motion.path
            d="M 10,50 Q 0,50 -10,55 Q -20,50 -30,45 L -20,50 L -30,55 Q -20,50 -10,48 Q 0,50 10,50 Z"
            fill="url(#fireGradient)"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />
          
          <defs>
            <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFD93D" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Twinkling stars in foreground (subtle) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`star-fg-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default SpaceForeground;