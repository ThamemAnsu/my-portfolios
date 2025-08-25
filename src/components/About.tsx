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
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-16 flex flex-col items-center"
        >
          <span className="text-secondary font-mono text-sm tracking-wider mb-2">GET TO KNOW</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-8">
            About Me
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-secondary"></span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image section with enhanced styling */}
          <motion.div 
            variants={fadeInUp}
            custom={1}
            initial="hidden"
            animate={controls}
            className="order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Decorative elements */}
              <motion.div 
                className="absolute inset-0 border-2 border-secondary rounded-lg"
                initial={{ x: 12, y: 12, opacity: 0 }}
                animate={{ x: 12, y: 12, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              ></motion.div>
              
              {/* Animated image wrapper */}
              <motion.div 
                className="absolute inset-0 overflow-hidden rounded-lg shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-transparent mix-blend-overlay rounded-lg z-10"></div>
                <img 
                  src="../../public/836.jpg" 
                  alt="Thamem Ansari" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-500 hover:scale-105"
                />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-secondary rounded-lg opacity-30"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -top-4 -left-4 w-16 h-16 border-2 border-secondary rounded-lg opacity-30"
                animate={{ 
                  y: [0, 8, 0],
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
          
          {/* Content section with enhanced styling */}
          <motion.div 
            variants={fadeInUp}
            custom={2}
            initial="hidden"
            animate={controls}
            className="order-1 md:order-2"
          >
            <div className="space-y-6">
              <motion.p 
                variants={fadeInUp}
                custom={3}
                className="text-lg leading-relaxed"
              >
                I'm <span className="text-secondary font-semibold">Thamem Ansari</span>, a results-driven Junior Developer specializing in 
                AI-powered applications and full-stack development. I have hands-on 
                experience in building scalable voice AI systems, implementing 
                enterprise-grade SSO solutions, and creating intelligent automation workflows.
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                custom={4}
                className="text-lg leading-relaxed"
              >
                My expertise lies in the MERN stack, modern AI frameworks like LangChain, 
                Whisper STT, and OCR systems, along with strong cloud and DevOps experience. 
                I'm passionate about solving real-world problems using technology, deploying 
                production applications, and constantly learning to stay ahead in this 
                fast-paced field.
              </motion.p>
              
             
              
              {/* Call to action button */}
              <motion.div
                variants={fadeInUp}
                custom={12}
                className="mt-8"
              >
                <a 
                  href="#projects" 
                  className="inline-block px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                  View My Work
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