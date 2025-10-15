import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaCode, FaRocket, FaStar } from 'react-icons/fa';
import { IconWrapper } from '../utils/IconUtils';
import { useProfile } from '../hooks/useSupabase';
import SatelliteCodeDisplay from './SatelliteCodeDisplay';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 md:pt-20">
  
    
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-3xl">
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/50"
              />
              <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold">
                Available for work
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-black text-white mb-4 leading-[1.1]">
    <span className="block">{profile?.intro_text || "Hello, I'm"}</span>
    
    {/* This new span wraps the full name to keep it on its own line */}
    <span className="block">
      <span className="bg-[#2DD4BF] bg-clip-text text-transparent">
        {profile?.name?.split(' ')[0] || 'Thamem'}
      </span>
      {' '} {/* This adds a space between the names */}
      <span className="text-white/90">
        {profile?.name?.split(' ').slice(1).join(' ') || 'Ansari'}
      </span>
    </span>

  </h1>
</motion.div>
            
            {/* Typing Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1F2937] to-[#374151] rounded-2xl border border-[#374151] shadow-xl">
                  <FaCode className="text-[#2DD4BF] text-xl flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {text}
                    <span className="ml-1 inline-block w-0.5 h-6 md:h-7 bg-[#2DD4BF] animate-pulse"></span>
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Bio */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-[#94A3B8] leading-relaxed mb-10"
            >
              {profile?.bio || 'I craft exceptional digital experiences that combine beautiful design with powerful functionality. Let\'s build something amazing together.'}
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-4 rounded-xl border border-[#374151] hover:border-[#2DD4BF]/50 transition-all">
                <div className="text-3xl font-bold text-[#2DD4BF] mb-1">10+</div>
                <div className="text-sm text-[#94A3B8]">Projects</div>
              </div>
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-4 rounded-xl border border-[#374151] hover:border-[#8B5CF6]/50 transition-all">
                <div className="text-3xl font-bold text-[#8B5CF6] mb-1">2+</div>
                <div className="text-sm text-[#94A3B8]">Years</div>
              </div>
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-4 rounded-xl border border-[#374151] hover:border-[#F59E0B]/50 transition-all">
                <div className="text-3xl font-bold text-[#F59E0B] mb-1">100%</div>
                <div className="text-sm text-[#94A3B8]">Quality</div>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button 
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-[#0F172A] font-bold rounded-xl overflow-hidden shadow-xl shadow-[#2DD4BF]/30"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(45,212,191,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-2">
                  <FaRocket />
                  View My Work
                </span>
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-[#1F2937] text-white font-bold rounded-xl border-2 border-[#374151] hover:border-[#2DD4BF] transition-all shadow-xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative">Let's Talk</span>
              </motion.button>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex gap-3">
                {profile?.github_url && (
                  <motion.a 
                    href={profile.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] flex items-center justify-center text-[#94A3B8] hover:text-white border border-[#374151] hover:border-[#2DD4BF] transition-all shadow-lg hover:shadow-[#2DD4BF]/30"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {IconWrapper(FaGithub, { size: 20 })}
                  </motion.a>
                )}
                {profile?.linkedin_url && (
                  <motion.a 
                    href={profile.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] flex items-center justify-center text-[#94A3B8] hover:text-white border border-[#374151] hover:border-[#0EA5E9] transition-all shadow-lg hover:shadow-[#0EA5E9]/30"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {IconWrapper(FaLinkedin, { size: 20 })}
                  </motion.a>
                )}
                {profile?.twitter_url && (
                  <motion.a 
                    href={profile.twitter_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] flex items-center justify-center text-[#94A3B8] hover:text-white border border-[#374151] hover:border-[#1DA1F2] transition-all shadow-lg hover:shadow-[#1DA1F2]/30"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {IconWrapper(FaTwitter, { size: 20 })}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Floating Card */}
            <motion.div 
              className="relative w-full max-w-md"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#1F2937] via-[#374151] to-[#1F2937] p-8 rounded-3xl border border-[#374151] shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.1) 0%, transparent 50%)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Code Preview */}
                <div className="relative z-10 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                  </div>
                  <pre className="text-[#94A3B8] leading-relaxed">
                    <code>
                      <span className="text-[#8B5CF6]">const</span> <span className="text-[#2DD4BF]">developer</span> = {'{\n'}
                      {'  '}name: <span className="text-[#F59E0B]">"{profile?.name || 'Thamem'}"</span>,{'\n'}
                      {'  '}skills: <span className="text-[#10B981]">['React', 'TS']</span>,{'\n'}
                      {'  '}passion: <span className="text-[#F59E0B]">"∞"</span>,{'\n'}
                      {'  '}coffee: <span className="text-[#F59E0B]">"☕☕☕"</span>{'\n'}
                      {'}'};
                    </code>
                  </pre>
                </div>  
                {/* <SatelliteCodeDisplay/> */}

                {/* Floating Icons */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] rounded-2xl flex items-center justify-center shadow-xl"
                  animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaStar className="text-white text-2xl" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-2xl flex items-center justify-center shadow-xl"
                  animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <FaCode className="text-white text-2xl" />
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -z-10 inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollToSection('about')}
      >
      </motion.div>
    </section>
  );
};

export default Hero;