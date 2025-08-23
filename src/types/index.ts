export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
  }
  
  export interface Skill {
    name: string;
    level: number; // 1-100
    category: 'frontend' | 'backend' | 'other';
  }
  
  export interface Experience {
    id: number;
    role: string;
    company: string;
    duration: string;
    description: string[];
    technologies: string[];
  }
  
  export interface Education {
    id: number;
    degree: string;
    institution: string;
    duration: string;
    description: string;
  }
  