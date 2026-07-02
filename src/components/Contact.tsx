import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter, FaCheckCircle } from 'react-icons/fa';
import { TextScramble } from './ui/TextScramble';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in Name, Email, and Message fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Direct Contact Form',
            message: formData.message,
            read: false
          }
        ]);
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Error submitting contact message:", err);
      alert("Failed to send message: " + (err.message || err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: FaEnvelope,     title: 'Email',    content: 'thamemansari55@gmail.com', link: 'mailto:thamemansari55@gmail.com', color: '#EF4444'  },
    { icon: FaPhoneAlt,     title: 'Phone',    content: '+91 6381360124',            link: 'tel:+916381360124',              color: '#EF4444'  },
    { icon: FaMapMarkerAlt, title: 'Location', content: 'Chennai, Tamil Nadu',       link: 'https://maps.google.com/?q=Chennai,Tamil+Nadu,India', color: '#EF4444' },
  ];

  const socialLinks = [
    { icon: FaGithub,   href: 'https://github.com/ThamemAnsu',          color: '#111827' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/thamemansari',   color: '#0A66C2' },
    { icon: FaTwitter,  href: 'https://twitter.com/thamemansari',       color: '#1DA1F2' },
  ];

  const inputStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 14,
    color: 'var(--text-primary)',
    padding: '12px 16px',
    width: '100%',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            ✉️ Get In Touch
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 cursor-default select-none"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'var(--text-primary)' }}
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            <TextScramble text="Let's Build Something " trigger={headerHovered} />
            <TextScramble
              text="Amazing"
              trigger={headerHovered}
              className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent"
            />
          </h2>

          <motion.div
            className="h-1.5 rounded-full mx-auto mb-5"
            style={{ background: 'linear-gradient(90deg, #EF4444, #DC2626, #EF4444)' }}
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Have a project in mind? Let's discuss how we can work together to bring your vision to life.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {contactInfo.map((info, i) => (
            <motion.a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="group relative p-5 rounded-2xl flex items-start gap-4 transition-all"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
              }}
              whileHover={{ y: -5, borderColor: '#EF4444', boxShadow: '0 12px 30px rgba(239,68,68,0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.06)' }}
              >
                <info.icon size={18} style={{ color: '#EF4444' }} />
              </div>
              <div>
                <h3 className="font-black text-sm mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}>{info.title}</h3>
                <p className="text-sm transition-colors text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{info.content}</p>
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
            className="relative p-6 md:p-8 rounded-3xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
            }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCheckCircle style={{ color: '#fff', fontSize: 32 }} />
                </motion.div>
                <h3 className="text-2xl font-black mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}>Message Sent! 🎉</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. I'll get back to you soon!</p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}>Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = '#EF4444'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}>Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      style={inputStyle}
                      onFocus={e => { e.currentTarget.style.borderColor = '#EF4444'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}>Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={e => handleInputChange('subject', e.target.value)}
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#EF4444'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'Nunito, sans-serif' }}>Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    rows={5}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#EF4444'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                  />
                </div>

                <motion.button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 font-black text-base rounded-2xl flex items-center justify-center gap-2 relative overflow-hidden text-white"
                  style={{
                    background: isSubmitting
                      ? 'rgba(0,0,0,0.08)'
                      : 'linear-gradient(135deg, #EF4444, #DC2626)',
                    fontFamily: 'Nunito, sans-serif',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: isSubmitting ? 'none' : '0 8px 30px rgba(239,68,68,0.25)',
                    border: 'none',
                  }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-t-transparent rounded-full"
                        style={{ borderColor: 'var(--text-muted)', borderTopColor: 'transparent' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="text-gray-500">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">Send Message</span>
                      <FaPaperPlane className="relative" />
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
            className="relative p-6 md:p-8 rounded-3xl flex flex-col"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
            }}
          >
            <div className="flex-1">
              <h3
                className="text-2xl md:text-3xl font-black mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}
              >
                Let's Create{' '}
                <span className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent">
                  Together
                </span>
              </h3>
              <p className="mb-8 leading-relaxed text-gray-600">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, I'll try my best to get back to you! ✌️
              </p>

              {/* Social Links */}
              <div className="mb-8">
                <h4
                  className="font-black text-sm mb-4 flex items-center gap-2"
                  style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: 'rgba(239,68,68,0.06)' }}
                  >🎨</span>
                  Connect with me
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                      style={{
                        background: 'rgba(0,0,0,0.03)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        color: 'var(--text-muted)',
                      }}
                      whileHover={{ y: -4, scale: 1.1, color: s.color, borderColor: s.color, boxShadow: `0 8px 24px rgba(239,68,68,0.15)` }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <s.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Fun facts */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '⚡', text: 'Usually replies in 24h' },
                  { emoji: '🌍', text: 'Open to remote work' },
                  { emoji: '🎤', text: 'Tamil AI enthusiast' },
                  { emoji: '☕', text: 'Coffee-fueled builder' },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-700"
                    style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', fontFamily: 'Nunito, sans-serif' }}
                  >
                    <span className="text-base">{f.emoji}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="mt-8">
              <motion.div
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
                animate={{ borderColor: ['rgba(239,68,68,0.2)', 'rgba(239,68,68,0.45)', 'rgba(239,68,68,0.2)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <FaEnvelope style={{ color: '#fff', fontSize: 18 }} />
                </motion.div>
                <div>
                  <p className="font-black text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}>Quick Response</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Usually within 24 hours</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;