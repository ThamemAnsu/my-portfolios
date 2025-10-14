import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkills } from '../hooks/useSupabase';

const Skills = () => {
  const { skills, loading, error } = useSkills();
  const [animate, setAnimate] = useState(false);

   useEffect(() => {
    if (skills.length > 0) {
      console.log('=== SKILLS DEBUG ===');
      console.log('Total skills:', skills.length);
      console.log('First skill:', skills[0]);
      console.log('Frontend count:', skills.filter(s => s.category === 'frontend').length);
      console.log('Backend count:', skills.filter(s => s.category === 'backend').length);
      console.log('Other count:', skills.filter(s => s.category === 'other').length);
    }
  }, [skills]);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const otherSkills = skills.filter(skill => skill.category === 'other');
  
  const SkillBar = ({ name, level }: { name: string; level: number }) => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-[#F9FAFB] font-semibold flex items-center text-sm">
            <span className="text-[#2DD4BF] mr-2 text-lg">▸</span>
            {name}
          </span>
          <span className="text-[#2DD4BF] font-bold font-mono text-sm">{level}%</span>
        </div>
        <div className="w-full bg-[#374151] rounded-full h-3 overflow-hidden border border-[#4B5563]">
          <motion.div 
            className="h-3 rounded-full relative bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6]"
            initial={{ width: 0 }}
            animate={{ width: animate ? `${level}%` : 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          >
            <span className="absolute top-0 right-0 h-full w-2 bg-white/30 rounded-r-full"></span>
          </motion.div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="skills" className="py-24 relative w-full bg-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-24 relative w-full bg-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="notification notification-error">
            <span>Error loading skills: {error}</span>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="skills" className="py-24 relative w-full bg-[#0F172A]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-16 flex flex-col items-center">
          <span className="text-[#2DD4BF] font-mono text-sm tracking-wider mb-3 uppercase font-semibold">What I Can Do</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-4 text-white">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-[#2DD4BF] rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Frontend Skills */}
          <div className="card group hover:shadow-xl hover:shadow-[#2DD4BF]/10 transition-shadow duration-300">
            <div className="card-header bg-[#1F2937]">
              <div className="flex items-center">
                <span className="w-12 h-12 flex items-center justify-center bg-[#2DD4BF]/20 rounded-xl mr-4 border border-[#2DD4BF]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2DD4BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold text-white">Frontend</h3>
              </div>
            </div>
            <div className="card-body">
              {frontendSkills.map((skill) => (
                <SkillBar 
                  key={skill.id} 
                  name={skill.name} 
                  level={skill.level}
                />
              ))}
            </div>
          </div>
          
          {/* Backend Skills */}
          <div className="card group hover:shadow-xl hover:shadow-[#2DD4BF]/10 transition-shadow duration-300">
            <div className="card-header bg-[#1F2937]">
              <div className="flex items-center">
                <span className="w-12 h-12 flex items-center justify-center bg-[#2DD4BF]/20 rounded-xl mr-4 border border-[#2DD4BF]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2DD4BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold text-white">Backend</h3>
              </div>
            </div>
            <div className="card-body">
              {backendSkills.map((skill) => (
                <SkillBar 
                  key={skill.id} 
                  name={skill.name} 
                  level={skill.level}
                />
              ))}
            </div>
          </div>
          
          {/* Other Skills */}
          <div className="card group hover:shadow-xl hover:shadow-[#2DD4BF]/10 transition-shadow duration-300">
            <div className="card-header bg-[#1F2937]">
              <div className="flex items-center">
                <span className="w-12 h-12 flex items-center justify-center bg-[#2DD4BF]/20 rounded-xl mr-4 border border-[#2DD4BF]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2DD4BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold text-white">Other</h3>
              </div>
            </div>
            <div className="card-body">
              {otherSkills.map((skill) => (
                <SkillBar 
                  key={skill.id} 
                  name={skill.name} 
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;