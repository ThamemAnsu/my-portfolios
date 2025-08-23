import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Hello! I'm Thamem, a passionate frontend developer with expertise in building 
                responsive and performant web applications. My journey in web development 
                started during my university years, and I've been hooked ever since.
              </p>
              <p className="mb-4">
                I enjoy working with modern JavaScript frameworks like React, and I'm always
                eager to learn new technologies. The fast-paced nature of web development
                keeps me constantly learning and improving my skills.
              </p>
              <p className="mb-4">
                When I'm not coding, you can find me exploring new hiking trails, reading tech blogs,
                or experimenting with new recipes in the kitchen.
              </p>
              <p>
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 mt-4">
                <li className="flex items-center mb-2">
                  <span className="text-secondary mr-2">▹</span> React
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-secondary mr-2">▹</span> TypeScript
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-secondary mr-2">▹</span> Tailwind CSS
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-secondary mr-2">▹</span> Next.js
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-secondary mr-2">▹</span> Node.js
                </li>
                <li className="flex items-center mb-2">
                  <span className="text-secondary mr-2">▹</span> MongoDB
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-2 border-secondary rounded translate-x-5 translate-y-5"></div>
                <div className="absolute inset-0 bg-secondary/20 rounded"></div>
                <img 
                  src="/profile.jpg" 
                  alt="Thamem Ansu" 
                  className="absolute inset-0 w-full h-full object-cover rounded z-10"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;