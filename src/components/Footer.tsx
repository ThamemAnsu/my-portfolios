import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaReact, FaRocket, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiSupabase, SiFramer } from 'react-icons/si';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/ThamemAnsu', color: '#fff' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/thamemansari', color: '#0A66C2' },
    { icon: FaTwitter, href: 'https://twitter.com/thamemansari', color: '#1DA1F2' },
    { icon: FaEnvelope, href: 'mailto:thamemansari@example.com', color: '#2DD4BF' },
  ];

  const techStack = [
    { icon: FaReact, name: 'React', color: '#61DAFB' },
    { icon: SiTypescript, name: 'TS', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: SiFramer, name: 'Framer', color: '#0055FF' },
    { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-12 pb-6 overflow-hidden ">
      {/* Minimal Background */}
      

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Main Content - Compact Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
        
          {/* Quick Links - Compact */}
          <div className="flex flex-col items-center">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <div className="w-0.5 h-4 bg-gradient-to-b from-[#2DD4BF] to-[#8B5CF6] rounded-full" />
              Navigation
            </h4>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-[#2DD4BF] transition-colors text-xs"
                  whileHover={{ x: 2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Connect - Compact */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              Connect
              <div className="w-0.5 h-4 bg-gradient-to-b from-[#2DD4BF] to-[#8B5CF6] rounded-full" />
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#1F2937] flex items-center justify-center text-gray-400 hover:text-white border border-[#374151] hover:border-[#2DD4BF] transition-all"
                  whileHover={{ 
                    y: -3, 
                    scale: 1.1,
                    boxShadow: `0 5px 20px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Bottom Bar - Ultra Compact */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-xs">
            © {currentYear} <span className="text-[#2DD4BF] font-bold">Thamem Ansari</span>
          </p>

          {/* Tech Stack - Inline */}
          <div className="flex items-center flex-wrap justify-center gap-1.5">
            <span className="text-gray-400 text-xs flex items-center gap-1">
              Built with <FaHeart className="text-[#2DD4BF]" size={10} />
            </span>
            {techStack.map((tech) => (
              <motion.span
                key={tech.name}
                className="inline-flex items-center gap-1 bg-[#1F2937] px-2 py-1 rounded border border-[#374151] hover:border-[#2DD4BF]/50 transition-all"
                whileHover={{ y: -2, scale: 1.05 }}
              >
                <tech.icon style={{ color: tech.color }} size={10} />
                <span className="text-gray-300 text-[10px] font-medium">{tech.name}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;