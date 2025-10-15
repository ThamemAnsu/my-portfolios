import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter, FaCheckCircle, FaRocket } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      content: "thamemansari55@gmail.com",
      link: "mailto:thamemansari55@gmail.com",
      color: "#2DD4BF"
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      content: "+91 6381360124",
      link: "tel:+916381360124",
      color: "#8B5CF6"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: "Chennai, Tamil Nadu",
      link: "https://www.google.com/maps/place/Chennai",
      color: "#F59E0B"
    }
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" }
  ];
  
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2DD4BF]/10 rounded-full mb-6 border border-[#2DD4BF]/20"
          >
            <FaRocket className="text-[#2DD4BF] text-sm" />
            <span className="text-[#2DD4BF] font-mono text-xs tracking-wider font-semibold">
              GET IN TOUCH
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-[#2DD4BF] to-[#8B5CF6] bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          
          <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your vision to life.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {contactInfo.map((info, index) => (
            <motion.a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-2xl border border-[#334155] hover:border-[#2DD4BF]/50 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${info.color}20` }}
                >
                  <info.icon className="text-xl" style={{ color: info.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold mb-1 text-sm">{info.title}</h3>
                  <p className="text-[#94A3B8] group-hover:text-[#2DD4BF] transition-colors text-sm break-words">
                    {info.content}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 md:p-8 rounded-3xl border border-[#334155]"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 md:py-16"
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCheckCircle className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-[#94A3B8] max-w-sm">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:border-[#2DD4BF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:border-[#2DD4BF] transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:border-[#2DD4BF] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:border-[#2DD4BF] transition-all resize-none"
                  />
                </div>
                
                <motion.button 
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-[#0f172a] font-bold text-base rounded-xl hover:shadow-lg hover:shadow-[#2DD4BF]/30 disabled:from-[#334155] disabled:to-[#1e293b] disabled:text-[#64748b] disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-[#0f172a] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 md:p-8 rounded-3xl border border-[#334155] flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Let's Create Together
              </h3>
              <p className="text-[#94A3B8] mb-8 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              {/* Social Links */}
              <div className="mb-8">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#2DD4BF]/20 flex items-center justify-center">
                    <span className="text-[#2DD4BF] text-sm">🚀</span>
                  </span>
                  Connect with me
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-lg bg-[#0f172a] border border-[#334155] hover:border-[#2DD4BF] flex items-center justify-center text-[#94A3B8] hover:text-white transition-all"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Response Time Badge */}
            <div className="mt-auto">
              <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-[#2DD4BF]/10 to-transparent rounded-2xl border border-[#2DD4BF]/20">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <FaEnvelope className="text-white text-xl" />
                </motion.div>
                <div>
                  <p className="text-white font-bold text-base">Quick Response</p>
                  <p className="text-[#94A3B8] text-sm">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;