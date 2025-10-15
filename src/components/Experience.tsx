import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { useExperiences } from '../hooks/useSupabase';

const Experience: React.FC = () => {
  const { experiences, loading, error } = useExperiences();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (experiences.length > 0 && !activeTab) {
      setActiveTab(experiences[0].id);
    }
  }, [experiences, activeTab]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getDateRange = (startDate: string, endDate?: string, current?: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  if (loading) {
    return (
      <section id="experience" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
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
      <section id="experience" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-xl">
            <h3 className="text-red-400 font-bold text-xl mb-2">Error Loading Experiences</h3>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center">
            <FaBriefcase className="text-[#2DD4BF] text-6xl mx-auto mb-4 opacity-30" />
            <p className="text-[#94A3B8] text-xl">No experiences available</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="experience" className="py-32 relative w-full  overflow-hidden">
      
      
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
            <FaBriefcase className="text-[#2DD4BF] text-lg" />
            <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold uppercase">
              Where I've Worked
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Work <span className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent">Experience</span>
          </h2>
          
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F59E0B] rounded-full mx-auto"
            initial={{ width: 0, opacity: 0.5 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Company tabs - Vertical sidebar */}
          <motion.div 
            className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:w-72 pb-2 lg:pb-0"
            initial={{ opacity: 0.5, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {experiences.map((exp, index) => (
              <motion.button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`relative px-6 py-4 text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 rounded-2xl font-bold overflow-hidden group ${
                  activeTab === exp.id
                    ? 'bg-gradient-to-r from-[#1F2937] to-[#0F172A] text-[#2DD4BF] border-2 border-[#2DD4BF] shadow-xl shadow-[#2DD4BF]/20'
                    : 'bg-gradient-to-r from-[#1F2937] to-[#0F172A] text-[#94A3B8] border-2 border-[#374151] hover:border-[#2DD4BF]/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Active indicator line */}
                {activeTab === exp.id && (
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2DD4BF] to-[#14b8a6] rounded-r-full"
                    layoutId="activeIndicator"
                  />
                )}

                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                
                <span className="relative z-10">{exp.company}</span>

                {/* Current badge */}
                {exp.current && (
                  <motion.span
                    className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg font-bold relative z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    Current
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Experience content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {experiences
                .filter((exp) => exp.id === activeTab)
                .map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-3xl border-2 border-[#374151] overflow-hidden shadow-2xl"
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0"
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 60px rgba(45,212,191,0.3)',
                      }}
                    />

                    {/* Header */}
                    <div className="relative p-8 border-b-2 border-[#374151] bg-gradient-to-r from-[#1F2937] to-[#0F172A]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-3xl font-black text-white mb-2">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[#2DD4BF] text-xl font-bold">@ {exp.company}</span>
                            {exp.current && (
                              <motion.div
                                className="px-3 py-1 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full flex items-center gap-1"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                <span className="text-white text-xs font-bold">Current</span>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        {/* Decorative icon */}
                        <motion.div
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] flex items-center justify-center shadow-xl"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <FaBriefcase className="text-white text-2xl" />
                        </motion.div>
                      </div>

                      {/* Date and Location */}
                      <div className="flex flex-wrap gap-6 text-[#94A3B8] text-sm">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] rounded-xl border border-[#374151]">
                          <FaCalendarAlt className="text-[#2DD4BF]" />
                          <span className="font-semibold">{getDateRange(exp.start_date, exp.end_date, exp.current)}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] rounded-xl border border-[#374151]">
                            <FaMapMarkerAlt className="text-[#8B5CF6]" />
                            <span className="font-semibold">{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Responsibilities */}
                      <ul className="space-y-4 mb-8">
                        {exp.description.map((item, index) => (
                          <motion.li 
                            key={index} 
                            className="flex text-[#E5E7EB] leading-relaxed"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <FaCheckCircle className="text-[#2DD4BF] mr-3 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      {/* Technologies */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
                              <span className="text-white text-sm font-bold">⚡</span>
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                              Technologies Used
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, index) => (
                              <motion.span 
                                key={tech} 
                                className="text-xs px-4 py-2 rounded-xl bg-gradient-to-br from-[#374151] to-[#1F2937] text-[#2DD4BF] font-mono font-bold border border-[#4B5563] hover:border-[#2DD4BF]/50 hover:scale-105 transition-all duration-200"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -2 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Footer - Company Link */}
                    {exp.company_url && (
                      <div className="relative p-6 border-t-2 border-[#374151] bg-gradient-to-r from-[#1F2937] to-[#0F172A]">
                        <motion.a 
                          href={exp.company_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-[#0F172A] font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#2DD4BF]/30 transition-all"
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Visit Company Website</span>
                          <FaExternalLinkAlt />
                        </motion.a>
                      </div>
                    )}

                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden">
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
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;