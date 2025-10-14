import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      <section id="experience" className="py-24 relative w-full bg-[#111827]">
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
      <section id="experience" className="py-24 relative w-full bg-[#111827]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="notification notification-error">
            <span>Error loading experiences: {error}</span>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-24 relative w-full bg-[#111827]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center text-[#9CA3AF] text-xl">No experiences available</div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="experience" className="py-24 relative w-full bg-[#111827]">
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-16 flex flex-col items-center">
          <span className="text-[#2DD4BF] font-mono text-sm tracking-wider mb-3 uppercase font-semibold">Where I've Worked</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-4 text-white">
            Experience
          </h2>
          <div className="w-20 h-1 bg-[#2DD4BF] rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Company tabs */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l-2 border-[#374151] mb-6 md:mb-0 md:w-64 bg-[#1F2937] md:bg-transparent rounded-lg md:rounded-none p-2 md:p-0">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`px-5 py-4 text-left whitespace-nowrap md:whitespace-normal transition-all duration-200 focus:outline-none relative rounded-lg md:rounded-none font-semibold ${
                  activeTab === exp.id
                    ? 'text-[#2DD4BF] bg-[#2DD4BF]/10 md:bg-transparent'
                    : 'text-[#D1D5DB] hover:text-[#2DD4BF] hover:bg-[#374151]/30'
                }`}
              >
                {activeTab === exp.id && (
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#2DD4BF] md:block hidden rounded-r"
                    layoutId="activeIndicator"
                  />
                )}
                {exp.company}
              </button>
            ))}
          </div>
          
          {/* Experience content */}
          <div className="flex-1">
            {experiences
              .filter((exp) => exp.id === activeTab)
              .map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card shadow-xl"
                >
                  <div className="card-header bg-[#1F2937]">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <span className="text-[#2DD4BF] text-lg font-semibold">@ {exp.company}</span>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <div className="flex flex-wrap gap-4 text-[#9CA3AF] text-sm mb-6 bg-[#111827] p-4 rounded-lg border border-[#374151]">
                      <span className="flex items-center font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#2DD4BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {getDateRange(exp.start_date, exp.end_date, exp.current)}
                      </span>
                      {exp.location && (
                        <span className="flex items-center font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#2DD4BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-4 mb-6">
                      {exp.description.map((item, index) => (
                        <li key={index} className="flex text-[#D1D5DB] leading-relaxed">
                          <span className="text-[#2DD4BF] mr-3 mt-1 text-lg flex-shrink-0">▸</span>
                          <span className="text-[#F9FAFB]">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[#9CA3AF] mb-3 uppercase tracking-wider">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="text-xs px-3 py-2 rounded-lg bg-[#374151] text-[#2DD4BF] font-mono font-semibold border border-[#4B5563] hover:bg-[#2DD4BF]/20 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {exp.company_url && (
                    <div className="card-footer">
                      <a 
                        href={exp.company_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#2DD4BF] hover:text-[#14b8a6] transition-colors duration-200 font-semibold group"
                      >
                        <span>Visit Company Website</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;