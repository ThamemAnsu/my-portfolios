import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { useExperiences } from '../hooks/useSupabase';
import { TextScramble } from './ui/TextScramble';

const Experience: React.FC = () => {
  const { experiences, loading, error } = useExperiences();
  const [activeTab, setActiveTab] = useState<string>('');
  const [headerHovered, setHeaderHovered] = useState(false);

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
      <section id="experience" className="py-32 relative w-full" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="spinner" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-32 relative w-full" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <h3 className="text-red-600 font-bold text-xl mb-2">Error Loading Experiences</h3>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-32 relative w-full" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center">
            <FaBriefcase style={{ color: '#EF4444', fontSize: '4rem', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>No experiences available</p>
          </div>
        </div>
      </section>
    );
  }
  
  const activeExp = experiences.find((exp) => exp.id === activeTab) || experiences[0];

  return (
    <section id="experience" className="py-32 relative w-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm"
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#EF4444',
              fontFamily: 'Nunito, sans-serif'
            }}
          >
            <FaBriefcase />
            <span>Where I've Worked</span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-black mb-5 cursor-default select-none"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            <TextScramble text="Work " trigger={headerHovered} />
            <TextScramble
              text="Experience"
              trigger={headerHovered}
              className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent"
            />
          </h2>
          <motion.div
            className="h-1.5 w-32 rounded-full mx-auto"
            style={{ background: 'linear-gradient(90deg, #EF4444, #DC2626, #EF4444)' }}
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
                className="relative px-6 py-4 text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 rounded-2xl font-black overflow-hidden group"
                style={{
                  background: activeTab === exp.id ? 'rgba(239,68,68,0.08)' : 'rgba(0,0,0,0.02)',
                  border: activeTab === exp.id ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(0,0,0,0.06)',
                  color: activeTab === exp.id ? '#EF4444' : 'var(--text-secondary)',
                  fontFamily: 'Nunito, sans-serif',
                  boxShadow: activeTab === exp.id ? '0 6px 24px rgba(239,68,68,0.05)' : 'none',
                }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {activeTab === exp.id && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{ background: 'linear-gradient(to bottom, #EF4444, #DC2626)' }}
                    layoutId="activeIndicator"
                  />
                )}
                <span className="relative z-10">{exp.company}</span>
                {exp.current && (
                  <motion.span
                    className="ml-2 px-2 py-0.5 text-[10px] rounded-lg font-black relative z-10"
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
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
              {activeExp && (
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(239,68,68,0.2)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Header */}
                  <div className="relative p-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(239,68,68,0.03)' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-3xl font-black text-gray-900 mb-2">
                          {activeExp.role}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-black" style={{ color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}>@ {activeExp.company}</span>
                          {activeExp.current && (
                            <motion.div
                              className="px-3 py-1 rounded-full flex items-center gap-1"
                              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }}></span>
                              <span className="text-xs font-black" style={{ color: '#10B981' }}>Current</span>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Decorative icon */}
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <FaBriefcase style={{ color: '#FFFFFF', fontSize: 24 }} />
                      </motion.div>
                    </div>

                    {/* Date and Location */}
                    <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <FaCalendarAlt style={{ color: '#EF4444' }} />
                        <span className="font-bold">{getDateRange(activeExp.start_date, activeExp.end_date, activeExp.current)}</span>
                      </div>
                      {activeExp.location && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
                          <FaMapMarkerAlt className="text-[#EF4444]" />
                          <span className="font-semibold">{activeExp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Responsibilities */}
                    <ul className="space-y-4 mb-8">
                      {activeExp.description.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex text-gray-700 leading-relaxed"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FaCheckCircle style={{ color: '#EF4444', marginRight: 12, marginTop: 2, flexShrink: 0 }} />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Technologies */}
                    {activeExp.technologies && activeExp.technologies.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center">
                            <span className="text-white text-sm font-bold">⚡</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                            Technologies Used
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeExp.technologies.map((tech, index) => (
                            <motion.span 
                              key={tech} 
                              className="text-xs px-4 py-2 rounded-xl font-mono font-black transition-all duration-200"
                              style={{ background: 'rgba(239,68,68,0.06)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}
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
                  {activeExp.company_url && (
                    <div className="relative p-6 border-t border-gray-100 bg-gray-50">
                      <motion.a
                        href={activeExp.company_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 font-black rounded-xl shadow-lg transition-all"
                        style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#ffffff', fontFamily: 'Nunito, sans-serif' }}
                        whileHover={{ scale: 1.05, x: 5, boxShadow: '0 12px 30px rgba(239,68,68,0.25)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Visit Company Website</span>
                        <FaExternalLinkAlt />
                      </motion.a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;