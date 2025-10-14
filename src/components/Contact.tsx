import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useProfile } from '../hooks/useSupabase';
import { submitContactForm } from '../hooks/useSupabase';

const Contact: React.FC = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else {
      setSubmitError(result.error || 'An error occurred. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      content: profile?.email || "thamemansari55@gmail.com",
      link: `mailto:${profile?.email || "thamemansari55@gmail.com"}`
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      content: profile?.phone || "+91 6381360124",
      link: `tel:${profile?.phone || "+916381360124"}`
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: profile?.location || "Washermenpet, Tamil Nadu, India",
      link: "https://www.google.com/maps/place/Washermanpet,+Chennai,+Tamil+Nadu"
    }
  ];
  
  return (
    <section id="contact" className="py-20 relative w-full">
      <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          custom={0}
          className="mb-14 flex flex-col items-center"
        >
          <span className="text-teal-400 font-mono text-sm tracking-wider mb-2">GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl font-bold relative mb-6 text-white">
            Contact Me
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-teal-400"></span>
          </h2>
          <motion.p 
            variants={fadeInUp}
            custom={1}
            className="text-gray-300 text-center max-w-2xl"
          >
            Have a question or want to work together? I'm always open to discussing new projects, 
            creative ideas or opportunities to be part of your vision.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <motion.a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              variants={fadeInUp}
              custom={index + 2}
              initial="hidden"
              animate={controls}
              className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300 flex flex-col items-center text-center hover:shadow-lg hover:shadow-teal-500/10"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-teal-500/10 rounded-full mb-4 group-hover:bg-teal-500 transition-all duration-300">
                <info.icon className="text-teal-400 text-xl group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-300 group-hover:text-teal-400 transition-all duration-300">{info.content}</p>
            </motion.a>
          ))}
        </div>
        
        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          <motion.div 
            variants={fadeInUp}
            custom={5}
            initial="hidden"
            animate={controls}
            className="md:col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Let's talk about your project</h3>
            <p className="text-gray-300 mb-6">
              I'm interested in freelance opportunities – especially ambitious or large projects. 
              However, if you have other requests or questions, don't hesitate to reach out.
            </p>
            
            <h4 className="text-lg font-semibold text-white mb-3">Connect with me</h4>
            <div className="flex space-x-4 mb-8">
              {profile?.github_url && (
                <a 
                  href={profile.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-gray-700/70 flex items-center justify-center text-gray-300 hover:text-white hover:bg-teal-500 transition-all duration-300"
                >
                  <FaGithub size={18} />
                </a>
              )}
              {profile?.linkedin_url && (
                <a 
                  href={profile.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-gray-700/70 flex items-center justify-center text-gray-300 hover:text-white hover:bg-teal-500 transition-all duration-300"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
              {profile?.twitter_url && (
                <a 
                  href={profile.twitter_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-gray-700/70 flex items-center justify-center text-gray-300 hover:text-white hover:bg-teal-500 transition-all duration-300"
                >
                  <FaTwitter size={18} />
                </a>
              )}
            </div>
            
            <div className="mt-auto text-center">
              <div className="w-28 h-28 rounded-full bg-gray-700/50 mx-auto mb-3 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut" 
                  }}
                >
                  <FaEnvelope className="text-teal-400 text-3xl" />
                </motion.div>
              </div>
              <p className="text-gray-400 text-sm">I typically respond within 24 hours</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            custom={6}
            initial="hidden"
            animate={controls}
            className="md:col-span-3 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6">
                  <FaPaperPlane className="text-teal-400 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-300">
                  Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                    {submitError}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="I'd like to discuss a project that involves..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-400 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/20 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;