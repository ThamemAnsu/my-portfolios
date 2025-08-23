import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(experiences[0].id);
  
  return (
    <section id="experience" className="py-16 bg-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Experience</h2>
          
          <div className="flex flex-col md:flex-row">
            {/* Tabs */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-secondary/30 mb-6 md:mb-0 md:w-60 md:mr-8">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(exp.id)}
                  className={`px-4 py-3 text-left whitespace-nowrap md:whitespace-normal transition-all focus:outline-none ${
                    activeTab === exp.id
                      ? 'text-secondary bg-primary/30 md:border-l-2 md:-ml-0.5 border-secondary'
                      : 'text-light hover:text-secondary hover:bg-primary/20'
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="flex-1">
              {experiences
                .filter((exp) => exp.id === activeTab)
                .map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-lightest">
                      {exp.role} <span className="text-secondary">@ {exp.company}</span>
                    </h3>
                    <p className="text-light/70 mb-4">{exp.duration}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="text-secondary mr-2">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-xs px-2 py-1 rounded bg-primary text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;