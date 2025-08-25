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
  I'm Thamem Ansari, a results-driven Junior Developer specializing in 
  AI-powered applications and full-stack development. I have hands-on 
  experience in building scalable voice AI systems, implementing 
  enterprise-grade SSO solutions, and creating intelligent automation workflows.
</p>
<p className="mb-4">
  My expertise lies in the MERN stack, modern AI frameworks like LangChain, 
  Whisper STT, and OCR systems, along with strong cloud and DevOps experience. 
  I’m passionate about solving real-world problems using technology, deploying 
  production applications, and constantly learning to stay ahead in this 
  fast-paced field.
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
                  alt="Thamem Ansari" 
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