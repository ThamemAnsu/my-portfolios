import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle, Loader } from 'lucide-react';
import { useCertifications } from '../hooks/useSupabase';

const Certifications: React.FC = () => {
  const { certifications, loading, error } = useCertifications();

  if (loading) {
    return (
      <section id="certifications" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader className="w-8 h-8 text-teal-400 animate-spin" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="certifications" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400">Error loading certifications: {error}</p>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null; // Don't show section if no certifications
  }

  return (
    <section id="certifications" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/20 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 text-sm font-medium">Certifications & Achievements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Continuously learning and validating my expertise through industry-recognized certifications
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/10 hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Badge Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {cert.logo_url ? (
                    <img src={cert.logo_url} alt={cert.issuer} className="w-10 h-10 object-contain" />
                  ) : (
                    <Award className="w-8 h-8 text-teal-400" />
                  )}
                </div>
                {cert.is_featured && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-gray-900" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-gray-400 font-medium mb-3">
                {cert.issuer}
              </p>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>{cert.date}</span>
              </div>

              {cert.description && (
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {cert.description}
                </p>
              )}

              {/* Skills Tags */}
              {cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-teal-400/10 border border-teal-400/20 rounded-full text-teal-400 text-xs font-medium"
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
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-cyan-400 transition-colors text-sm font-medium group/link"
                >
                  View Credential
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              )}

              {/* Decorative gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400/0 via-teal-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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