import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter, FaCheckCircle } from 'react-icons/fa';
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
      link: `mailto:${profile?.email || "thamemansari55@gmail.com"}`,
      gradient: "from-[#2DD4BF] to-[#14b8a6]",
      color: "#2DD4BF"
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      content: profile?.phone || "+91 6381360124",
      link: `tel:${profile?.phone || "+916381360124"}`,
      gradient: "from-[#8B5CF6] to-[#6366F1]",
      color: "#8B5CF6"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: profile?.location || "Washermenpet, Tamil Nadu, India",
      link: "https://www.google.com/maps/place/Washermanpet,+Chennai,+Tamil+Nadu",
      gradient: "from-[#F59E0B] to-[#EF4444]",
      color: "#F59E0B"
    }
  ];
  
  return (
    <section id="contact" className="py-32 relative w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden">
      {/* Animated background gradients */}
      <motion.div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0NSwyMTIsMTkxLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#2DD4BF' : '#8B5CF6',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 2 + 0.5, 1],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
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
            <FaPaperPlane className="text-[#2DD4BF] text-lg" />
            <span className="text-[#2DD4BF] font-mono text-sm tracking-wider font-semibold uppercase">
              Get In Touch
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let's Work <span className="bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] bg-clip-text text-transparent">Together</span>
          </h2>
          
          <motion.div 
            className="h-1.5 w-32 bg-gradient-to-r from-[#2DD4BF] via-[#8B5CF6] to-[#F59E0B] rounded-full mx-auto mb-6"
            initial={{ width: 0, opacity: 0.5 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Have a question or want to work together? I'm always open to discussing new projects,
            creative ideas or opportunities to be part of your vision.
          </p>
        </motion.div>
        
        {/* Contact Info Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0.5, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {contactInfo.map((info, index) => (
            <motion.a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-6 rounded-2xl border-2 border-[#374151] hover:border-[#2DD4BF]/50 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0.5, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${info.color}15 0%, transparent 70%)`,
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 60px ${info.color}40`,
                }}
              />

              <div className="relative z-10 text-center">
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-xl`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <info.icon className="text-white text-2xl" />
                </motion.div>
                <h3 className="text-white text-lg font-bold mb-2">{info.title}</h3>
                <p className="text-[#94A3B8] group-hover:text-[#2DD4BF] transition-colors duration-300 text-sm">
                  {info.content}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 opacity-10 overflow-hidden rounded-br-2xl">
                <motion.div
                  className={`w-full h-full bg-gradient-to-br ${info.gradient}`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0.5, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2 relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-8 rounded-3xl border-2 border-[#374151] overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                boxShadow: '0 0 60px rgba(45,212,191,0.3)',
              }}
            />

            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-4">
                Let's talk about your project
              </h3>
              <p className="text-[#94A3B8] mb-8 leading-relaxed">
                I'm interested in freelance opportunities – especially ambitious or large projects. 
                However, if you have other requests or questions, don't hesitate to reach out.
              </p>
              
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] flex items-center justify-center">
                    <span className="text-white text-sm">🔗</span>
                  </span>
                  Connect with me
                </h4>
                <div className="flex gap-3">
                  {profile?.github_url && (
                    <motion.a 
                      href={profile.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#374151] to-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-white border-2 border-[#374151] hover:border-[#2DD4BF] transition-all duration-300 shadow-lg"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub size={20} />
                    </motion.a>
                  )}
                  {profile?.linkedin_url && (
                    <motion.a 
                      href={profile.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#374151] to-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-white border-2 border-[#374151] hover:border-[#0EA5E9] transition-all duration-300 shadow-lg"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedin size={20} />
                    </motion.a>
                  )}
                  {profile?.twitter_url && (
                    <motion.a 
                      href={profile.twitter_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#374151] to-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-white border-2 border-[#374151] hover:border-[#1DA1F2] transition-all duration-300 shadow-lg"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTwitter size={20} />
                    </motion.a>
                  )}
                </div>
              </div>
              
              <div className="mt-auto pt-8 border-t-2 border-[#374151]">
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-[#2DD4BF]/10 to-[#14b8a6]/5 rounded-2xl border border-[#2DD4BF]/30">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#14b8a6] flex items-center justify-center shadow-xl"
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut" 
                    }}
                  >
                    <FaEnvelope className="text-white text-2xl" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg">Fast Response</p>
                    <p className="text-[#94A3B8] text-sm">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

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
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0.5, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-3 relative bg-gradient-to-br from-[#1F2937] to-[#0F172A] p-8 rounded-3xl border-2 border-[#374151] overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              style={{
                boxShadow: '0 0 60px rgba(139,92,246,0.3)',
              }}
            />

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center py-16"
              >
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCheckCircle className="text-white text-4xl" />
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-4">Message Sent Successfully!</h3>
                <p className="text-[#94A3B8] text-lg max-w-md">
                  Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/30 rounded-2xl p-4 text-red-400 text-center"
                  >
                    {submitError}
                  </motion.div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#0F172A] border-2 border-[#374151] rounded-xl text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#2DD4BF] transition-all duration-300 font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-[#0F172A] border-2 border-[#374151] rounded-xl text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#2DD4BF] transition-all duration-300 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white text-sm font-bold mb-2">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#0F172A] border-2 border-[#374151] rounded-xl text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#2DD4BF] transition-all duration-300 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white text-sm font-bold mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-[#0F172A] border-2 border-[#374151] rounded-xl text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#2DD4BF] transition-all duration-300 resize-none font-medium"
                  ></textarea>
                </div>
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-gradient-to-r from-[#2DD4BF] to-[#14b8a6] text-[#0F172A] font-black text-lg rounded-2xl hover:shadow-2xl hover:shadow-[#2DD4BF]/40 disabled:from-[#374151] disabled:to-[#1F2937] disabled:text-[#94A3B8] disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-6 h-6 border-3 border-[#0F172A] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative z-10">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
                      <FaPaperPlane className="relative z-10" />
                    </>
                  )}
                </motion.button>
              </form>
            )}

            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-br from-[#8B5CF6] to-transparent"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;