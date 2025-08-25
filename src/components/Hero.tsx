import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { IconWrapper } from '../utils/IconUtils';

// Define roles outside the component to avoid recreation on each render
const ROLES = [
  'Frontend Developer',
  'AI Specialist',
  'Full Stack Engineer',
  'React Developer'
];

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % ROLES.length;
      const fullText = ROLES[current];
      
      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        
        if (text.length === fullText.length) {
          setIsTypingComplete(true);
          setTypingSpeed(2000); // Pause at the end
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(50);
            setIsTypingComplete(false);
          }, 2000);
        }
      } else {
        setText(fullText.substring(0, text.length - 1));
        
        if (text.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(150);
          setLoopNum(loopNum + 1);
        }
      }
    };
    
    typingRef.current = setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      {/* Animated particles (decorative) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 2 + 0.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p 
            variants={itemVariants}
            className="text-teal-400 mb-4 font-mono tracking-wider"
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-2 relative"
          >
            Thamem Ansari
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-teal-400"></span>
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-300 mb-6 h-16 flex items-center"
          >
            I'm a <span className="text-teal-400 ml-3 relative">
              {text}
              <span className={`absolute ml-1 w-0.5 h-7 bg-teal-400 ${isTypingComplete ? 'animate-none opacity-0' : 'animate-blink'}`}></span>
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            I build modern, responsive web applications with a focus on user experience and performance.
            Currently specializing in React, TypeScript, and AI integration for creating intelligent
            and interactive digital experiences.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="projects" 
              smooth={true} 
              duration={500} 
              className="cursor-pointer"
            >
              <button className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-400 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/20 flex items-center">
                <span>View My Work</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
            <Link 
              to="contact" 
              smooth={true} 
              duration={500}
              className="cursor-pointer"
            >
              <button className="px-6 py-3 bg-transparent text-teal-400 font-medium rounded-lg border border-teal-400 hover:bg-teal-400/10 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                Contact Me
              </button>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex space-x-6"
          >
            {[
              { icon: FaGithub, url: "https://github.com/ThamemAnsu" },
              { icon: FaLinkedin, url: "https://linkedin.com/in/thamemansu" },
              { icon: FaTwitter, url: "https://twitter.com/thamemansu" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-300 hover:text-white hover:bg-teal-500 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                {IconWrapper(social.icon, { size: 20 })}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-gray-400 font-mono text-sm mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 text-teal-400"
        >
          <FaArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;