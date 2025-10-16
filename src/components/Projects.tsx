import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen, FaRocket, FaCode, FaStar } from 'react-icons/fa';
import { useProjects } from '../hooks/useSupabase';
import { IconWrapper } from '../utils/IconUtils';
import type { Project } from '../lib/supabase';

// Space-themed placeholder images
const getSpacePlaceholder = (index: number): string => {
  const spaceImages = [
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop', // Galaxy
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop', // Milky Way
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop', // Planet
    'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop', // Nebula
    'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&h=600&fit=crop', // Space station
    'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=600&fit=crop', // Stars
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop', // Earth from space
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop', // Northern lights space
  ];
  return spaceImages[index % spaceImages.length];
};

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
      <section id="projects" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center">
            <motion.div 
              className="w-16 h-16 border-4 border-[#2DD4BF] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-xl">
            <h3 className="text-red-400 font-bold text-xl mb-2">Error Loading Projects</h3>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 relative w-full overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#8B5CF6]/10 rounded-full mb-6 border border-[#2DD4BF]/30"
          >
            <FaRocket className="text-[#2DD4BF] text-lg" />
            <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold uppercase">
              My Work
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Featured <span className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F59E0B] rounded-full mx-auto mb-6"
            initial={{ width: 0, opacity: 0.5 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Explore my latest work and side projects
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {allTechnologies.slice(0, 8).map((tech, index) => (
            <motion.button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2 relative overflow-hidden ${
                activeFilter === tech
                  ? 'bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-[#0F172A] shadow-xl shadow-[#2DD4BF]/30 border-[#2DD4BF]'
                  : 'bg-gradient-to-br from-[#1F2937] to-[#0F172A] text-[#94A3B8] hover:text-white border-[#374151] hover:border-[#2DD4BF]/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {activeFilter === tech && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
              )}
              <span className="relative z-10">
                {tech.charAt(0).toUpperCase() + tech.slice(1)}
              </span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid - Fixed Height */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="h-full"
            >
              <ProjectCard 
                project={project}
                hoveredProject={hoveredProject}
                setHoveredProject={setHoveredProject}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <FaFolderOpen className="text-[#2DD4BF] text-6xl mx-auto mb-4 opacity-30" />
            <p className="text-[#94A3B8] text-lg">No projects found for this filter</p>
          </motion.div>
        )}
        
        {/* View All Button */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0.5, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a 
            href="https://github.com/ThamemAnsu" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#1F2937] to-[#0F172A] text-white font-bold rounded-2xl border-2 border-[#374151] hover:border-[#2DD4BF] shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(45,212,191,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <FaGithub className="text-2xl mr-3 group-hover:text-[#2DD4BF] transition-colors relative z-10" />
            <span className="relative z-10 group-hover:text-[#2DD4BF] transition-colors">View All Projects</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 ml-3 relative z-10 group-hover:text-[#2DD4BF] transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  hoveredProject: string | null;
  setHoveredProject: React.Dispatch<React.SetStateAction<string | null>>;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project,
  hoveredProject, 
  setHoveredProject,
  index
}) => {
  const isHovered = hoveredProject === project.id;
  const imageUrl = project.image_url || getSpacePlaceholder(index);
  
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-3xl overflow-hidden border-2 border-[#374151] hover:border-[#2DD4BF]/50 transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(45, 212, 191, 0.25)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 80px rgba(45,212,191,0.3)',
        }}
      />

      {/* Image Section - Fixed Height */}
      <div className="relative h-56 flex-shrink-0 overflow-hidden bg-[#111827]">
        <motion.img 
          src={imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent"></div>
        
        {/* Action Buttons Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.github_url && (
            <motion.a 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1F2937] to-[#0F172A] flex items-center justify-center text-white hover:text-[#2DD4BF] border-2 border-[#374151] hover:border-[#2DD4BF] shadow-2xl backdrop-blur-xl"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {IconWrapper(FaGithub, { size: 22 })}
            </motion.a>
          )}
          {project.live_url && (
            <motion.a 
              href={project.live_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] flex items-center justify-center text-white shadow-2xl shadow-[#2DD4BF]/50"
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {IconWrapper(FaExternalLinkAlt, { size: 20 })}
            </motion.a>
          )}
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center gap-2 shadow-xl"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <FaStar className="text-white text-sm" />
            <span className="text-white text-xs font-bold">Featured</span>
          </motion.div>
        )}
      </div>
      
      {/* Content Section - Flexible Height with Fixed Structure */}
      <div className="p-6 relative z-10 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-black text-white group-hover:text-[#2DD4BF] transition-colors duration-300 flex-1 line-clamp-2 min-h-[3.5rem]">
            {project.title}
          </h3>
          <FaCode className="text-[#2DD4BF] text-xl flex-shrink-0 ml-2" />
        </div>
        
        <p className="text-[#94A3B8] mb-6 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {project.description}
        </p>
        
        {/* Technologies - Fixed at Bottom */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <motion.span 
              key={tech} 
              className="text-xs px-3 py-2 rounded-lg bg-gradient-to-br from-[#374151] to-[#1F2937] text-[#2DD4BF] font-mono font-bold border border-[#4B5563] hover:border-[#2DD4BF]/50 transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-3 py-2 rounded-lg bg-gradient-to-br from-[#374151] to-[#1F2937] text-[#94A3B8] font-mono font-bold border border-[#4B5563]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
      
      {/* Bottom Accent Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent"
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden rounded-tl-3xl">
        <motion.div
          className="w-full h-full bg-gradient-to-br from-[#2DD4BF] to-transparent"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default Projects;