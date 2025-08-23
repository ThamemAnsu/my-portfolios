import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data';

const Skills: React.FC = () => {
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const otherSkills = skills.filter(skill => skill.category === 'other');
  
  const SkillBar: React.FC<{ name: string; level: number }> = ({ name, level }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-dark rounded-full h-2.5">
        <div 
          className="bg-secondary h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
  
  return (
    <section id="skills" className="py-16 bg-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Skills</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">Frontend</h3>
              {frontendSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">Backend</h3>
              {backendSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">Other</h3>
              {otherSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;