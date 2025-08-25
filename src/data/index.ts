// src/data/index.ts
import { Project, Skill, Experience, Education } from '../types';

export const projects: Project[] =[
  {
    id: 1,
    title: "AI-Powered Voice Conversation Agent",
    description: "Enterprise-grade real-time voice chatbot processing 500+ daily interactions.",
    technologies: ["React", "Node.js", "Whisper STT", "LangChain", "Supabase"],
    githubUrl: "https://github.com/your-repo",
    liveUrl: "",
    image: "/projects/voice-ai.jpg"
  },
  {
    id: 2,
    title: "Advanced SSO Authentication Platform",
    description: "Developed using Supabase Edge Functions, later upgraded to Authentik-based solution.",
    technologies: ["Supabase", "Next.js", "Node.js", "Authentik"],
    githubUrl: "",
    liveUrl: "",
    image: "/projects/sso.jpg"
  },
  {
    id: 3,
    title: "Intelligent Document Processing System",
    description: "AI-powered OCR pipeline processing multiple document formats.",
    technologies: ["OCR Models", "Python", "Flask", "Docker"],
    githubUrl: "",
    liveUrl: "",
    image: "/projects/ocr.jpg"
  },
  {
    id: 4,
    title: "Interactive Quiz Application",
    description: "Full-stack quiz platform using React, Supabase, and Lovable AI.",
    technologies: ["React", "Supabase", "AI"],
    githubUrl: "",
    liveUrl: "",
    image: "/projects/quiz.jpg"
  },
  {
    id: 5,
    title: "WhatsApp Business Automation",
    description: "Designed automated customer workflows using Turn.io and Meta Flow.",
    technologies: ["Turn.io", "Meta Flow", "Node.js"],
    githubUrl: "",
    liveUrl: "",
    image: "/projects/whatsapp.jpg"
  },
];

export const skills: Skill[] = [
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Next.js", level: 75, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "Flask", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 80, category: "other" },
  { name: "Supabase", level: 85, category: "other" },
  { name: "LangChain / Whisper STT", level: 75, category: "other" },
  { name: "Docker & CI/CD", level: 70, category: "other" },
  { name: "Figma & UX Design", level: 65, category: "other" },
];

export const experiences: Experience[] = [
  {
    id: "team-everest",
    company: "Team Everest",
    role: "Junior Developer",
    duration: "June 2024 - Present",
    description: [
      "Architected Real-Time Voice AI System for scalable enterprise use",
      "Implemented Enterprise SSO Solution with secure multi-app access",
      "Optimized Business Process Automation reducing manual work by 70%",
      "Developed Advanced OCR Pipeline with high accuracy document processing",
    ],
    technologies: ["React", "Node.js", "Supabase", "LangChain", "Whisper STT", "Docker"],
  },
  {
    id: "whytap",
    company: "WhyTap",
    role: "Software Development Intern",
    duration: "January 2024 - June 2024",
    description: [
      "Delivered Full-Stack Solutions from concept to deployment",
      "Enhanced API Performance for improved response times",
      "Collaborated on Agile Development with cross-functional teams",
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL"],
  },
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    duration: "2019 - 2023",
    description: "Focused on software development, algorithms, and data structures. Participated in coding competitions and hackathons."
  }
];