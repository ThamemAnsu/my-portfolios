// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =  'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  title: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  email?: string;
  phone?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  intro_text?: string;
}

export interface Skill {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'other';
  icon?: string;
  order_index: number;
}

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  technologies: string[];
  featured: boolean;
  order_index: number;
}

export interface Experience {
  id: string;
  created_at: string;
  updated_at: string;
  company: string;
  role: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string[];
  technologies?: string[];
  company_url?: string;
  location?: string;
  order_index: number;
}

export interface Message {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
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

export default supabase;