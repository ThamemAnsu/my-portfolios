import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import { IconWrapper } from '../utils/IconUtils';
import { useProfile } from '../hooks/useSupabase';

const ROLES = [
  'Frontend Developer',
  'AI Specialist',
  'Full Stack Engineer',
  'React Developer'
];

const Hero: React.FC = () => {
  const { profile, loading } = useProfile();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % ROLES.length;
      const fullText = ROLES[current];
      
      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        
        if (text.length === fullText.length) {
          setTypingSpeed(2000);
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(50);
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

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="spinner"></div>
      </section>
    );
  }
  
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-[#0F172A]">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#2DD4BF]/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 2 + 0.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="max-w-4xl">
          {/* Intro Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <span className="px-5 py-2.5 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-full text-sm font-mono tracking-wider border border-[#2DD4BF]/30 font-semibold">
              {profile?.intro_text || 'Hi, my name is'}
            </span>
          </motion.div>
          
          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight"
          >
            {profile?.name || 'Thamem Ansari'}
          </motion.h1>
          
          {/* Underline */}
          <motion.div 
            className="h-1.5 bg-[#2DD4BF] rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: '140px' }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
          
          {/* Typing Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#9CA3AF]">I'm a</span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2DD4BF] relative inline-flex items-baseline">
                {text}
                <span className="ml-1 w-0.5 h-8 md:h-10 bg-[#2DD4BF] animate-pulse"></span>
              </span>
            </div>
          </motion.div>
          
          {/* Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-lg md:text-xl text-[#D1D5DB] leading-relaxed">
              {profile?.bio || 'I build modern, responsive web applications with a focus on user experience and performance.'}
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="btn btn-primary px-8 py-4 text-[#111827] font-bold rounded-xl hover:shadow-xl hover:shadow-[#2DD4BF]/30 transition-all hover:-translate-y-1 inline-flex items-center"
            >
              <span>View My Work</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn btn-secondary px-8 py-4 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 border border-[#374151] hover:border-[#2DD4BF]/50"
            >
              Contact Me
            </button>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex space-x-4"
          >
            {profile?.github_url && (
              <motion.a 
                href={profile.github_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-xl bg-[#1F2937] flex items-center justify-center text-[#D1D5DB] hover:text-white hover:bg-[#2DD4BF] transition-all duration-200 border border-[#374151] hover:border-[#2DD4BF] shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {IconWrapper(FaGithub, { size: 20 })}
              </motion.a>
            )}
            {profile?.linkedin_url && (
              <motion.a 
                href={profile.linkedin_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-xl bg-[#1F2937] flex items-center justify-center text-[#D1D5DB] hover:text-white hover:bg-[#2DD4BF] transition-all duration-200 border border-[#374151] hover:border-[#2DD4BF] shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {IconWrapper(FaLinkedin, { size: 20 })}
              </motion.a>
            )}
            {profile?.twitter_url && (
              <motion.a 
                href={profile.twitter_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-xl bg-[#1F2937] flex items-center justify-center text-[#D1D5DB] hover:text-white hover:bg-[#2DD4BF] transition-all duration-200 border border-[#374151] hover:border-[#2DD4BF] shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {IconWrapper(FaTwitter, { size: 20 })}
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[#9CA3AF] font-mono text-sm mb-3 font-medium">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1F2937] text-[#2DD4BF] border border-[#374151] shadow-lg hover:bg-[#374151] transition-colors"
        >
          <FaArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;