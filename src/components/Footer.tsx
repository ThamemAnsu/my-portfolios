import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { IconWrapper } from '../utils/IconUtils';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-dark">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-light">
              © {new Date().getFullYear()} Thamem Ansu. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/ThamemAnsu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-light hover:text-secondary transition-colors"
            >
              {IconWrapper(FaGithub, { size: 20 })}
            </a>
            <a 
              href="https://linkedin.com/in/thamemansu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-light hover:text-secondary transition-colors"
            >
              {IconWrapper(FaLinkedin, { size: 20 })}
            </a>
            <a 
              href="https://twitter.com/thamemansu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-light hover:text-secondary transition-colors"
            >
              {IconWrapper(FaTwitter, { size: 20 })}
            </a>
          </div>
          
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="text-light flex items-center justify-center md:justify-end">
              Built with {IconWrapper(FaHeart, { className: "text-secondary mx-1" })} using React & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;