import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaLightbulb, FaAward, FaUsers } from 'react-icons/fa';

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  const highlights = [
    {
      icon: FaCode,
      title: "Clean Code",
      description: "Writing maintainable, scalable solutions",
      color: "#2DD4BF"
    },
    {
      icon: FaBrain,
      title: "AI Integration",
      description: "Leveraging cutting-edge AI technologies",
      color: "#8B5CF6"
    },
    {
      icon: FaRocket,
      title: "Fast Delivery",
      description: "Rapid prototyping to production",
      color: "#F59E0B"
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0NSwyMTIsMTkxLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#8B5CF6]/10 rounded-full mb-6 border border-[#2DD4BF]/30"
          >
            <FaLightbulb className="text-[#2DD4BF] text-lg" />
            <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold uppercase">
              Get To Know Me
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            About <span className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent">Me</span>
          </h2>
          
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-[#2DD4BF] via-[#14b8a6] to-[#8B5CF6] rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image section with enhanced design */}
          <motion.div 
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            animate={controls}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Main image container */}
              <motion.div 
                className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#374151]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2DD4BF]/30 via-transparent to-[#8B5CF6]/20 mix-blend-overlay rounded-3xl z-10"></div>
                
                {/* Image */}
                <motion.img 
                  src="/836.jpg" 
                  alt="Thamem Ansari" 
                  className="w-full h-auto object-cover rounded-3xl"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    boxShadow: '0 0 60px rgba(45,212,191,0.3)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(45,212,191,0.3)',
                      '0 0 80px rgba(139,92,246,0.4)',
                      '0 0 60px rgba(45,212,191,0.3)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Floating accent cards */}
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-6 rounded-2xl border border-[#374151] shadow-2xl backdrop-blur-xl"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut" 
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] rounded-xl flex items-center justify-center">
                    <FaAward className="text-white text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">2+</div>
                    <div className="text-sm text-[#94A3B8]">Years Exp</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-8 -left-8 bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-6 rounded-2xl border border-[#374151] shadow-2xl backdrop-blur-xl"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl flex items-center justify-center">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-sm text-[#94A3B8]">Projects</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative geometric shapes */}
              <motion.div
                className="absolute -z-10 inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
          
          {/* Content section with enhanced cards */}
          <motion.div 
            variants={fadeInUp}
            custom={2}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            {/* Main description cards */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-8 rounded-2xl border border-[#374151] hover:border-[#2DD4BF]/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-[#2DD4BF]/20 group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <p className="text-lg leading-relaxed text-[#E5E7EB] relative z-10">
                I'm <span className="text-[#2DD4BF] font-bold text-xl">Thamem Ansari</span>, a results-driven Junior Developer specializing in 
                AI-powered applications and full-stack development. I have hands-on 
                experience in building scalable voice AI systems, implementing 
                enterprise-grade SSO solutions, and creating intelligent automation workflows.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              custom={4}
              className="relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-8 rounded-2xl border border-[#374151] hover:border-[#8B5CF6]/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-[#8B5CF6]/20 group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <p className="text-lg leading-relaxed text-[#E5E7EB] relative z-10">
                My expertise lies in the <span className="text-[#8B5CF6] font-bold">MERN stack</span>, modern AI frameworks like LangChain, 
                Whisper STT, and OCR systems, along with strong cloud and DevOps experience. 
                I'm passionate about solving real-world problems using technology, deploying 
                production applications, and constantly learning to stay ahead in this 
                fast-paced field.
              </p>
            </motion.div>
            
            {/* Highlights Grid */}
            <motion.div
              variants={fadeInUp}
              custom={5}
              className="grid grid-cols-3 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-5 rounded-2xl border border-[#374151] hover:border-[#2DD4BF]/50 transition-all cursor-pointer group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setActiveCard(index)}
                  onHoverEnd={() => setActiveCard(null)}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${item.color}15 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                        border: `1px solid ${item.color}30`,
                      }}
                      animate={activeCard === index ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon style={{ color: item.color }} className="text-xl" />
                    </motion.div>
                    <div className="text-sm font-bold text-white text-center mb-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#94A3B8] text-center">
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats section */}
            <motion.div
              variants={fadeInUp}
              custom={6}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-6 rounded-2xl border border-[#374151] text-center hover:border-[#2DD4BF]/50 transition-all hover:shadow-xl hover:shadow-[#2DD4BF]/20 group">
                <motion.div 
                  className="text-4xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  5+
                </motion.div>
                <div className="text-sm text-[#94A3B8] font-semibold group-hover:text-[#2DD4BF] transition-colors">
                  Projects
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-6 rounded-2xl border border-[#374151] text-center hover:border-[#8B5CF6]/50 transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group">
                <motion.div 
                  className="text-4xl font-black bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  2+
                </motion.div>
                <div className="text-sm text-[#94A3B8] font-semibold group-hover:text-[#8B5CF6] transition-colors">
                  Years Exp
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-6 rounded-2xl border border-[#374151] text-center hover:border-[#F59E0B]/50 transition-all hover:shadow-xl hover:shadow-[#F59E0B]/20 group">
                <motion.div 
                  className="text-4xl font-black bg-gradient-to-r from-[#F59E0B] to-[#EF4444] bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  10+
                </motion.div>
                <div className="text-sm text-[#94A3B8] font-semibold group-hover:text-[#F59E0B] transition-colors">
                  Technologies
                </div>
              </div>
            </motion.div>
            
            {/* CTA button */}
            <motion.div
              variants={fadeInUp}
              custom={7}
            >
              <motion.a 
                href="#projects" 
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-[#0F172A] font-bold rounded-xl shadow-xl shadow-[#2DD4BF]/30 overflow-hidden relative"
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;