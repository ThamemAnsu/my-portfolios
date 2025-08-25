import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import { projects } from '../data';
import { IconWrapper } from '../utils/IconUtils';

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
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

  // Extract unique technology categories for filtering
  const allTechnologies = ['all', ...Array.from(new Set(
    projects.flatMap(project => project.technologies)
  ))];

  // Filter projects based on selected technology
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.technologies.includes(activeFilter)
      );

  return (
    <section id="projects" className="py-20 relative w-full">
      {/* Background elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-12 flex flex-col items-center"
        >
          <span className="text-teal-400 font-mono text-sm tracking-wider mb-2">MY WORK</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-6 text-white">
            Featured Projects
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-teal-400"></span>
          </h2>
        </motion.div>
        
        {/* Project filters */}
        <motion.div 
          variants={fadeInUp}
          custom={1}
          initial="hidden"
          animate={controls}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {allTechnologies.slice(0, 8).map((tech, index) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tech
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80'
              }`}
            >
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </button>
          ))}
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              hoveredProject={hoveredProject}
              setHoveredProject={setHoveredProject}
              controls={controls}
            />
          ))}
        </div>
        
        {/* More projects button */}
        <motion.div
          variants={fadeInUp}
          custom={filteredProjects.length + 2}
          initial="hidden"
          animate={controls}
          className="mt-12 flex justify-center"
        >
          <a 
            href="https://github.com/ThamemAnsu" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-6 py-3 bg-gray-800/70 hover:bg-teal-500 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/20"
          >
            <span>View More Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  hoveredProject: number | null;
  setHoveredProject: React.Dispatch<React.SetStateAction<number | null>>;
  controls: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  hoveredProject, 
  setHoveredProject,
  controls
}) => {
  const cardRef = useRef(null);
  const isHovered = hoveredProject === project.id;
  
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
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      custom={index + 2}
      initial="hidden"
      animate={controls}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300"
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      whileHover={{ y: -10 }}
    >
      {/* Project image */}
      {project.image ? (
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={project.image || '/placeholder.jpg'} 
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-5 mt-4">
              {project.githubUrl && (
                <motion.a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-white hover:bg-teal-500 transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -5 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {IconWrapper(FaGithub, { size: 20 })}
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-white hover:bg-teal-500 transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -5 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {IconWrapper(FaExternalLinkAlt, { size: 18 })}
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="h-48 bg-gray-900/60 flex items-center justify-center">
          <FaFolderOpen className="text-teal-400 text-4xl opacity-50" />
        </div>
      )}
      
      {/* Project content */}
      <div className="p-6 relative">
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"></div>
        
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-3 py-1 rounded-full bg-gray-700/70 text-teal-400 font-mono transition-colors duration-300 hover:bg-teal-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative glow */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
        initial={{ width: "40%", opacity: 0 }}
        animate={{ width: isHovered ? "80%" : "40%", opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </motion.div>
  );
};

export default Projects;