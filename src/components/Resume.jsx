import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaFileAlt, FaDownload, FaSync, FaEye, 
  FaPlus, FaCheck, FaBriefcase, FaCode, 
  FaFolder, FaUser, FaCog,FaStar,FaHistory,FaTrash
} from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Resume templates
const TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal',
  CREATIVE: 'creative'
};

const ResumeGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resumeList, setResumeList] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [error, setError] = useState(null);
  const [template, setTemplate] = useState(TEMPLATES.MODERN);
  const [includeSkills, setIncludeSkills] = useState(true);
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeExperience, setIncludeExperience] = useState(true);
  const [skillsCount, setSkillsCount] = useState(10);
  const [projectsCount, setProjectsCount] = useState(3);
  const [experienceCount, setExperienceCount] = useState(4);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  
  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  // Fetch data from Supabase
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch profile, skills, projects, and experiences in parallel
      const [profileData, skillsData, projectsData, experiencesData] = await Promise.all([
        fetchProfile(),
        fetchSkills(),
        fetchProjects(),
        fetchExperiences()
      ]);
      
      // Store fetched data in state
      setProfile(profileData);
      setSkills(skillsData || []);
      setProjects(projectsData || []);
      setExperiences(experiencesData || []);
      
      // Also fetch previously generated resumes from local storage
      const savedResumes = localStorage.getItem('portfolio_resumes');
      if (savedResumes) {
        setResumeList(JSON.parse(savedResumes));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch profile data
  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  };
  
  // Fetch skills data
  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });
      
    if (error) throw error;
    return data;
  };
  
  // Fetch projects data
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
      
    if (error) throw error;
    return data;
  };
  
  // Fetch experiences data
  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });
      
    if (error) throw error;
    return data;
  };
  
  // Generate a new resume
  const generateResume = () => {
    if (!profile) {
      showNotification('Profile information is required to generate a resume.', 'error');
      return;
    }
    
    setGenerating(true);
    
    try {
      // Generate resume HTML content
      const resumeHtml = generateResumeHtml();
      
      // Create a unique ID for the resume
      const id = Date.now().toString();
      
      // Create resume object
      const newResume = {
        id,
        name: `${profile.name || 'My'}'s Resume - ${new Date().toLocaleDateString()}`,
        template,
        html: resumeHtml,
        createdAt: new Date().toISOString(),
        isDefault: resumeList.length === 0, // Make first resume default
      };
      
      // Add to resume list
      const updatedResumes = [...resumeList, newResume];
      setResumeList(updatedResumes);
      
      // Save to local storage
      localStorage.setItem('portfolio_resumes', JSON.stringify(updatedResumes));
      
      // Set as selected resume
      setSelectedResume(newResume);
      
      // Show notification
      showNotification('Resume generated successfully!', 'success');
    } catch (err) {
      console.error('Error generating resume:', err);
      showNotification('Failed to generate resume. Please try again.', 'error');
    } finally {
      setGenerating(false);
    }
  };
  
  // Generate HTML content for the resume
  const generateResumeHtml = () => {
    // Get template-specific CSS
    const css = getTemplateStyles(template);
    
    // Generate HTML sections
    let profileSection = '';
    let skillsSection = '';
    let experienceSection = '';
    let projectsSection = '';
    
    // Profile section
    if (profile) {
      profileSection = `
        <section class="profile-section">
          <h1>${profile.name || 'Your Name'}</h1>
          <p class="profile-title">${profile.title || 'Professional Developer'}</p>
          
          <div class="profile-contact">
            ${profile.email ? `<p><strong>Email:</strong> ${profile.email}</p>` : ''}
            ${profile.phone ? `<p><strong>Phone:</strong> ${profile.phone}</p>` : ''}
            ${profile.location ? `<p><strong>Location:</strong> ${profile.location}</p>` : ''}
            ${profile.website_url ? `<p><strong>Website:</strong> <a href="${profile.website_url}">${profile.website_url}</a></p>` : ''}
            ${profile.github_url ? `<p><strong>GitHub:</strong> <a href="${profile.github_url}">${profile.github_url}</a></p>` : ''}
            ${profile.linkedin_url ? `<p><strong>LinkedIn:</strong> <a href="${profile.linkedin_url}">${profile.linkedin_url}</a></p>` : ''}
          </div>
          
          ${profile.bio ? `
            <div class="profile-summary">
              <h2>SUMMARY</h2>
              <p>${profile.bio}</p>
            </div>
          ` : ''}
        </section>
      `;
    }
    
    // Skills section
    if (includeSkills && skills.length > 0) {
      // Group skills by category
      const skillsByCategory = {};
      skills.slice(0, skillsCount).forEach(skill => {
        const category = skill.category || 'Other';
        if (!skillsByCategory[category]) {
          skillsByCategory[category] = [];
        }
        skillsByCategory[category].push(skill);
      });
      
      let skillsHtml = '';
      Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
        const skillNames = categorySkills.map(s => s.name).join(', ');
        skillsHtml += `
          <div class="skill-category">
            <h3>${category}</h3>
            <p>${skillNames}</p>
          </div>
        `;
      });
      
      skillsSection = `
        <section class="skills-section">
          <h2>SKILLS</h2>
          <div class="skills-content">
            ${skillsHtml}
          </div>
        </section>
      `;
    }
    
    // Experience section
    if (includeExperience && experiences.length > 0) {
      let experiencesHtml = '';
      experiences.slice(0, experienceCount).forEach(exp => {
        const startDate = new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const endDate = exp.current 
          ? 'Present' 
          : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        let descriptionItems = '';
        if (exp.description && Array.isArray(exp.description)) {
          exp.description.forEach(desc => {
            descriptionItems += `<li>${desc}</li>`;
          });
        }
        
        experiencesHtml += `
          <div class="experience-item">
            <div class="experience-header">
              <h3>${exp.role}</h3>
              <div class="experience-company">${exp.company}</div>
              <div class="experience-dates">${startDate} - ${endDate}</div>
              ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ''}
            </div>
            
            <ul class="experience-description">
              ${descriptionItems}
            </ul>
            
            ${exp.technologies && exp.technologies.length > 0 ? 
              `<p class="experience-tech">Technologies: ${exp.technologies.join(', ')}</p>` : ''}
          </div>
        `;
      });
      
      experienceSection = `
        <section class="experience-section">
          <h2>PROFESSIONAL EXPERIENCE</h2>
          <div class="experience-content">
            ${experiencesHtml}
          </div>
        </section>
      `;
    }
    
    // Projects section
    if (includeProjects && projects.length > 0) {
      let projectsHtml = '';
      projects.slice(0, projectsCount).forEach(project => {
        projectsHtml += `
          <div class="project-item">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            
            ${project.technologies && project.technologies.length > 0 ? 
              `<p class="project-tech">Technologies: ${project.technologies.join(', ')}</p>` : ''}
            
            <div class="project-links">
              ${project.github_url ? `<a href="${project.github_url}">GitHub</a>` : ''}
              ${project.live_url ? `<a href="${project.live_url}">Live Demo</a>` : ''}
            </div>
          </div>
        `;
      });
      
      projectsSection = `
        <section class="projects-section">
          <h2>PROJECTS</h2>
          <div class="projects-content">
            ${projectsHtml}
          </div>
        </section>
      `;
    }
    
    // Combine all sections into a complete HTML document
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${profile?.name || 'Professional'}'s Resume</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div class="resume-container">
          ${profileSection}
          ${skillsSection}
          ${experienceSection}
          ${projectsSection}
        </div>
        <div class="print-button" onclick="window.print()">Print Resume</div>
      </body>
      </html>
    `;
  };
  
  // Get CSS styles based on the selected template
  const getTemplateStyles = (template) => {
  switch (template) {
    case TEMPLATES.MODERN:
      return `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        body {
          background-color: #f5f5f5;
          color: #333;
          line-height: 1.6;
        }
        
        .resume-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          box-shadow: 0 5px 25px rgba(0,0,0,0.15);
          padding: 40px;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          animation: fadeIn 0.6s ease-out;
          border-top: 8px solid #2563eb;
        }
        
        .resume-container::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at top right, rgba(37, 99, 235, 0.07), transparent 70%);
          z-index: 0;
          pointer-events: none;
        }
        
        .resume-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.04), transparent 70%);
          z-index: 0;
          pointer-events: none;
        }
        
        section {
          position: relative;
          z-index: 1;
          margin-bottom: 30px;
        }
        
        h1, h2, h3 {
          color: #1e40af;
        }
        
        h1 {
          font-size: 32px;
          margin-bottom: 5px;
          position: relative;
          display: inline-block;
          font-weight: 600;
        }
        
        h1::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, #2563eb, #3b82f6);
          border-radius: 2px;
        }
        
        h2 {
          font-size: 20px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1e40af;
          padding-bottom: 8px;
          margin-bottom: 20px;
          margin-top: 35px;
          position: relative;
          font-weight: 600;
        }
        
        h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #2563eb, rgba(59, 130, 246, 0.3));
          border-radius: 1px;
        }
        
        h3 {
          font-size: 18px;
          margin-bottom: 8px;
          color: #1e3a8a;
        }
        
        .profile-title {
          font-size: 20px;
          color: #64748b;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }
        
        .profile-contact {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
          background: linear-gradient(to right, #f8fafc, #eef2ff);
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
        
        .profile-contact p {
          font-size: 15px;
          display: flex;
          align-items: center;
          color: #475569;
        }
        
        .profile-contact p strong {
          margin-right: 8px;
          color: #1e40af;
          font-weight: 600;
        }
        
        .profile-summary {
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-top: 25px;
          position: relative;
          border-left: 4px solid #2563eb;
        }
        
        .profile-summary h2 {
          margin-top: 0;
        }
        
        .profile-summary p {
          text-align: justify;
          line-height: 1.7;
          color: #475569;
        }
        
        .skills-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }
        
        .skill-category {
          background: #f8fafc;
          padding: 18px;
          border-radius: 8px;
          transition: all 0.3s;
          border-left: 4px solid #2563eb;
        }
        
        .skill-category:hover {
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.1);
          transform: translateY(-5px);
        }
        
        .skill-category h3 {
          font-size: 17px;
          color: #1e40af;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .skill-category p {
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
        }
        
        .experience-content, .projects-content {
          position: relative;
        }
        
        .experience-content::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 0;
          height: 100%;
          width: 2px;
          background: linear-gradient(to bottom, #2563eb, rgba(37, 99, 235, 0.2));
        }
        
        .experience-item {
          margin-bottom: 30px;
          padding-left: 25px;
          position: relative;
        }
        
        .experience-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #2563eb;
          z-index: 1;
        }
        
        .experience-header {
          margin-bottom: 12px;
        }
        
        .experience-company {
          font-weight: 600;
          color: #475569;
          font-size: 16px;
        }
        
        .experience-dates, .experience-location {
          font-size: 15px;
          color: #64748b;
          display: inline-block;
          margin-right: 15px;
        }
        
        .experience-description {
          padding-left: 16px;
          margin-bottom: 12px;
        }
        
        .experience-description li {
          margin-bottom: 8px;
          position: relative;
          color: #475569;
        }
        
        .experience-tech, .project-tech {
          font-size: 14px;
          color: #3b82f6;
          font-weight: 500;
          margin-top: 10px;
          display: inline-block;
          padding: 4px 12px;
          background: rgba(59, 130, 246, 0.08);
          border-radius: 4px;
        }
        
        .projects-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }
        
        .project-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 22px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: #f8fafc;
        }
        
        .project-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #2563eb;
        }
        
        .project-item:hover {
          box-shadow: 0 12px 25px rgba(0,0,0,0.07);
          transform: translateY(-5px);
        }
        
        .project-links {
          margin-top: 15px;
          display: flex;
          gap: 12px;
        }
        
        .project-links a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          padding: 6px 12px;
          border: 1px solid #2563eb;
          border-radius: 4px;
          transition: all 0.3s;
        }
        
        .project-links a:hover {
          background: #2563eb;
          color: white;
        }

        .print-button {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: #2563eb;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
          font-weight: 500;
          transition: all 0.3s;
        }
        
        .print-button:hover {
          background: #1d4ed8;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        @media print {
          body {
            background-color: white;
          }
          
          .resume-container {
            box-shadow: none;
            padding: 0;
          }
          
          .print-button {
            display: none;
          }
        }
      `;
    
    case TEMPLATES.CREATIVE:
      return `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        
        @keyframes rotateRight {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotateLeft {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        body {
          background-color: #f5f5f5;
          color: #333;
          line-height: 1.6;
        }
        
        .resume-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
          padding: 40px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
        }
        
        /* Gradient Header */
        .resume-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 15px;
          background: linear-gradient(-45deg, #FF3CAC, #784BA0, #2B86C5, #4F46E5, #9333EA);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        /* Background Pattern Elements */
        .resume-container::after {
          content: '';
          position: absolute;
          top: 50px;
          right: -80px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 50%, transparent 70%);
          z-index: 0;
        }
        
        /* Add floating shapes */
        section::before {
          content: '';
          position: fixed;
          width: 40px;
          height: 40px;
          background-color: rgba(139, 92, 246, 0.05);
          top: 20%;
          left: 10%;
          border-radius: 10px;
          transform: rotate(25deg);
          z-index: -1;
          animation: float 8s ease-in-out infinite, rotateRight 30s linear infinite;
        }
        
        .skills-section::after {
          content: '';
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid rgba(124, 58, 237, 0.1);
          bottom: -30px;
          right: 10%;
          border-radius: 50%;
          z-index: -1;
          animation: pulse 8s ease-in-out infinite, rotateLeft 40s linear infinite;
        }
        
        .profile-section::after {
          content: '';
          position: absolute;
          width: 150px;
          height: 20px;
          background: linear-gradient(90deg, rgba(99,102,241,0.05), transparent);
          bottom: 0;
          right: 0;
          border-radius: 10px;
          z-index: -1;
        }
        
        .experience-section::before {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px dashed rgba(236, 72, 153, 0.06);
          top: 30px;
          left: -50px;
          border-radius: 20px;
          transform: rotate(30deg);
          z-index: -1;
          animation: rotateLeft 40s linear infinite;
        }
        
        .projects-section::before {
          content: '';
          position: absolute;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(236,72,153,0.03) 0%, transparent 70%);
          bottom: 10%;
          left: 5%;
          border-radius: 50%;
          z-index: -1;
          animation: float 10s ease-in-out infinite;
        }
        
        /* Content Styling */
        h1, h2, h3 {
          color: #4F46E5;
          position: relative;
          z-index: 2;
        }
        
        h1 {
          font-size: 42px;
          margin-bottom: 8px;
          font-weight: 700;
          background: linear-gradient(to right, #4F46E5, #EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          position: relative;
        }
        
        h1::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100px;
          height: 5px;
          background: linear-gradient(to right, #4F46E5, #EC4899);
          border-radius: 10px;
          opacity: 0.6;
        }
        
        h2 {
          font-size: 24px;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 12px;
          margin-bottom: 30px;
          margin-top: 45px;
          letter-spacing: 3px;
          font-weight: 600;
        }
        
        h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 5px;
          width: 70px;
          background: linear-gradient(to right, #4F46E5, #EC4899);
          border-radius: 10px;
        }
        
        h3 {
          font-size: 20px;
          margin-bottom: 10px;
          background: linear-gradient(to right, #4F46E5, #7C3AED);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        
        section {
          margin-bottom: 45px;
          position: relative;
          z-index: 1;
        }
        
        .profile-title {
          font-size: 22px;
          color: #6B7280;
          margin-bottom: 25px;
          letter-spacing: 1px;
          position: relative;
          display: inline-block;
          font-weight: 300;
        }
        
        .profile-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 2px;
          background: #EC4899;
          opacity: 0.6;
        }
        
        .profile-contact {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%);
          padding: 25px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }
        
        .profile-contact::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 90% 90%, rgba(236, 72, 153, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.02) 0%, transparent 50%);
          z-index: 0;
        }
        
        .profile-contact p {
          font-size: 15px;
          display: flex;
          align-items: center;
          color: #4B5563;
          position: relative;
          z-index: 1;
          padding-left: 20px;
        }
        
        .profile-contact p::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #7C3AED;
          font-size: 22px;
        }
        
        .profile-contact p strong {
          font-weight: 600;
          margin-right: 8px;
          color: #4F46E5;
        }
        
        .profile-summary {
          position: relative;
          padding: 30px;
          border-radius: 16px;
          background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
          margin-top: 40px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.03);
        }
        
        .profile-summary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at top left, rgba(99, 102, 241, 0.06) 0%, transparent 30%),
            radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.06) 0%, transparent 30%),
            linear-gradient(60deg, rgba(167, 139, 250, 0.01) 0%, transparent 100%);
          border-radius: 16px;
          z-index: -1;
        }
        
        .profile-summary::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 30px;
          width: 100px;
          height: 10px;
          background: rgba(99, 102, 241, 0.1);
          filter: blur(10px);
          border-radius: 50%;
        }
        
        .profile-summary p {
          text-align: justify;
          line-height: 1.9;
          color: #4B5563;
          position: relative;
          z-index: 1;
          font-size: 16px;
        }
        
        .skills-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 25px;
          position: relative;
        }
        
        .skill-category {
          background: linear-gradient(145deg, #FFFFFF, #F9FAFB);
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.04);
          transition: all 0.4s;
          position: relative;
          z-index: 1;
          overflow: hidden;
          border: 1px solid rgba(99, 102, 241, 0.08);
        }
        
        .skill-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(to right, #4F46E5, #7C3AED);
          opacity: 0.7;
          transition: all 0.3s;
        }
        
        .skill-category::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70px;
          height: 70px;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
        }
        
        .skill-category:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.2);
        }
        
        .skill-category:hover::before {
          height: 8px;
        }
        
        .skill-category h3 {
          font-size: 18px;
          margin-bottom: 15px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          position: relative;
        }
        
        .skill-category p {
          color: #6B7280;
          line-height: 1.7;
          font-size: 15px;
        }
        
        .experience-content {
          position: relative;
          padding-left: 20px;
        }
        
        .experience-content::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to bottom, #4F46E5, rgba(167, 139, 250, 0.3));
          border-radius: 3px;
        }
        
        .experience-item {
          margin-bottom: 40px;
          padding-left: 30px;
          position: relative;
          z-index: 1;
        }
        
        .experience-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(to right, #4F46E5, #EC4899);
          z-index: 2;
          box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.1);
        }
        
        .experience-item::after {
          content: '';
          position: absolute;
          top: 6px;
          left: -4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          z-index: 3;
        }
        
        .experience-header {
          margin-bottom: 15px;
          background: linear-gradient(145deg, #FFFFFF, #F9FAFB);
          padding: 15px 20px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.03);
          position: relative;
          overflow: hidden;
        }
        
        .experience-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(to bottom, #4F46E5, #7C3AED);
          opacity: 0.8;
        }
        
        .experience-company {
          font-weight: 600;
          color: #4B5563;
          font-size: 17px;
          margin-top: 5px;
        }
        
        .experience-dates, .experience-location {
          font-size: 14px;
          color: #6B7280;
          font-style: italic;
          margin-top: 5px;
        }
        
        .experience-description {
          padding-left: 20px;
          margin-bottom: 15px;
        }
        
        .experience-description li {
          margin-bottom: 10px;
          position: relative;
          color: #4B5563;
          font-size: 15px;
        }
        
        .experience-description li::marker {
          color: #7C3AED;
        }
        
        .experience-tech, .project-tech {
          font-size: 14px;
          color: #6366F1;
          font-weight: 500;
          margin-top: 12px;
          background: rgba(99, 102, 241, 0.08);
          padding: 8px 15px;
          border-radius: 20px;
          display: inline-block;
          box-shadow: 0 2px 10px rgba(99, 102, 241, 0.06);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        
        .experience-tech::after, .project-tech::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 70%),
            radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.05), transparent 70%);
          z-index: -1;
        }
        
        .projects-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .project-item {
          padding: 30px;
          border-radius: 16px;
          background: linear-gradient(145deg, #FFFFFF, #F9FAFB);
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
          z-index: 1;
          border: 1px solid rgba(99, 102, 241, 0.08);
        }
        
        .project-item::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.15), transparent 70%);
          border-radius: 50%;
          z-index: -1;
        }
        
        .project-item::after {
          content: '';
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 70%);
          border-radius: 50%;
          z-index: -1;
        }
        
        .project-item:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
        }
        
        .project-item h3::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
          transform: skewX(-20deg);
          animation: float 10s linear infinite;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .project-item:hover h3::before {
          opacity: 1;
        }
        
        .project-links {
          margin-top: 20px;
          display: flex;
          gap: 15px;
          position: relative;
          z-index: 1;
        }
        
        .project-links a {
          color: white;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 20px;
          background: linear-gradient(to right, #4F46E5, #7C3AED);
          font-size: 14px;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .project-links a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: all 0.5s;
        }
        
        .project-links a:hover::before {
          left: 100%;
        }
        
        .project-links a:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
          background: linear-gradient(to right, #6366F1, #A78BFA);
        }
        
        .print-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(to right, #4F46E5, #7C3AED);
          color: white;
          padding: 14px 24px;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          transition: all 0.3s;
          z-index: 999;
        }
        
        .print-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          background: linear-gradient(to right, #4338CA, #7C3AED);
        }
        
        .print-button::before {
          content: '🖨️';
          font-size: 18px;
        }
        
        @media print {
          body {
            background-color: white;
          }
          
          .resume-container {
            box-shadow: none;
            padding: 0;
          }
          
          .print-button {
            display: none;
          }
        }
      `;
    
    case TEMPLATES.CLASSIC:
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Garamond', 'Cambria', 'Times New Roman', Times, serif;
    }
    
    body {
      background-color: #f5f5f5;
      color: #333;
      line-height: 1.5;
    }
    
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff9f5;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d1c6bc' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E");
      box-shadow: 0 0 25px rgba(0,0,0,0.1);
      padding: 50px 60px;
      position: relative;
      border: 1px solid #e0d5cc;
    }
    
    .resume-container::before {
      content: '';
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      bottom: 12px;
      border: 1px solid #e0d5cc;
      pointer-events: none;
      z-index: 0;
    }
    
    h1, h2, h3 {
      color: #2c1f1a;
      font-family: 'Garamond', serif;
      position: relative;
      z-index: 1;
    }
    
    h1 {
      font-size: 38px;
      margin-bottom: 5px;
      text-align: center;
      font-weight: 700;
      letter-spacing: 1px;
      color: #1c1108;
      position: relative;
    }
    
    h1::after {
      content: '';
      width: 120px;
      height: 1px;
      background: #a38f7d;
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    h2 {
      font-size: 22px;
      text-align: left;
      text-transform: uppercase;
      letter-spacing: 3px;
      border-bottom: 2px solid #a38f7d;
      padding-bottom: 8px;
      margin-bottom: 20px;
      margin-top: 40px;
      color: #2c1f1a;
      position: relative;
    }
    
    h2::after {
      content: '❧';
      position: absolute;
      right: 0;
      bottom: 5px;
      font-size: 16px;
      color: #a38f7d;
      transform: rotate(10deg);
    }
    
    h3 {
      font-size: 20px;
      margin-bottom: 5px;
      color: #3a2c25;
    }
    
    section {
      margin-bottom: 35px;
      position: relative;
      z-index: 1;
    }
    
    .profile-title {
      font-size: 20px;
      color: #5a483f;
      margin-bottom: 20px;
      text-align: center;
      font-style: italic;
      letter-spacing: 0.5px;
    }
    
    .profile-contact {
      text-align: center;
      margin: 20px 0 30px;
      position: relative;
      padding: 15px 0;
      border-top: 1px solid #e0d5cc;
      border-bottom: 1px solid #e0d5cc;
    }
    
    .profile-contact p {
      display: inline-block;
      margin: 0 15px;
      font-size: 16px;
      color: #5a483f;
    }
    
    .profile-contact p strong {
      font-weight: 600;
      color: #3a2c25;
    }
    
    .profile-contact p a {
      color: #3a2c25;
      text-decoration: none;
      border-bottom: 1px dotted #a38f7d;
    }
    
    .profile-contact p a:hover {
      border-bottom: 1px solid #a38f7d;
    }
    
    .profile-summary p {
      text-align: justify;
      margin-bottom: 25px;
      line-height: 1.7;
      font-size: 16px;
      color: #4a3b32;
    }
    
    .skills-section {
      display: block;
      position: relative;
    }
    
    .skills-content {
      column-count: 2;
      column-gap: 40px;
    }
    
    .skill-category {
      margin-bottom: 22px;
      break-inside: avoid;
      position: relative;
      padding-left: 5px;
    }
    
    .skill-category::before {
      content: '•';
      position: absolute;
      left: -10px;
      top: 3px;
      color: #a38f7d;
    }
    
    .skill-category h3 {
      font-size: 18px;
      text-decoration: none;
      font-weight: 600;
      margin-bottom: 10px;
      font-style: normal;
      color: #3a2c25;
      border-bottom: 1px dotted #e0d5cc;
      padding-bottom: 5px;
    }
    
    .skill-category p {
      font-size: 16px;
      line-height: 1.6;
      color: #4a3b32;
    }
    
    .experience-item, .project-item {
      margin-bottom: 35px;
      position: relative;
      padding-left: 5px;
    }
    
    .experience-item::before, .project-item::before {
      content: '◆';
      position: absolute;
      left: -15px;
      top: 5px;
      font-size: 12px;
      color: #a38f7d;
    }
    
    .experience-header {
      margin-bottom: 12px;
      position: relative;
    }
    
    .experience-company {
      font-weight: bold;
      font-size: 17px;
      color: #3a2c25;
    }
    
    .experience-dates, .experience-location {
      font-size: 16px;
      font-style: italic;
      display: inline-block;
      margin-right: 15px;
      color: #5a483f;
    }
    
    .experience-dates::before {
      content: '|';
      margin-right: 10px;
      color: #a38f7d;
    }
    
    .experience-description {
      padding-left: 20px;
      margin: 15px 0 18px;
      position: relative;
    }
    
    .experience-description li {
      margin-bottom: 8px;
      font-size: 16px;
      color: #4a3b32;
      list-style-type: circle;
    }
    
    .experience-description li::marker {
      color: #a38f7d;
    }
    
    .experience-tech, .project-tech {
      font-size: 15px;
      font-style: italic;
      margin-top: 10px;
      color: #5a483f;
      text-align: right;
      border-top: 1px dotted #e0d5cc;
      padding-top: 5px;
    }
    
    .project-item {
      margin-bottom: 35px;
      padding: 0 5px;
    }
    
    .project-item h3 {
      position: relative;
      display: inline-block;
      padding-right: 25px;
    }
    
    .project-item h3::after {
      content: '✧';
      position: absolute;
      right: 0;
      top: 0;
      font-size: 16px;
      color: #a38f7d;
    }
    
    .project-item p {
      margin-top: 10px;
      line-height: 1.6;
      color: #4a3b32;
    }
    
    .project-links {
      margin-top: 15px;
      text-align: right;
    }
    
    .project-links a {
      color: #3a2c25;
      text-decoration: none;
      margin-right: 20px;
      font-weight: 600;
      border-bottom: 1px dotted #a38f7d;
      font-size: 15px;
      position: relative;
      padding: 0 5px;
    }
    
    .project-links a:hover {
      border-bottom: 1px solid #a38f7d;
    }
    
    .project-links a::before {
      content: '•';
      position: absolute;
      left: -10px;
      color: #a38f7d;
    }
    
    .print-button {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #3a2c25;
      color: white;
      padding: 12px 20px;
      border-radius: 0;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      display: block;
      font-family: 'Garamond', serif;
      transition: all 0.3s;
      font-size: 16px;
      letter-spacing: 1px;
    }
    
    .print-button:hover {
      background: #5a483f;
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }
    
    @media print {
      body {
        background-color: white;
      }
      
      .resume-container {
        box-shadow: none;
        padding: 0;
        border: none;
      }
      
      .resume-container::before {
        display: none;
      }
      
      .print-button {
        display: none;
      }
    }
  `;

    case TEMPLATES.MINIMAL:
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    
    body {
      background-color: #f5f5f5;
      color: #333;
      line-height: 1.6;
    }
    
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 60px;
      position: relative;
    }
    
    .resume-container::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 15px;
      width: calc(100% - 30px);
      height: calc(100% - 30px);
      border: 1px solid #f0f0f0;
      pointer-events: none;
      z-index: 0;
    }
    
    h1, h2, h3 {
      font-weight: 300;
      color: #333;
      position: relative;
      z-index: 1;
    }
    
    h1 {
      font-size: 36px;
      margin-bottom: 8px;
      letter-spacing: 2px;
      position: relative;
    }
    
    h1::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 0;
      width: 30px;
      height: 2px;
      background: #999;
    }
    
    h2 {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #999;
      margin-bottom: 25px;
      margin-top: 40px;
      font-weight: 400;
      position: relative;
    }
    
    h2::before {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #f0f0f0;
    }
    
    h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    
    section {
      margin-bottom: 45px;
      position: relative;
      z-index: 1;
    }
    
    .profile-title {
      font-size: 20px;
      color: #666;
      margin-bottom: 25px;
      font-weight: 300;
      letter-spacing: 0.5px;
    }
    
    .profile-contact {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 35px;
      color: #666;
      position: relative;
    }
    
    .profile-contact p {
      font-size: 15px;
      position: relative;
      padding-left: 0;
      color: #666;
    }
    
    .profile-contact p strong {
      display: none;
    }
    
    .profile-contact p a {
      color: #666;
      text-decoration: none;
      border-bottom: 1px solid #eee;
      transition: border 0.3s;
    }
    
    .profile-contact p a:hover {
      border-bottom: 1px solid #999;
    }
    
    .profile-summary {
      margin-top: 30px;
    }
    
    .profile-summary p {
      text-align: justify;
      color: #666;
      font-size: 16px;
      line-height: 1.9;
      max-width: 95%;
    }
    
    .skills-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 30px;
      margin-top: 20px;
    }
    
    .skill-category {
      margin-bottom: 25px;
      position: relative;
    }
    
    .skill-category h3 {
      font-size: 17px;
      color: #444;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
      font-weight: 500;
    }
    
    .skill-category p {
      color: #666;
      line-height: 1.8;
      font-size: 15px;
    }
    
    .experience-content {
      position: relative;
    }
    
    .experience-item, .project-item {
      margin-bottom: 35px;
      position: relative;
    }
    
    .experience-item::before {
      content: '';
      position: absolute;
      left: -20px;
      top: 12px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ddd;
    }
    
    .experience-header {
      margin-bottom: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .experience-role-company {
      flex-grow: 1;
    }
    
    .experience-meta {
      text-align: right;
      min-width: 170px;
    }
    
    .experience-company {
      font-weight: 400;
      color: #666;
      font-size: 16px;
    }
    
    .experience-dates, .experience-location {
      font-size: 15px;
      color: #999;
      display: block;
      margin-bottom: 4px;
      text-align: right;
    }
    
    .experience-description {
      padding-left: 0;
      margin-bottom: 15px;
      list-style-position: inside;
    }
    
    .experience-description li {
      margin-bottom: 10px;
      color: #666;
      position: relative;
      padding-left: 20px;
      list-style-type: none;
    }
    
    .experience-description li::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #ccc;
    }
    
    .experience-tech, .project-tech {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
      font-style: italic;
    }
    
    .projects-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 35px;
      margin-top: 20px;
    }
    
    .project-item {
      padding: 0;
      position: relative;
      border-left: 1px solid #eee;
      padding-left: 20px;
    }
    
    .project-item h3 {
      margin-bottom: 12px;
    }
    
    .project-item p {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.7;
    }
    
    .project-links {
      margin-top: 15px;
    }
    
    .project-links a {
      color: #666;
      text-decoration: none;
      margin-right: 20px;
      font-size: 15px;
      position: relative;
      transition: all 0.3s;
      letter-spacing: 0.5px;
    }
    
    .project-links a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 0;
      height: 1px;
      background: #333;
      transition: width 0.3s ease;
    }
    
    .project-links a:hover {
      color: #333;
    }
    
    .project-links a:hover::after {
      width: 100%;
    }
    
    .print-button {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #333;
      color: white;
      padding: 12px 20px;
      border-radius: 0;
      cursor: pointer;
      font-weight: 300;
      letter-spacing: 2px;
      font-size: 14px;
      box-shadow: none;
      transition: all 0.3s;
      text-transform: uppercase;
    }
    
    .print-button:hover {
      background: #555;
      transform: translateY(-3px);
    }
    
    @media print {
      body {
        background-color: white;
      }
      
      .resume-container {
        padding: 0;
      }
      
      .resume-container::before {
        display: none;
      }
      
      .print-button {
        display: none;
      }
    }
  `;
  }
};
  
  // Delete a resume
  const deleteResume = (id) => {
    const updatedResumes = resumeList.filter(resume => resume.id !== id);
    setResumeList(updatedResumes);
    localStorage.setItem('portfolio_resumes', JSON.stringify(updatedResumes));
    
    if (selectedResume && selectedResume.id === id) {
      setSelectedResume(updatedResumes.length > 0 ? updatedResumes[0] : null);
    }
    
    showNotification('Resume deleted successfully', 'success');
  };
  
  // Set a resume as default
  const setAsDefault = (id) => {
    const updatedResumes = resumeList.map(resume => ({
      ...resume,
      isDefault: resume.id === id
    }));
    
    setResumeList(updatedResumes);
    localStorage.setItem('portfolio_resumes', JSON.stringify(updatedResumes));
    
    // Update profile with this resume URL if we have one in the DB
    if (profile && profile.id) {
      updateProfileResumeUrl(id);
    }
    
    showNotification('Default resume updated', 'success');
  };
  
  // Update profile's resume URL in Supabase
  const updateProfileResumeUrl = async (resumeId) => {
    const defaultResume = resumeList.find(r => r.id === resumeId);
    
    // We can't store the HTML directly in Supabase, so we just note that a resume exists
    if (defaultResume && profile) {
      try {
        await supabase
          .from('profiles')
          .update({ 
            resume_url: `Resume: ${defaultResume.name} (available in Resume Generator)` 
          })
          .eq('id', profile.id);
      } catch (err) {
        console.error('Failed to update profile resume URL:', err);
      }
    }
  };
  
  // Show a notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };
  
  // Download selected resume
  const downloadResume = () => {
    if (!selectedResume) return;
    
    const blob = new Blob([selectedResume.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedResume.name.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Preview the selected resume in a new tab
  const previewResume = () => {
    if (!selectedResume) return;
    
    const newWindow = window.open();
    newWindow.document.write(selectedResume.html);
    newWindow.document.close();
  };
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between bg-dark-card p-6 rounded-xl border border-dark-lightest"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            <FaFileAlt className="mr-3 text-blue-500" />
            Resume Generator
          </h1>
          <p className="text-gray-400 mt-1">Automatically generate and manage your professional resume</p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateResume}
            disabled={generating || loading || !profile}
            className={`px-4 py-2 rounded-lg flex items-center ${
              generating || loading || !profile 
                ? 'bg-gray-700 cursor-not-allowed text-gray-500' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {generating ? (
              <>
                <div className="spinner mr-2 h-5 w-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                <span>Generate New Resume</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-lg bg-dark-lightest text-gray-400 hover:text-white transition-colors"
            title="Refresh Data"
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
          </motion.button>
        </div>
      </motion.div>
      
      {/* Error Notification */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
          {error}
        </div>
      )}
      
      {/* Success/Error Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 rounded-xl border ${
            notification.type === 'success'
              ? 'bg-green-900/30 border-green-500/50 text-green-400'
              : 'bg-red-900/30 border-red-500/50 text-red-400'
          }`}
        >
          <p>{notification.message}</p>
        </motion.div>
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Resume History */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-card rounded-xl border border-dark-lightest p-6 h-full"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FaHistory className="mr-2 text-blue-500" />
              Resume History
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="spinner h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : resumeList.length === 0 ? (
              <div className="text-center py-10 bg-dark-lighter rounded-lg">
                <FaFileAlt className="mx-auto text-4xl text-gray-600 mb-4" />
                <h3 className="text-gray-300 font-medium mb-2">No Resumes Yet</h3>
                <p className="text-gray-500 text-sm px-6">
                  Generate your first resume by clicking the "Generate New Resume" button above.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {resumeList.map(resume => (
                  <motion.div
                    key={resume.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedResume?.id === resume.id
                        ? 'bg-blue-900/30 border-blue-500/50'
                        : 'bg-dark-lighter border-dark-lightest hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedResume(resume)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-2">
                        <FaFileAlt className={`${selectedResume?.id === resume.id ? 'text-blue-500' : 'text-gray-500'}`} />
                        <h3 className="font-medium text-sm">{resume.name}</h3>
                      </div>
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAsDefault(resume.id);
                          }}
                          className={`p-1 rounded text-xs ${
                            resume.isDefault
                              ? 'text-blue-500 cursor-not-allowed'
                              : 'text-gray-400 hover:text-blue-500'
                          }`}
                          disabled={resume.isDefault}
                          title="Set as Default"
                        >
                          <FaStar size={12} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Are you sure you want to delete this resume?')) {
                              deleteResume(resume.id);
                            }
                          }}
                          className="p-1 rounded text-gray-400 hover:text-red-500"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-gray-500 text-xs flex items-center justify-between mt-2">
                      <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                      <span className="capitalize">{resume.template}</span>
                      {resume.isDefault && (
                        <span className="bg-blue-900/50 text-blue-400 px-1.5 py-0.5 rounded text-xs flex items-center">
                          <FaCheck className="mr-1" size={8} /> Default
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Template Settings */}
            <div className="mt-6 pt-6 border-t border-dark-lightest">
              <h3 className="text-lg font-medium mb-4">Template Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Resume Template</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full bg-dark-lighter border border-dark-lightest rounded-lg p-2 text-white"
                  >
                    <option value={TEMPLATES.MODERN}>Modern</option>
                    <option value={TEMPLATES.CLASSIC}>Classic</option>
                    <option value={TEMPLATES.MINIMAL}>Minimal</option>
                    <option value={TEMPLATES.CREATIVE}>Creative</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Sections to Include</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-skills"
                        checked={includeSkills}
                        onChange={(e) => setIncludeSkills(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="include-skills" className="text-gray-300">Skills</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-projects"
                        checked={includeProjects}
                        onChange={(e) => setIncludeProjects(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="include-projects" className="text-gray-300">Projects</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-experience"
                        checked={includeExperience}
                        onChange={(e) => setIncludeExperience(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="include-experience" className="text-gray-300">Experience</label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Skills</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={skillsCount}
                      onChange={(e) => setSkillsCount(parseInt(e.target.value) || 10)}
                      className="w-full bg-dark-lighter border border-dark-lightest rounded-lg p-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Projects</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={projectsCount}
                      onChange={(e) => setProjectsCount(parseInt(e.target.value) || 3)}
                      className="w-full bg-dark-lighter border border-dark-lightest rounded-lg p-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Experience</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={experienceCount}
                      onChange={(e) => setExperienceCount(parseInt(e.target.value) || 4)}
                      className="w-full bg-dark-lighter border border-dark-lightest rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right Column - Resume Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-dark-card rounded-xl border border-dark-lightest p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <FaEye className="mr-2 text-blue-500" />
              Resume Preview
            </h2>
            
            {selectedResume && (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadResume}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center text-sm"
                >
                  <FaDownload className="mr-2" />
                  <span>Download</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={previewResume}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center text-sm"
                >
                  <FaEye className="mr-2" />
                  <span>Preview</span>
                </motion.button>
              </div>
            )}
          </div>
          
          <div className="border border-dark-lightest rounded-lg overflow-hidden bg-white h-[600px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <div className="spinner h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Loading preview...</p>
              </div>
            ) : selectedResume ? (
              <iframe 
                srcDoc={selectedResume.html}
                title="Resume Preview"
                className="w-full h-full"
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              <div className="text-center p-8">
                <FaFileAlt className="mx-auto text-5xl text-gray-300 mb-4" />
                <h3 className="text-gray-700 font-medium mb-2">No Resume Selected</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {resumeList.length === 0 
                    ? 'Generate your first resume to see a preview here.' 
                    : 'Select a resume from the list to preview it here.'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Section - Data Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-dark-card rounded-lg border border-dark-lightest p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 mr-3">
              <FaCode />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Skills</p>
              <p className="text-white text-xl font-semibold">{skills.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg border border-dark-lightest p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500/20 text-green-400 mr-3">
              <FaFolder />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Projects</p>
              <p className="text-white text-xl font-semibold">{projects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg border border-dark-lightest p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 mr-3">
              <FaBriefcase />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Experiences</p>
              <p className="text-white text-xl font-semibold">{experiences.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg border border-dark-lightest p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 mr-3">
              <FaFileAlt />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Resumes</p>
              <p className="text-white text-xl font-semibold">{resumeList.length}</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-lg p-6"
      >
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/admin/profile')}
            className="bg-dark-card rounded-lg p-4 border border-blue-500/10 hover:border-blue-500/30 transition-all flex items-center"
          >
            <FaUser className="text-blue-500 mr-3" />
            <span>Update Profile</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/skills')}
            className="bg-dark-card rounded-lg p-4 border border-green-500/10 hover:border-green-500/30 transition-all flex items-center"
          >
            <FaCode className="text-green-500 mr-3" />
            <span>Manage Skills</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/experience')}
            className="bg-dark-card rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all flex items-center"
          >
            <FaBriefcase className="text-purple-500 mr-3" />
            <span>Update Experience</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeGenerator;

