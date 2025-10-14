import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import { useProjects } from '../hooks/useSupabase';
import { IconWrapper } from '../utils/IconUtils';
import type { Project } from '../lib/supabase';

const Projects: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const allTechnologies = ['all', ...Array.from(new Set(
    projects.flatMap(project => project.technologies)
  ))];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.technologies.includes(activeFilter)
      );

  if (loading) {
    return (
      <section id="projects" className="py-24 relative w-full bg-[#111827]">
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
      <section id="projects" className="py-24 relative w-full bg-[#111827]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="notification notification-error">
            <span>Error loading projects: {error}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative w-full bg-[#111827]">
      <div className="absolute top-40 left-0 w-72 h-72 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-16 flex flex-col items-center">
          <span className="text-[#2DD4BF] font-mono text-sm tracking-wider mb-3 uppercase font-semibold">My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-4 text-white">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-[#2DD4BF] rounded-full"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTechnologies.slice(0, 8).map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                activeFilter === tech
                  ? 'bg-[#2DD4BF] text-[#111827] shadow-lg shadow-[#2DD4BF]/30 border-[#2DD4BF]'
                  : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] border-[#374151] hover:border-[#2DD4BF]/50'
              }`}
            >
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              hoveredProject={hoveredProject}
              setHoveredProject={setHoveredProject}
            />
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <a 
            href="https://github.com/ThamemAnsu" 
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 py-4 bg-[#1F2937] hover:bg-[#2DD4BF] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#2DD4BF]/20 border border-[#374151] hover:border-[#2DD4BF]"
          >
            <span className="group-hover:text-[#111827]">View All Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  hoveredProject: string | null;
  setHoveredProject: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project,
  hoveredProject, 
  setHoveredProject
}) => {
  const isHovered = hoveredProject === project.id;
  
  return (
    <motion.div
      className="group relative bg-[#1F2937] rounded-xl overflow-hidden shadow-lg border border-[#374151] hover:border-[#2DD4BF]/50 transition-all duration-200"
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(45, 212, 191, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      {project.image_url ? (
        <div className="relative h-52 overflow-hidden bg-[#111827]">
          <motion.img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/80 to-transparent flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex space-x-4">
              {project.github_url && (
                <motion.a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-[#374151] flex items-center justify-center text-white hover:bg-[#2DD4BF] hover:text-[#111827] transition-all duration-200 border border-[#4B5563] shadow-lg"
                  whileHover={{ y: -5, scale: 1.1 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {IconWrapper(FaGithub, { size: 20 })}
                </motion.a>
              )}
              {project.live_url && (
                <motion.a 
                  href={project.live_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-[#374151] flex items-center justify-center text-white hover:bg-[#2DD4BF] hover:text-[#111827] transition-all duration-200 border border-[#4B5563] shadow-lg"
                  whileHover={{ y: -5, scale: 1.1 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {IconWrapper(FaExternalLinkAlt, { size: 18 })}
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="h-52 bg-[#111827] flex items-center justify-center border-b border-[#374151]">
          <FaFolderOpen className="text-[#2DD4BF] text-5xl opacity-30" />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#2DD4BF] transition-colors duration-200">
          {project.title}
        </h3>
        
        <p className="text-[#D1D5DB] mb-5 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-3 py-1.5 rounded-full bg-[#374151] text-[#2DD4BF] font-mono font-medium transition-all duration-200 hover:bg-[#2DD4BF]/20 border border-[#4B5563]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent"
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
    </motion.div>
  );
};

export default Projects;