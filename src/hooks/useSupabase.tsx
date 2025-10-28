// src/hooks/useSupabase.ts
import { useState, useEffect } from 'react';
import { supabase, Profile, Skill, Project, Experience, Message, Certification } from '../lib/supabase';

// Hook for fetching profile data
export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        setProfile(data);
      } catch (err: any) {
        console.error('Profile fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

// Hook for fetching skills
export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        console.log('Fetching skills...');
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });

        console.log('Skills response:', { data, error });

        if (error) throw error;
        setSkills(data || []);
      } catch (err: any) {
        console.error('Skills fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};

// Hook for fetching projects
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Hook for fetching experiences
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setExperiences(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
};

// Hook for fetching certifications
export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        console.log('Fetching certifications...');
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('display_order', { ascending: true });

        console.log('Certifications response:', { data, error });

        if (error) throw error;
        setCertifications(data || []);
      } catch (err: any) {
        console.error('Certifications fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return { certifications, loading, error };
};

// Hook for fetching featured certifications only
export const useFeaturedCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCertifications = async () => {
      try {
        console.log('Fetching featured certifications...');
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .eq('is_featured', true)
          .order('display_order', { ascending: true });

        console.log('Featured certifications response:', { data, error });

        if (error) throw error;
        setCertifications(data || []);
      } catch (err: any) {
        console.error('Featured certifications fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCertifications();
  }, []);

  return { certifications, loading, error };
};

// Function for submitting contact form
export const submitContactForm = async (formData: Omit<Message, 'id' | 'created_at' | 'read'>) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([formData])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

// Admin functions for managing certifications
export const addCertification = async (certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .insert([certification])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error('Add certification error:', err);
    return { success: false, error: err.message };
  }
};

export const updateCertification = async (id: string, updates: Partial<Certification>) => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.error('Update certification error:', err);
    return { success: false, error: err.message };
  }
};

export const deleteCertification = async (id: string) => {
  try {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error('Delete certification error:', err);
    return { success: false, error: err.message };
  }
};