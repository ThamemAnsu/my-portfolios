import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaReact, } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript } from 'react-icons/si';



const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  


  return (
    <footer className="relative pt-16 pb-8  overflow-hidden">
   
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Back to top button */}
        
      
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>
        
        {/* Footer bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400">
              © {currentYear} <span className="text-teal-400">Thamem Ansari</span>. All Rights Reserved.
            </p>
          </div>
          
          {/* Built with */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 flex items-center justify-center md:justify-end flex-wrap">
              Built with 
              <span className="inline-flex items-center mx-1">
                <FaHeart className="text-teal-400 mx-1 animate-pulse" size={14} />
              </span>
              using
              <motion.span 
                className="inline-flex items-center mx-1 bg-gray-800 px-2 py-1 rounded-full ml-2 border border-gray-700"
                whileHover={{ y: -2 }}
              >
                <FaReact className="text-blue-400 mr-1" size={14} />
                <span className="text-gray-300 text-sm">React</span>
              </motion.span>
              <motion.span 
                className="inline-flex items-center mx-1 bg-gray-800 px-2 py-1 rounded-full ml-1 border border-gray-700"
                whileHover={{ y: -2 }}
              >
                <SiTailwindcss className="text-cyan-400 mr-1" size={14} />
                <span className="text-gray-300 text-sm">Tailwind</span>
              </motion.span>
              <motion.span 
                className="inline-flex items-center mx-1 bg-gray-800 px-2 py-1 rounded-full ml-1 border border-gray-700"
                whileHover={{ y: -2 }}
              >
                <SiTypescript className="text-blue-500 mr-1" size={14} />
                <span className="text-gray-300 text-sm">TS</span>
              </motion.span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;