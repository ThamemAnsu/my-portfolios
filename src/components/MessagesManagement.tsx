import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { 
  FaEnvelope, FaUser, FaClock, FaTrash, FaCheck, FaEye,
  FaExclamationCircle, FaArchive, FaInbox
} from 'react-icons/fa';
import { format, formatDistanceToNow } from 'date-fns';

// Initialize Supabase client
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

const MessagesManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  
  useEffect(() => {
    fetchMessages();
  }, [filter]);
  
  const fetchMessages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
        
      // Apply filter
      if (filter === 'read') {
        query = query.eq('read', true);
      } else if (filter === 'unread') {
        query = query.eq('read', false);
      }
      
      const { data, error } = await query;
        
      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
      
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
      
      setSuccess('Message marked as read');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(`Error updating message: ${err.message}`);
    }
  };
  
  const markAllAsRead = async () => {
    try {
      const unreadIds = messages.filter(msg => !msg.read).map(msg => msg.id);
      
      if (unreadIds.length === 0) {
        setSuccess('No unread messages');
        setTimeout(() => setSuccess(null), 3000);
        return;
      }
      
      // Update in batches if needed
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', unreadIds);
        
      if (error) throw error;
      
      // Update local state
      setMessages(messages.map(msg => ({ ...msg, read: true })));
      
      if (selectedMessage && !selectedMessage.read) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
      
      setSuccess('All messages marked as read');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(`Error updating messages: ${err.message}`);
    }
  };
  
  const deleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;
    
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setMessages(messages.filter(msg => msg.id !== id));
      
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      
      setSuccess('Message deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(`Error deleting message: ${err.message}`);
    }
  };
  
  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if not already
    if (!message.read) {
      markAsRead(message.id);
    }
  };
  
  const getTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const formatDate = (date: string) => {
    try {
      return format(new Date(date), 'PPpp'); // e.g., Mar 15, 2023, 3:25 PM
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const unreadCount = messages.filter(msg => !msg.read).length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <FaEnvelope className="mr-3 text-secondary" />
          Messages
          {unreadCount > 0 && (
            <span className="ml-3 bg-secondary text-dark-card text-xs font-bold px-2.5 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </h1>
        
        {unreadCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllAsRead}
            className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg shadow-lg shadow-secondary/20 hover:shadow-secondary/30 transition-all flex items-center"
          >
            <FaCheck className="mr-2" />
            Mark All as Read
          </motion.button>
        )}
      </div>
      
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-900/50 text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-900/50 text-green-400">
          {success}
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Messages List */}
        <div className="w-full lg:w-2/5">
          <div className="bg-dark-card rounded-xl border border-gray-700 shadow-card overflow-hidden">
            <div className="p-4 bg-dark-lighter border-b border-gray-700 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    filter === 'all'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  } transition-colors`}
                >
                  <FaInbox className="mr-1.5" />
                  All
                </button>
                
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    filter === 'unread'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  } transition-colors`}
                >
                  <FaExclamationCircle className="mr-1.5" />
                  Unread
                </button>
                
                <button
                  onClick={() => setFilter('read')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    filter === 'read'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  } transition-colors`}
                >
                  <FaArchive className="mr-1.5" />
                  Read
                </button>
              </div>
              
              <span className="text-gray-400 text-sm">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="spinner"></div>
                <p className="ml-2 text-gray-400">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-6 text-center">
                <FaEnvelope className="mx-auto text-4xl text-gray-500 mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">No messages</h3>
                <p className="text-gray-400">
                  {filter === 'all' 
                    ? 'You have no messages yet.' 
                    : filter === 'unread'
                      ? 'No unread messages.' 
                      : 'No read messages.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => viewMessage(message)}
                    className={`p-4 hover:bg-dark-lighter cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-dark-lighter' : ''
                    } ${!message.read ? 'border-l-4 border-secondary' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-medium text-base ${!message.read ? 'text-white' : 'text-gray-300'}`}>
                        {message.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {getTimeAgo(message.created_at)}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-1">{message.email}</p>
                    
                    <p className={`${!message.read ? 'text-white font-medium' : 'text-gray-300'} line-clamp-1`}>
                      {message.subject}
                    </p>
                    
                    <p className="text-gray-500 text-sm line-clamp-1 mt-1">
                      {message.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Message Detail */}
        <div className="w-full lg:w-3/5">
          <div className="bg-dark-card rounded-xl border border-gray-700 shadow-card h-full">
            {selectedMessage ? (
              <div className="flex flex-col h-full">
                <div className="p-5 bg-dark-lighter border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-xl font-medium text-white">{selectedMessage.subject}</h3>
                  
                  <div className="flex space-x-2">
                    {!selectedMessage.read && (
                      <button
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-secondary rounded-full hover:bg-dark-lightest transition-colors"
                        title="Mark as Read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-dark-lightest transition-colors"
                      title="Delete Message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="p-5 border-b border-gray-700 bg-dark-lighter/30">
                  <div className="flex items-center mb-1">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-secondary text-lg mr-3">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{selectedMessage.name}</h4>
                      <p className="text-gray-400 text-sm">{selectedMessage.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mt-2">
                    <FaClock className="mr-1" />
                    <span>
                      {formatDate(selectedMessage.created_at)}
                    </span>
                    
                    <div className="mx-2 text-gray-600">•</div>
                    
                    <div className={`flex items-center ${selectedMessage.read ? 'text-gray-500' : 'text-secondary'}`}>
                      <FaEye className="mr-1" />
                      <span>{selectedMessage.read ? 'Read' : 'Unread'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow overflow-y-auto">
                  <div className="whitespace-pre-wrap text-white">
                    {selectedMessage.message}
                  </div>
                </div>
                
                <div className="p-4 bg-dark-lighter border-t border-gray-700 mt-auto">
                  <div className="flex items-center text-sm text-gray-400">
                    <FaUser className="mr-2" />
                    <span>From: {selectedMessage.name} ({selectedMessage.email})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <FaEnvelope className="text-2xl text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Select a message</h3>
                <p className="text-gray-400">
                  {messages.length > 0 
                    ? 'Click on a message to view its contents' 
                    : 'No messages to display'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;