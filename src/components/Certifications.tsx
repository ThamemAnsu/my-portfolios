import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, CheckCircle, Loader } from 'lucide-react';
import { useCertifications } from '../hooks/useSupabase';
import { TextScramble } from './ui/TextScramble';

const Certifications: React.FC = () => {
  const { certifications, loading, error } = useCertifications();
  const [headerHovered, setHeaderHovered] = useState(false);

  if (loading) {
    return (
      <section id="certifications" className="py-20 px-6 relative" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader className="w-8 h-8 text-[#EF4444] animate-spin" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="certifications" className="py-20 px-6 relative" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">Error loading certifications: {error}</p>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null; // Don't show section if no certifications
  }

  return (
    <section id="certifications" className="py-20 px-6 relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.25)',
              color: '#EF4444',
            }}
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Certifications & Achievements</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4 cursor-default select-none animate-fade-in"
            style={{ color: 'var(--text-primary)', fontFamily: 'Nunito, sans-serif' }}
            onMouseEnter={() => setHeaderHovered(true)}
            onMouseLeave={() => setHeaderHovered(false)}
          >
            <TextScramble text="Professional " trigger={headerHovered} />
            <TextScramble
              text="Certifications"
              trigger={headerHovered}
              className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] bg-clip-text text-transparent"
            />
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Continuously learning and validating my expertise through industry-recognized credentials.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="group relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              style={{
                background: '#FFFFFF',
                borderColor: 'rgba(0,0,0,0.06)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Badge Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.06))' }}
                >
                  {cert.logo_url ? (
                    <img src={cert.logo_url} alt={cert.issuer} className="w-10 h-10 object-contain" />
                  ) : (
                    <Award className="w-8 h-8 text-[#EF4444]" />
                  )}
                </div>
                {cert.is_featured && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#EF4444' }}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#EF4444] transition-colors" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {cert.title}
              </h3>
              
              <p className="font-semibold mb-3 text-sm text-gray-600">
                {cert.issuer}
              </p>

              <div className="flex items-center gap-2 text-xs mb-4 text-gray-500">
                <Calendar className="w-4 h-4 text-[#EF4444]" />
                <span>{cert.date}</span>
              </div>

              {cert.description && (
                <p className="text-sm mb-4 line-clamp-2 text-gray-600">
                  {cert.description}
                </p>
              )}

              {/* Skills Tags */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(239,68,68,0.05)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#EF4444',
                        fontFamily: 'Nunito, sans-serif'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* View Credential Link */}
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-black transition-colors group/link"
                  style={{ color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}
                >
                  View Credential
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Certifications;