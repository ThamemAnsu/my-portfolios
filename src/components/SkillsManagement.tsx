import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaCode, FaServer, FaTools } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
  order_index: number;
}

// Main Skills Management Component
const SkillsManagement: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchSkills();
  }, []);
  
  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true });
        
      if (error) throw error;
      setSkills(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setSkills(skills.filter(skill => skill.id !== id));
    } catch (err: any) {
      alert(`Error deleting skill: ${err.message}`);
    }
  };
  
  const moveSkill = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = skills.findIndex(s => s.id === id);
    const currentSkill = skills[currentIndex];
    
    const sameCategory = skills.filter(s => s.category === currentSkill.category);
    const categoryIndex = sameCategory.findIndex(s => s.id === id);
    
    let swapWithIndex = -1;
    
    if (direction === 'up' && categoryIndex > 0) {
      const prevCategorySkill = sameCategory[categoryIndex - 1];
      swapWithIndex = skills.findIndex(s => s.id === prevCategorySkill.id);
    } else if (direction === 'down' && categoryIndex < sameCategory.length - 1) {
      const nextCategorySkill = sameCategory[categoryIndex + 1];
      swapWithIndex = skills.findIndex(s => s.id === nextCategorySkill.id);
    }
    
    if (swapWithIndex === -1) return;
    
    const updatedSkills = [...skills];
    const temp = updatedSkills[currentIndex].order_index;
    updatedSkills[currentIndex].order_index = updatedSkills[swapWithIndex].order_index;
    updatedSkills[swapWithIndex].order_index = temp;
    
    try {
      await Promise.all([
        supabase
          .from('skills')
          .update({ order_index: updatedSkills[currentIndex].order_index })
          .eq('id', updatedSkills[currentIndex].id),
        supabase
          .from('skills')
          .update({ order_index: updatedSkills[swapWithIndex].order_index })
          .eq('id', updatedSkills[swapWithIndex].id)
      ]);
      
      updatedSkills.sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.order_index - b.order_index;
      });
      
      setSkills(updatedSkills);
    } catch (err: any) {
      alert(`Error updating skill order: ${err.message}`);
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <FaCode />;
      case 'backend':
        return <FaServer />;
      default:
        return <FaTools />;
    }
  };
  
  const handleAddNew = () => {
    setEditingSkillId(null);
    setShowForm(true);
  };
  
  const handleEdit = (id: string) => {
    setEditingSkillId(id);
    setShowForm(true);
  };
  
  const handleFormClose = () => {
    setShowForm(false);
    setEditingSkillId(null);
    fetchSkills();
  };
  
  const categories = ['all', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  if (showForm) {
    return <SkillForm skillId={editingSkillId} onClose={handleFormClose} />;
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Skills Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" /> Add New Skill
        </button>
      </div>
      
      {error && <div className="bg-danger/20 border border-danger text-danger-light px-4 py-3 rounded mb-6">{error}</div>}
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
              activeCategory === category
                ? 'bg-secondary text-white'
                : 'bg-dark-lightest text-gray-300 hover:bg-dark-lighter'
            }`}
          >
            {category !== 'all' && (
              <span className="mr-2">{getCategoryIcon(category)}</span>
            )}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-400">Loading skills...</p>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="bg-dark-lighter rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">No skills found in this category</p>
          <button
            onClick={handleAddNew}
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Add your first skill
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-lighter rounded-lg border border-dark-lightest p-4 flex items-center"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-light mr-4">
                {getCategoryIcon(skill.category)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">{skill.name}</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-dark-lightest rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-gray-400 text-sm min-w-[40px] text-right">{skill.level}%</span>
                </div>
                <div className="mt-1">
                  <span className="text-xs bg-dark-lightest text-secondary-light px-2 py-1 rounded">
                    {skill.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => moveSkill(skill.id, 'up')}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-white transition-colors"
                  title="Move Up"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => moveSkill(skill.id, 'down')}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-white transition-colors"
                  title="Move Down"
                >
                  <FaArrowDown />
                </button>
                <button
                  onClick={() => handleEdit(skill.id)}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-white transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="p-2 rounded hover:bg-dark-lightest text-gray-400 hover:text-danger-light transition-colors"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Skill Form Component (Add/Edit)
interface SkillFormProps {
  skillId: string | null;
  onClose: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skillId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Skill, 'id' | 'order_index'>>({
    name: '',
    level: 70,
    category: 'frontend',
    icon: ''
  });
  
  useEffect(() => {
    if (skillId) {
      const fetchSkill = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('skills')
            .select('*')
            .eq('id', skillId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            setFormData({
              name: data.name,
              level: data.level,
              category: data.category,
              icon: data.icon || ''
            });
          }
        } catch (err: any) {
          setError(`Failed to load skill: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      
      fetchSkill();
    }
  }, [skillId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      if (skillId) {
        const { error } = await supabase
          .from('skills')
          .update(formData)
          .eq('id', skillId);
          
        if (error) throw error;
      } else {
        const { data: maxOrderData, error: maxOrderError } = await supabase
          .from('skills')
          .select('order_index')
          .eq('category', formData.category)
          .order('order_index', { ascending: false })
          .limit(1);
          
        if (maxOrderError) throw maxOrderError;
        
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order_index : -1;
        
        const { error } = await supabase
          .from('skills')
          .insert({
            ...formData,
            order_index: maxOrder + 1
          });
          
        if (error) throw error;
      }
      
      onClose();
    } catch (err: any) {
      setError(`Failed to save skill: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="spinner"></div>
        <p className="mt-4 text-gray-400">Loading skill data...</p>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        {skillId ? 'Edit Skill' : 'Add New Skill'}
      </h1>
      
      {error && (
        <div className="bg-danger/20 border border-danger text-danger-light px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-dark-lighter rounded-lg border border-dark-lightest p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Skill Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g. React, Node.js, TypeScript"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-input form-select"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="level" className="form-label">Proficiency Level ({formData.level}%)</label>
          <input
            type="range"
            id="level"
            name="level"
            min="10"
            max="100"
            step="5"
            value={formData.level}
            onChange={handleChange}
            className="w-full h-2 bg-dark-lightest rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Expert</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="icon" className="form-label">Icon (optional)</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. FaReact (React icon name)"
          />
          <p className="text-sm text-gray-400 mt-1">
            Enter the name of a React Icon component (e.g., from react-icons/fa).
          </p>
        </div>
        
        <div className="flex justify-end mt-6 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-dark-lightest hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
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
              skillId ? 'Update Skill' : 'Add Skill'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export { SkillsManagement, SkillForm };