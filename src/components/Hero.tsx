import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { IconWrapper } from '../utils/IconUtils';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'Frontend Developer';
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setText(fullText.substring(0, currentIndex + 1));
      currentIndex++;
      
      if (currentIndex === fullText.length) {
        clearInterval(intervalId);
      }
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-secondary mb-4">Hi, my name is</p>
          <h1 className="text-4xl md:text-6xl font-bold text-lightest mb-2">Thamem Ansari</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-light mb-6">
            I'm a <span className="text-secondary">{text}</span>
            <span className="animate-blink">|</span>
          </h2>
          <p className="text-lg mb-8">
            I build modern, responsive web applications with a focus on user experience and performance.
            Currently specializing in React and TypeScript development.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="projects" 
              smooth={true} 
              duration={500} 
              className="cursor-pointer"
            >
              <button className="btn-primary">View My Work</button>
            </Link>
            <Link 
              to="contact" 
              smooth={true} 
              duration={500}
              className="cursor-pointer"
            >
              <button className="btn-outline">Contact Me</button>
            </Link>
          </div>
          
          <div className="mt-12 flex space-x-6">
            <a href="https://github.com/ThamemAnsu" target="_blank" rel="noopener noreferrer" className="text-light hover:text-secondary transition-colors">
              {IconWrapper(FaGithub, { size: 24 })}
            </a>
            <a href="https://linkedin.com/in/thamemansu" target="_blank" rel="noopener noreferrer" className="text-light hover:text-secondary transition-colors">
              {IconWrapper(FaLinkedin, { size: 24 })}
            </a>
            <a href="https://twitter.com/thamemansu" target="_blank" rel="noopener noreferrer" className="text-light hover:text-secondary transition-colors">
              {IconWrapper(FaTwitter, { size: 24 })}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;