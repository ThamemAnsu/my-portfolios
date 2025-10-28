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
    id: string;
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
  
  export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credential_url?: string;
  credential_id?: string;
  logo_url?: string;
  skills: string[];
  description?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}