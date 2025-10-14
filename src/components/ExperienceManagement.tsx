import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string[];
  technologies: string[];
  company_url?: string;
  location?: string;
  order_index: number;
}

// Main Experience Management Component
const ExperienceManagement: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
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
  
  const deleteExperience = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setExperiences(experiences.filter(exp => exp.id !== id));
    } catch (err: any) {
      alert(`Error deleting experience: ${err.message}`);
    }
  };
  
  const moveExperience = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = experiences.findIndex(exp => exp.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === experiences.length - 1)
    ) {
      return; // Already at the edge
    }
    
    const swapWithIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap order_index values
    const updatedExperiences = [...experiences];
    const temp = updatedExperiences[currentIndex].order_index;
    updatedExperiences[currentIndex].order_index = updatedExperiences[swapWithIndex].order_index;
    updatedExperiences[swapWithIndex].order_index = temp;
    
    // Update in database
    try {
      await Promise.all([
        supabase
          .from('experiences')
          .update({ order_index: updatedExperiences[currentIndex].order_index })
          .eq('id', updatedExperiences[currentIndex].id),
        supabase
          .from('experiences')
          .update({ order_index: updatedExperiences[swapWithIndex].order_index })
          .eq('id', updatedExperiences[swapWithIndex].id)
      ]);
      
      // Re-sort the experiences array based on updated order_index
      updatedExperiences.sort((a, b) => a.order_index - b.order_index);
      setExperiences(updatedExperiences);
    } catch (err: any) {
      alert(`Error updating experience order: ${err.message}`);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Experience Management</h1>
        <button
          onClick={() => navigate('/admin/experience/new')}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" /> Add New Experience
        </button>
      </div>
      
      {error && <div className="bg-danger/20 border border-danger text-danger-light px-4 py-3 rounded mb-6">{error}</div>}
      
      {loading ? (
        <div className="text-center py-12">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-400">Loading experiences...</p>
        </div>
      ) : experiences.length === 0 ? (
        <div className="bg-dark-lighter rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">No work experiences found</p>
          <button
            onClick={() => navigate('/admin/experience/new')}
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Add your first experience
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-lighter rounded-lg border border-dark-lightest p-6 relative"
            >
              <div className="absolute right-4 top-4 flex space-x-2">
                <button
                  onClick={() => moveExperience(experience.id, 'up')}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-white transition-colors"
                  title="Move Up"
                  disabled={experiences.indexOf(experience) === 0}
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => moveExperience(experience.id, 'down')}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-white transition-colors"
                  title="Move Down"
                  disabled={experiences.indexOf(experience) === experiences.length - 1}
                >
                  <FaArrowDown />
                </button>
                <button
                  onClick={() => navigate(`/admin/experience/edit/${experience.id}`)}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-white transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteExperience(experience.id)}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-danger-light transition-colors"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary-light">
                    <FaBuilding size={24} />
                  </div>
                </div>
                
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold text-white mb-1">{experience.role}</h3>
                  <h4 className="text-xl text-secondary-light mb-3">
                    {experience.company_url ? (
                      <a 
                        href={experience.company_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      experience.company
                    )}
                  </h4>
                  
                  <div className="flex flex-wrap text-gray-400 mb-4 text-sm">
                    <div className="flex items-center mr-6 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                        {experience.current && ' (Current)'}
                      </span>
                    </div>
                    
                    {experience.location && (
                      <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {experience.description.map((item, index) => (
                      <li key={index} className="flex">
                        <span className="text-secondary-light mr-2">▹</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {experience.technologies?.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-dark-lightest text-secondary-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Experience Form Component (Add/Edit)
const ExperienceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // For the description and technologies lists
  const [descriptionItems, setDescriptionItems] = useState<string[]>([]);
  const [newDescriptionItem, setNewDescriptionItem] = useState('');
  const [technologyItems, setTechnologyItems] = useState<string[]>([]);
  const [newTechnologyItem, setNewTechnologyItem] = useState('');
  
  const [formData, setFormData] = useState<Omit<Experience, 'id' | 'description' | 'technologies' | 'order_index'>>({
    company: '',
    role: '',
    start_date: '',
    end_date: '',
    current: false,
    company_url: '',
    location: ''
  });
  
  useEffect(() => {
    // If editing, fetch experience data
    if (id) {
      const fetchExperience = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;
          
          if (data) {
            setFormData({
              company: data.company,
              role: data.role,
              start_date: data.start_date,
              end_date: data.end_date || '',
              current: data.current,
              company_url: data.company_url || '',
              location: data.location || ''
            });
            
            // Set description and technologies arrays
            setDescriptionItems(data.description || []);
            setTechnologyItems(data.technologies || []);
          }
        } catch (err: any) {
          setError(`Failed to load experience: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      
      fetchExperience();
    }
  }, [id]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      
      // If current job is checked, clear end date
      if (name === 'current' && checked) {
        setFormData(prev => ({ ...prev, end_date: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const addDescriptionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDescriptionItem.trim()) return;
    
    setDescriptionItems([...descriptionItems, newDescriptionItem.trim()]);
    setNewDescriptionItem('');
  };
  
  const removeDescriptionItem = (index: number) => {
    setDescriptionItems(descriptionItems.filter((_, i) => i !== index));
  };
  
  const addTechnologyItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechnologyItem.trim()) return;
    
    setTechnologyItems([...technologyItems, newTechnologyItem.trim()]);
    setNewTechnologyItem('');
  };
  
  const removeTechnologyItem = (index: number) => {
    setTechnologyItems(technologyItems.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (descriptionItems.length === 0) {
      setError('Please add at least one description item');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const experienceData = {
        ...formData,
        description: descriptionItems,
        technologies: technologyItems,
        end_date: formData.current ? null : formData.end_date || null
      };
      
      if (id) {
        // Update existing experience
        const { error } = await supabase
          .from('experiences')
          .update(experienceData)
          .eq('id', id);
          
        if (error) throw error;
      } else {
        // Add new experience
        // First, get the highest order_index
        const { data: maxOrderData, error: maxOrderError } = await supabase
          .from('experiences')
          .select('order_index')
          .order('order_index', { ascending: false })
          .limit(1);
          
        if (maxOrderError) throw maxOrderError;
        
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order_index : -1;
        
        // Insert new experience with next order_index
        const { error } = await supabase
          .from('experiences')
          .insert({
            ...experienceData,
            order_index: maxOrder + 1
          });
          
        if (error) throw error;
      }
      
      // Redirect back to experiences list
      navigate('/admin/experience');
    } catch (err: any) {
      setError(`Failed to save experience: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="spinner"></div>
        <p className="mt-4 text-gray-400">Loading experience data...</p>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        {id ? 'Edit Experience' : 'Add New Experience'}
      </h1>
      
      {error && (
        <div className="bg-danger/20 border border-danger text-danger-light px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-dark-lighter rounded-lg border border-dark-lightest p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="form-group">
            <label htmlFor="role" className="form-label">Job Title</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g. Frontend Developer"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="company" className="form-label">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g. Acme Inc."
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="form-group">
            <label htmlFor="company_url" className="form-label">Company Website (optional)</label>
            <input
              type="url"
              id="company_url"
              name="company_url"
              value={formData.company_url || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. https://example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location" className="form-label">Location (optional)</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. New York, NY"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="form-group">
            <label htmlFor="start_date" className="form-label">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="end_date" className="form-label">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date || ''}
              onChange={handleChange}
              disabled={formData.current}
              className={`form-input ${formData.current ? 'bg-dark-lightest/50' : ''}`}
            />
          </div>
          
          <div className="form-group flex items-center mt-8">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="w-4 h-4 text-secondary bg-dark-lightest border-dark-lightest rounded focus:ring-secondary focus:ring-opacity-25"
            />
            <label htmlFor="current" className="ml-2 text-gray-300">
              I currently work here
            </label>
          </div>
        </div>
        
        <div className="form-group mb-6">
          <label className="form-label">Job Description</label>
          <div className="bg-dark-lightest border border-dark-lightest rounded-lg p-4 mb-2">
            <ul className="space-y-2 mb-4">
              {descriptionItems.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-secondary-light mr-2 mt-1">▹</span>
                  <div className="flex-1 text-white">{item}</div>
                  <button
                    type="button"
                    onClick={() => removeDescriptionItem(index)}
                    className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-danger-light transition-opacity"
                    title="Remove item"
                  >
                    <FaTrash size={14} />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="flex">
              <input
                type="text"
                value={newDescriptionItem}
                onChange={(e) => setNewDescriptionItem(e.target.value)}
                placeholder="Add a description point..."
                className="flex-1 px-3 py-2 bg-dark-lighter border border-dark-lightest rounded-l-lg text-white focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <button
                type="button"
                onClick={addDescriptionItem}
                className="px-4 py-2 bg-secondary text-white rounded-r-lg hover:bg-secondary-dark transition-colors"
              >
                Add
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Add bullet points describing your responsibilities and achievements.
            </p>
          </div>
        </div>
        
        <div className="form-group mb-6">
          <label className="form-label">Technologies Used</label>
          <div className="bg-dark-lightest border border-dark-lightest rounded-lg p-4 mb-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {technologyItems.map((tech, index) => (
                <div key={index} className="flex items-center bg-dark-lighter text-white px-3 py-1 rounded-full">
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnologyItem(index)}
                    className="ml-2 text-gray-400 hover:text-danger-light transition-colors"
                    title="Remove technology"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              {technologyItems.length === 0 && (
                <p className="text-gray-400 text-sm">No technologies added yet.</p>
              )}
            </div>
            
            <div className="flex">
              <input
                type="text"
                value={newTechnologyItem}
                onChange={(e) => setNewTechnologyItem(e.target.value)}
                placeholder="Add a technology..."
                className="flex-1 px-3 py-2 bg-dark-lighter border border-dark-lightest rounded-l-lg text-white focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              <button
                type="button"
                onClick={addTechnologyItem}
                className="px-4 py-2 bg-secondary text-white rounded-r-lg hover:bg-secondary-dark transition-colors"
              >
                Add
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Add technologies, tools, or frameworks you used in this role.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/experience')}
            className="px-4 py-2 bg-dark-lightest hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg transition-colors flex items-center"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              id ? 'Update Experience' : 'Add Experience'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export { ExperienceManagement, ExperienceForm };