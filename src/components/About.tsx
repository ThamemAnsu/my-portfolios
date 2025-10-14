import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
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
        delay: custom * 0.1,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0F172A]">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-16 flex flex-col items-center"
        >
          <span className="text-[#2DD4BF] font-mono text-sm tracking-wider mb-3 uppercase font-semibold">Get To Know</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-4 text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-[#2DD4BF] rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image section */}
          <motion.div 
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            animate={controls}
            className="order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Decorative border */}
              <motion.div 
                className="absolute inset-0 border-2 border-[#2DD4BF] rounded-2xl"
                initial={{ x: 16, y: 16, opacity: 0 }}
                animate={{ x: 16, y: 16, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              ></motion.div>
              
              {/* Image wrapper */}
              <motion.div 
                className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl shadow-[#2DD4BF]/10 border border-[#374151]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2DD4BF]/20 to-transparent mix-blend-overlay rounded-2xl z-10"></div>
                <img 
                  src="../../public/836.jpg" 
                  alt="Thamem Ansari" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-500 hover:scale-105"
                />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-28 h-28 border-2 border-[#2DD4BF]/50 rounded-2xl bg-[#1F2937]"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -top-6 -left-6 w-20 h-20 border-2 border-[#2DD4BF]/50 rounded-2xl bg-[#1F2937]"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>
            </div>
          </motion.div>
          
          {/* Content section */}
          <motion.div 
            variants={fadeInUp}
            custom={2}
            initial="hidden"
            animate={controls}
            className="order-1 md:order-2"
          >
            <div className="space-y-6">
              <motion.div
                variants={fadeInUp}
                custom={3}
                className="card p-6"
              >
                <p className="text-lg leading-relaxed text-[#F9FAFB]">
                  I'm <span className="text-[#2DD4BF] font-bold">Thamem Ansari</span>, a results-driven Junior Developer specializing in 
                  AI-powered applications and full-stack development. I have hands-on 
                  experience in building scalable voice AI systems, implementing 
                  enterprise-grade SSO solutions, and creating intelligent automation workflows.
                </p>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                custom={4}
                className="card p-6"
              >
                <p className="text-lg leading-relaxed text-[#F9FAFB]">
                  My expertise lies in the MERN stack, modern AI frameworks like LangChain, 
                  Whisper STT, and OCR systems, along with strong cloud and DevOps experience. 
                  I'm passionate about solving real-world problems using technology, deploying 
                  production applications, and constantly learning to stay ahead in this 
                  fast-paced field.
                </p>
              </motion.div>
              
              {/* Stats section */}
              <motion.div
                variants={fadeInUp}
                custom={5}
                className="grid grid-cols-3 gap-4 mt-8"
              >
                <div className="card p-4 text-center hover:shadow-lg hover:shadow-[#2DD4BF]/10 transition-all">
                  <div className="text-3xl font-bold text-[#2DD4BF] mb-1">5+</div>
                  <div className="text-sm text-[#9CA3AF] font-medium">Projects</div>
                </div>
                <div className="card p-4 text-center hover:shadow-lg hover:shadow-[#2DD4BF]/10 transition-all">
                  <div className="text-3xl font-bold text-[#2DD4BF] mb-1">2+</div>
                  <div className="text-sm text-[#9CA3AF] font-medium">Years Exp</div>
                </div>
                <div className="card p-4 text-center hover:shadow-lg hover:shadow-[#2DD4BF]/10 transition-all">
                  <div className="text-3xl font-bold text-[#2DD4BF] mb-1">10+</div>
                  <div className="text-sm text-[#9CA3AF] font-medium">Technologies</div>
                </div>
              </motion.div>
              
              {/* Call to action button */}
              <motion.div
                variants={fadeInUp}
                custom={6}
                className="mt-8"
              >
                <a 
                  href="#projects" 
                  className="btn btn-primary inline-flex items-center px-8 py-4 text-[#111827] font-bold rounded-xl hover:shadow-xl hover:shadow-[#2DD4BF]/30 transition-all hover:-translate-y-1"
                >
                  <span>View My Work</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;