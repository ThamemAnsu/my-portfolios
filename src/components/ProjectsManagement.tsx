import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, 
  FaExternalLinkAlt, FaGithub, FaImage, FaUpload, FaSave, FaSpinner,
  FaExclamationTriangle, FaDatabase, FaFolder
} from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  live_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  order_index: number;
  created_at?: string;
}

// Schema validation helper
const checkDatabaseSchema = async () => {
  try {
    const testData = {
      title: '__schema_check__',
      description: 'test',
      live_url: null,
      github_url: null,
      image_url: null,
      long_description: null,
      technologies: [],
      featured: false,
      order_index: 999999
    };
    
    const { error } = await supabase
      .from('projects')
      .insert([testData])
      .select();
    
    if (error) {
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        return {
          valid: false,
          missingColumns: error.message.match(/"([^"]+)"/)?.[1] || 'unknown'
        };
      }
      return { valid: false, error: error.message };
    }
    
    await supabase
      .from('projects')
      .delete()
      .eq('title', '__schema_check__');
    
    return { valid: true };
  } catch (err: any) {
    return { valid: false, error: err.message };
  }
};

// Main Projects Management Component
const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schemaError, setSchemaError] = useState<{valid: boolean; missingColumns?: string; error?: string} | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'regular'>('all');
  
  useEffect(() => {
    initializeComponent();
  }, []);
  
  const initializeComponent = async () => {
    const schemaCheck = await checkDatabaseSchema();
    
    if (!schemaCheck.valid) {
      setSchemaError(schemaCheck);
      setLoading(false);
      return;
    }
    
    fetchProjects();
  };
  
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
  
  const deleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setProjects(projects.filter(project => project.id !== id));
    } catch (err: any) {
      alert(`Error deleting project: ${err.message}`);
    }
  };
  
  const moveProject = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = projects.findIndex(p => p.id === id);
    
    let swapWithIndex = -1;
    
    if (direction === 'up' && currentIndex > 0) {
      swapWithIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < projects.length - 1) {
      swapWithIndex = currentIndex + 1;
    }
    
    if (swapWithIndex === -1) return;
    
    const updatedProjects = [...projects];
    const temp = updatedProjects[currentIndex].order_index;
    updatedProjects[currentIndex].order_index = updatedProjects[swapWithIndex].order_index;
    updatedProjects[swapWithIndex].order_index = temp;
    
    try {
      await Promise.all([
        supabase
          .from('projects')
          .update({ order_index: updatedProjects[currentIndex].order_index })
          .eq('id', updatedProjects[currentIndex].id),
        supabase
          .from('projects')
          .update({ order_index: updatedProjects[swapWithIndex].order_index })
          .eq('id', updatedProjects[swapWithIndex].id)
      ]);
      
      updatedProjects.sort((a, b) => a.order_index - b.order_index);
      setProjects(updatedProjects);
    } catch (err: any) {
      alert(`Error updating project order: ${err.message}`);
    }
  };
  
  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !currentFeatured })
        .eq('id', id);
        
      if (error) throw error;
      
      setProjects(projects.map(p => 
        p.id === id ? { ...p, featured: !currentFeatured } : p
      ));
    } catch (err: any) {
      alert(`Error updating project: ${err.message}`);
    }
  };
  
  const handleAddNew = () => {
    setEditingProjectId(null);
    setShowForm(true);
  };
  
  const handleEdit = (id: string) => {
    setEditingProjectId(id);
    setShowForm(true);
  };
  
  const handleFormClose = () => {
    setShowForm(false);
    setEditingProjectId(null);
    fetchProjects();
  };
  
  const filteredProjects = projects.filter(project => {
    if (filterFeatured === 'featured') return project.featured;
    if (filterFeatured === 'regular') return !project.featured;
    return true;
  });
  
  if (schemaError && !schemaError.valid) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-2 border-red-500/50 rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <FaDatabase className="text-red-400 text-3xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                <FaExclamationTriangle className="mr-2 text-red-400" />
                Database Schema Issue Detected
              </h2>
              <p className="text-gray-300 mb-4">
                Your Supabase database is missing required columns in the <code className="px-2 py-1 bg-black/30 rounded">projects</code> table.
              </p>
              
              {schemaError.missingColumns && (
                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-300 mb-2">
                    <strong>Missing column:</strong> <code>{schemaError.missingColumns}</code>
                  </p>
                </div>
              )}
              
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-300 mb-2">💡 How to Fix:</h3>
                <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                  <li>Go to your Supabase Dashboard</li>
                  <li>Navigate to <strong>Table Editor</strong> → <strong>projects</strong> table</li>
                  <li>Click <strong>+ New Column</strong> and add these columns:</li>
                </ol>
                
                <div className="mt-3 bg-black/50 rounded p-3 font-mono text-xs text-green-400">
                  <div className="mb-2">• <strong>live_url</strong>: text (nullable)</div>
                  <div className="mb-2">• <strong>github_url</strong>: text (nullable)</div>
                  <div className="mb-2">• <strong>image_url</strong>: text (nullable)</div>
                  <div>• <strong>long_description</strong>: text (nullable)</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Refresh After Fix
                </button>
                <a
                  href="https://supabase.com/dashboard/project/_/editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors inline-flex items-center"
                >
                  Open Supabase Dashboard
                  <FaExternalLinkAlt className="ml-2 text-sm" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  if (showForm) {
    return <ProjectForm projectId={editingProjectId} onClose={handleFormClose} />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Projects Management
          </h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddNew}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center shadow-lg shadow-blue-500/30 transition-all font-medium"
        >
          <FaPlus className="mr-2" /> Add New Project
        </motion.button>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: `All Projects (${projects.length})` },
          { key: 'featured', label: `Featured (${projects.filter(p => p.featured).length})` },
          { key: 'regular', label: `Regular (${projects.filter(p => !p.featured).length})` }
        ].map((filter) => (
          <motion.button
            key={filter.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterFeatured(filter.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterFeatured === filter.key
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-[#1a2942] text-gray-300 hover:bg-[#1e2f47]'
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#1a2942] to-[#0e1a2e] rounded-2xl p-12 text-center border border-[#1C2636]"
        >
          <FaFolder className="mx-auto text-6xl text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
          <p className="text-gray-400 mb-6">Start building your portfolio by adding your first project</p>
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl inline-flex items-center shadow-lg shadow-blue-500/30"
          >
            <FaPlus className="mr-2" /> Add Your First Project
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#1a2942] to-[#0e1a2e] rounded-xl border border-[#1C2636] p-5 flex flex-col md:flex-row gap-4 hover:border-blue-500/30 transition-all group"
            >
              <div className="md:w-56 h-36 rounded-lg bg-[#0e1a2e] overflow-hidden flex-shrink-0 border border-[#1C2636] group-hover:border-blue-500/30 transition-all">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <FaImage size={40} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl flex items-center gap-2 mb-1">
                      {project.title}
                      {project.featured && (
                        <span className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-2 py-1 rounded-lg border border-yellow-500/30">
                          ⭐ Featured
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-blue-400 flex items-center transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-1.5" /> Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-blue-400 flex items-center transition-colors"
                    >
                      <FaGithub className="mr-1.5" /> GitHub
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex md:flex-col items-center justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  className={`p-2.5 rounded-lg transition-all ${
                    project.featured 
                      ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/30' 
                      : 'bg-[#0e1a2e] text-gray-400 hover:text-yellow-300 hover:bg-yellow-500/10 border border-[#1C2636]'
                  }`}
                  title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                >
                  ⭐
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => moveProject(project.id, 'up')}
                  className="p-2.5 rounded-lg bg-[#0e1a2e] text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all border border-[#1C2636]"
                  title="Move Up"
                >
                  <FaArrowUp />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => moveProject(project.id, 'down')}
                  className="p-2.5 rounded-lg bg-[#0e1a2e] text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all border border-[#1C2636]"
                  title="Move Down"
                >
                  <FaArrowDown />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(project.id)}
                  className="p-2.5 rounded-lg bg-[#0e1a2e] text-gray-400 hover:text-white hover:bg-green-500/20 transition-all border border-[#1C2636]"
                  title="Edit"
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteProject(project.id)}
                  className="p-2.5 rounded-lg bg-[#0e1a2e] text-gray-400 hover:text-red-400 hover:bg-red-500/20 transition-all border border-[#1C2636]"
                  title="Delete"
                >
                  <FaTrash />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ProjectFormProps {
  projectId: string | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'order_index' | 'created_at'>>({
    title: '',
    description: '',
    long_description: '',
    image_url: '',
    live_url: '',
    github_url: '',
    technologies: [],
    featured: false
  });
  
  const [techInput, setTechInput] = useState('');
  
  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);
  
  const fetchProject = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          long_description: data.long_description || '',
          image_url: data.image_url || '',
          live_url: data.live_url || '',
          github_url: data.github_url || '',
          technologies: data.technologies || [],
          featured: data.featured || false
        });
        
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
      }
    } catch (err: any) {
      setError(`Failed to load project: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };
  
  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      let imageUrl = formData.image_url;
      
      if (imageFile) {
        const imageFileName = `project-${Date.now()}-${imageFile.name}`;
        const { error: imageError } = await supabase.storage
          .from('projects')
          .upload(imageFileName, imageFile, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (imageError) throw imageError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(imageFileName);
        
        imageUrl = publicUrl;
      }
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        long_description: formData.long_description || null,
        image_url: imageUrl || null,
        live_url: formData.live_url || null,
        github_url: formData.github_url || null,
        technologies: formData.technologies,
        featured: formData.featured
      };
      
      if (projectId) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
          
        if (error) throw error;
      } else {
        const { data: maxOrderData } = await supabase
          .from('projects')
          .select('order_index')
          .order('order_index', { ascending: false })
          .limit(1);
        
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order_index : -1;
        
        const { error } = await supabase
          .from('projects')
          .insert({
            ...projectData,
            order_index: maxOrder + 1
          });
          
        if (error) throw error;
      }
      
      onClose();
    } catch (err: any) {
      setError(`Failed to save project: ${err.message}`);
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
        <p className="text-gray-400">Loading project data...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {projectId ? 'Edit Project' : 'Add New Project'}
        </h1>
        <p className="text-gray-400 mt-1">
          {projectId ? 'Update your project details' : 'Create a new portfolio project'}
        </p>
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg flex items-start"
        >
          <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Error saving project</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#1a2942] to-[#0e1a2e] rounded-2xl border border-[#1C2636] p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Project Image</label>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="w-full aspect-[4/3] rounded-xl bg-[#0e1a2e] border-2 border-dashed border-[#1C2636] overflow-hidden flex items-center justify-center group hover:border-blue-500/50 transition-all">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Project preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaImage className="text-gray-600 text-5xl" />
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 flex flex-col justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center transition-all shadow-lg shadow-blue-500/20 w-fit"
              >
                <FaUpload className="mr-2" />
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </motion.button>
              <p className="text-sm text-gray-400 mt-3">
                Recommended: 800x600px • Max 5MB • JPG, PNG, or WebP
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#0e1a2e] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="My Awesome Project"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Short Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-3 bg-[#0e1a2e] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
              placeholder="A brief description (1-2 sentences)"
            ></textarea>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="long_description" className="block text-sm font-medium text-gray-300 mb-2">
              Detailed Description
            </label>
            <textarea
              id="long_description"
              name="long_description"
              value={formData.long_description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-[#0e1a2e] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
              placeholder="Detailed project description, features, challenges..."
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="live_url" className="block text-sm font-medium text-gray-300 mb-2">
              Live Demo URL
            </label>
            <input
              type="url"
              id="live_url"
              name="live_url"
              value={formData.live_url || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0e1a2e] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="https://demo.example.com"
            />
          </div>
          
          <div>
            <label htmlFor="github_url" className="block text-sm font-medium text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              id="github_url"
              name="github_url"
              value={formData.github_url || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0e1a2e] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              className="flex-1 px-4 py-3 bg-[#0e1a2e] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="e.g., React, TypeScript, Node.js"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTechnology}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
            >
              Add
            </motion.button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-xl text-sm flex items-center border border-blue-500/30"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="ml-2 text-blue-300 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="bg-[#0e1a2e] border border-[#1C2636] rounded-xl p-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 bg-[#0e1a2e] border-[#1C2636] rounded focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="ml-3 text-gray-300 font-medium">⭐ Mark as Featured Project</span>
          </label>
          <p className="text-sm text-gray-400 mt-2 ml-8">
            Featured projects will be highlighted on your portfolio homepage
          </p>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-[#1C2636]">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 bg-[#0e1a2e] hover:bg-[#1a2435] text-white rounded-xl transition-all border border-[#1C2636]"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: saving ? 1 : 1.05 }}
            whileTap={{ scale: saving ? 1 : 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all flex items-center shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                {projectId ? 'Update Project' : 'Create Project'}
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export { ProjectsManagement, ProjectForm };