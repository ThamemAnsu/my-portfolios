import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaGithub, FaLinkedin, FaTwitter, FaGlobe,
  FaUpload, FaSave, FaSpinner 
} from 'react-icons/fa';

// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Profile {
  id?: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  resume_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  intro_text: string | null;
}

const ProfileManagement: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          setProfile(data[0]);
          if (data[0].avatar_url) {
            setAvatarPreview(data[0].avatar_url);
          }
          if (data[0].resume_url) {
            const fileName = data[0].resume_url.split('/').pop() || 'resume.pdf';
            setResumeFileName(fileName);
          }
        } else {
          // Default profile if none exists
          setProfile({
            name: 'Thamem Ansari',
            title: 'Frontend Developer',
            bio: 'I build modern, responsive web applications with a focus on user experience and performance.',
            avatar_url: null,
            location: 'Washermenpet, Tamil Nadu, India',
            email: 'thamemansari55@gmail.com',
            phone: '+91 6381360124',
            resume_url: null,
            github_url: 'https://github.com/ThamemAnsu',
            linkedin_url: 'https://linkedin.com/in/thamemansu',
            twitter_url: 'https://twitter.com/thamemansu',
            website_url: null,
            intro_text: 'I build modern, responsive web applications with a focus on user experience and performance. Currently specializing in React, TypeScript, and AI integration for creating intelligent and interactive digital experiences.'
          });
        }
      } catch (err: any) {
        console.error('Failed to fetch profile:', err);
        setError(`Failed to load profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!profile) return;
  
  setSaving(true);
  setError(null);
  setSuccess(null);
  
  try {
    // Handle avatar upload first if there's a file
    let newAvatarUrl = profile.avatar_url;
    if (avatarFile) {
      try {
        // Generate a unique file name with timestamp
        const avatarFileName = `avatar-${Date.now()}-${avatarFile.name.replace(/\s+/g, '-')}`;
        
        console.log("Uploading avatar:", avatarFileName);
        const { error: uploadError } = await supabase.storage
          .from('avartars')
          .upload(avatarFileName, avatarFile, {
            cacheControl: '3600',
            upsert: true
          });
          
        if (uploadError) throw uploadError;
        
        // Get the public URL after successful upload
        const { data: { publicUrl } } = supabase.storage
          .from('avartars')
          .getPublicUrl(avatarFileName);
          
        newAvatarUrl = publicUrl;
        console.log("Avatar uploaded successfully:", publicUrl);
      } catch (err: any) {
        console.error("Avatar upload failed:", err.message);
        // Continue with profile update even if avatar upload fails
      }
    }
    
    // Handle resume upload if there's a file
    let newResumeUrl = profile.resume_url;
    if (resumeFile) {
      try {
        // Generate a unique file name with timestamp
        const resumeFileName = `resume-${Date.now()}-${resumeFile.name.replace(/\s+/g, '-')}`;
        
        console.log("Uploading resume:", resumeFileName);
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(resumeFileName, resumeFile, {
            cacheControl: '3600',
            upsert: true
          });
          
        if (uploadError) throw uploadError;
        
        // Get the public URL after successful upload
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(resumeFileName);
          
        newResumeUrl = publicUrl;
        console.log("Resume uploaded successfully:", publicUrl);
      } catch (err: any) {
        console.error("Resume upload failed:", err.message);
        // Continue with profile update even if resume upload fails
      }
    }
    
    // Create a new profile object with updated URLs
    const updatedProfile = {
      ...profile,
      avatar_url: newAvatarUrl,
      resume_url: newResumeUrl
    };
    
    // Update or insert the profile
    if (updatedProfile.id) {
      // Update existing profile
      console.log("Updating profile:", updatedProfile.id);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: updatedProfile.name,
          title: updatedProfile.title,
          bio: updatedProfile.bio,
          avatar_url: newAvatarUrl,
          resume_url: newResumeUrl,
          location: updatedProfile.location,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          github_url: updatedProfile.github_url,
          linkedin_url: updatedProfile.linkedin_url,
          twitter_url: updatedProfile.twitter_url,
          website_url: updatedProfile.website_url,
          intro_text: updatedProfile.intro_text
        })
        .eq('id', updatedProfile.id);
        
      if (updateError) throw updateError;
    } else {
      // Insert new profile
      console.log("Creating new profile");
      const { data, error: insertError } = await supabase
        .from('profiles')
        .insert([{
          name: updatedProfile.name,
          title: updatedProfile.title,
          bio: updatedProfile.bio,
          avatar_url: newAvatarUrl,
          resume_url: newResumeUrl,
          location: updatedProfile.location,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          github_url: updatedProfile.github_url,
          linkedin_url: updatedProfile.linkedin_url,
          twitter_url: updatedProfile.twitter_url,
          website_url: updatedProfile.website_url,
          intro_text: updatedProfile.intro_text
        }])
        .select();
        
      if (insertError) throw insertError;
      
      if (data && data.length > 0) {
        setProfile(data[0]);
      }
    }
    
    // Display success message
    setSuccess('Profile updated successfully!');
    
    // Update UI if uploads were successful
    if (newAvatarUrl !== profile.avatar_url) {
      setAvatarPreview(newAvatarUrl);
    }
    
    if (newResumeUrl !== profile.resume_url && newResumeUrl) {
      const fileName = newResumeUrl.split('/').pop() || 'resume.pdf';
      setResumeFileName(fileName);
    }
    
    // Reset file input states
    setAvatarFile(null);
    setResumeFile(null);
    
    setTimeout(() => setSuccess(null), 3000);
  } catch (err: any) {
    console.error('Failed to update profile:', err);
    setError(`Failed to update profile: ${err.message}`);
  } finally {
    setSaving(false);
  }
};
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner"></div>
        <p className="ml-2 text-gray-400">Loading profile...</p>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="p-6 bg-dark-card rounded-xl border border-gray-700 text-center">
        <FaUser className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Profile Not Found</h3>
        <p className="text-gray-400 mb-6">There was an error loading your profile.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-white">Profile Management</h2>
        
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-900/50 text-red-400">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-900/50 text-green-400">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-dark-card rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Profile Picture</h3>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-dark-lightest border-2 border-gray-700 group-hover:border-secondary transition-colors">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Avatar preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-lightest text-gray-400">
                        <FaUser size={40} />
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary-dark text-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <FaUpload />
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              
              <div className="md:w-2/3">
                <p className="text-gray-300 mb-4">
                  Upload a professional profile picture. A high-quality image will help you build a strong personal brand.
                </p>
                
                <ul className="text-sm text-gray-400 space-y-1">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Recommended size: 400x400 pixels
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Maximum file size: 2MB
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Acceptable formats: JPG, PNG, GIF
                  </li>
                </ul>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-4 py-2 bg-dark-lightest text-white hover:bg-gray-700 rounded-lg flex items-center transition-colors"
                >
                  <FaUpload className="mr-2" />
                  {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Basic Info */}
          <div className="bg-dark-card rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="title" className="form-label">Professional Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={profile.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="location" className="form-label">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profile.location || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="resume" className="form-label">Resume</label>
                <div className="relative">
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="hidden"
                  />
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={resumeFileName || 'No file chosen'}
                      className="form-input rounded-r-none flex-grow"
                    />
                    <button
                      type="button"
                      onClick={() => resumeInputRef.current?.click()}
                      className="px-4 py-2 bg-dark-lightest text-white hover:bg-gray-700 rounded-r-lg flex items-center transition-colors"
                    >
                      <FaUpload className="mr-2" />
                      Browse
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={4}
                className="form-input form-textarea"
                placeholder="Write a short bio about yourself"
                required
              ></textarea>
            </div>
            
            <div className="mt-6">
              <label htmlFor="intro_text" className="form-label">Intro Text (Hero Section)</label>
              <textarea
                id="intro_text"
                name="intro_text"
                value={profile.intro_text || ''}
                onChange={handleChange}
                rows={3}
                className="form-input form-textarea"
                placeholder="Short introduction for the hero section of your portfolio"
              ></textarea>
              <p className="text-sm text-gray-400 mt-1">
                This text will appear on the hero section of your portfolio. Keep it concise and engaging.
              </p>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="bg-dark-card rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Social Links</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="github_url" className="form-label">GitHub</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGithub className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="github_url"
                    name="github_url"
                    value={profile.github_url || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="linkedin_url" className="form-label">LinkedIn</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLinkedin className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={profile.linkedin_url || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="twitter_url" className="form-label">Twitter</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaTwitter className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="twitter_url"
                    name="twitter_url"
                    value={profile.twitter_url || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="website_url" className="form-label">Personal Website</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGlobe className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="website_url"
                    name="website_url"
                    value={profile.website_url || ''}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              disabled={saving}
              className="px-6 py-3 bg-dark-lightest text-white hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-lg shadow-lg shadow-secondary/20 hover:shadow-secondary/30 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileManagement;