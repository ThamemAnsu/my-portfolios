import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { skills } from '../data';

const Skills = () => {
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const otherSkills = skills.filter(skill => skill.category === 'other');
  
  const SkillBar = ({ name, level, index, category }: { name: string; level: number; index: number; category: string }) => {
    const barRef = useRef(null);
    const barInView = useInView(barRef, { once: true });
    
    return (
      <motion.div 
        ref={barRef}
        className="mb-5"
        variants={fadeInUp}
        custom={index + (category === 'frontend' ? 0 : category === 'backend' ? frontendSkills.length : frontendSkills.length + backendSkills.length)}
        initial="hidden"
        animate={controls}
      >
        <div className="flex justify-between mb-1.5">
          <span className="text-gray-300 font-medium flex items-center">
            <span className="text-teal-400 mr-2 text-sm">▹</span>
            {name}
          </span>
          <span className="text-teal-400 font-mono text-sm">{level}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
          <motion.div 
            className="bg-gradient-to-r from-teal-500 to-teal-400 h-2.5 rounded-full relative"
            initial={{ width: 0 }}
            animate={barInView ? { width: `${level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="absolute top-0 right-0 h-full w-1.5 bg-white/20 rounded-full"></span>
          </motion.div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <section id="skills" className="py-20 relative w-full">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-14 flex flex-col items-center"
        >
          <span className="text-teal-400 font-mono text-sm tracking-wider mb-2">WHAT I CAN DO</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-6 text-white">
            My Skills
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-teal-400"></span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Decorative elements */}
          <motion.div 
            className="absolute -z-10 -top-10 -left-10 w-40 h-40 border border-teal-500/20 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut" 
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute -z-10 -bottom-10 -right-10 w-60 h-60 border border-teal-500/20 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>

          {/* Frontend Skills */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={controls}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
          >
            <div className="flex items-center mb-6">
              <span className="w-10 h-10 flex items-center justify-center bg-teal-500/20 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-white">Frontend</h3>
            </div>
            <div className="space-y-1">
              {frontendSkills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  index={index}
                  category="frontend"
                />
              ))}
            </div>
          </motion.div>
          
          {/* Backend Skills */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={controls}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
          >
            <div className="flex items-center mb-6">
              <span className="w-10 h-10 flex items-center justify-center bg-teal-500/20 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-white">Backend</h3>
            </div>
            <div className="space-y-1">
              {backendSkills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  index={index}
                  category="backend"
                />
              ))}
            </div>
          </motion.div>
          
          {/* Other Skills */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={controls}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
          >
            <div className="flex items-center mb-6">
              <span className="w-10 h-10 flex items-center justify-center bg-teal-500/20 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-white">Other</h3>
            </div>
            <div className="space-y-1">
              {otherSkills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  index={index}
                  category="other"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;