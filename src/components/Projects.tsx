import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data';
import { IconWrapper } from '../utils/IconUtils';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  return (
    <section id="projects" className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-dark rounded-lg overflow-hidden shadow-lg"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image || '/placeholder.jpg'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ 
                      transform: hoveredProject === project.id ? 'scale(1.1)' : 'scale(1)' 
                    }}
                  />
                  <div className={`absolute inset-0 bg-primary/80 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex space-x-4">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-light hover:text-secondary transition-colors"
                        >
                          {IconWrapper(FaGithub, { size: 24 })}
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-light hover:text-secondary transition-colors"
                        >
                          {IconWrapper(FaExternalLinkAlt, { size: 24 })}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-lightest">{project.title}</h3>
                  <p className="text-light mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs px-2 py-1 rounded bg-primary text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;