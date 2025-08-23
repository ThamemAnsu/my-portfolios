// src/data/index.ts
import { Project, Skill, Experience, Education } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A modern portfolio website built with React, TypeScript, and Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    githubUrl: "https://github.com/ThamemAnsu/my-portfolio",
    liveUrl: "https://thamemansu.github.io/my-portfolio",
    image: "/project1.jpg"
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "A responsive dashboard for e-commerce analytics with user authentication and real-time data visualization.",
    technologies: ["React", "Redux", "Firebase", "Chart.js"],
    githubUrl: "https://github.com/ThamemAnsu/ecommerce-dashboard",
    image: "/project2.jpg"
  },
  {
    id: 3,
    title: "Weather Application",
    description: "A weather application that provides real-time forecasts based on user location or search queries.",
    technologies: ["React", "OpenWeather API", "Styled Components"],
    githubUrl: "https://github.com/ThamemAnsu/weather-app",
    liveUrl: "https://thamemansu-weather.netlify.app",
    image: "/project3.jpg"
  }
];

export const skills: Skill[] = [
  { name: "HTML", level: 90, category: "frontend" },
  { name: "CSS", level: 85, category: "frontend" },
  { name: "JavaScript", level: 88, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "Express", level: 70, category: "backend" },
  { name: "MongoDB", level: 65, category: "backend" },
  { name: "Git", level: 85, category: "other" },
  { name: "GitHub", level: 85, category: "other" },
  { name: "Figma", level: 60, category: "other" }
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2023 - Present",
    description: [
      "Developed and maintained responsive web applications using React and TypeScript",
      "Collaborated with designers to implement pixel-perfect UI components",
      "Improved application performance by 30% through code optimization"
    ],
    technologies: ["React", "TypeScript", "Redux", "Tailwind CSS"]
  },
  {
    id: 2,
    role: "Web Developer Intern",
    company: "Digital Creatives",
    duration: "Jun 2022 - Dec 2022",
    description: [
      "Assisted in developing frontend features for client websites",
      "Created reusable UI components using React",
      "Participated in code reviews and team meetings"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React"]
  }
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