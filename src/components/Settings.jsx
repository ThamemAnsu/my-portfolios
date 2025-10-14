import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaLock, FaBell, FaShieldAlt, 
  FaPalette, FaDatabase, FaSave, FaCheck,
  FaEye, FaEyeSlash, FaDownload, FaTrash
} from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = 'https://tscpiiiregsqkvztjxba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3BpaWlyZWdzcWt2enRqeGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDk3NzcsImV4cCI6MjA3NTc4NTc3N30._4oCoWFMwwBOgh5_OtZM4i-fg-XYvYaw4frKQN77zIY';
const supabase = createClient(supabaseUrl, supabaseKey);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Account Settings State
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newMessages: true,
    projectUpdates: false,
    weeklyDigest: true
  });
  
  // Appearance Settings State
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    accentColor: 'blue',
    compactMode: false
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
      setEmail(data.user.email || '');
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleUpdateEmail = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      showSuccess('Email updated successfully! Please check your inbox to confirm.');
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      showError('Passwords do not match!');
      return;
    }
    
    if (newPassword.length < 6) {
      showError('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      if (error) throw error;
      
      showSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      showSuccess('Notification preferences saved!');
      setLoading(false);
    }, 500);
  };

  const handleSaveAppearance = () => {
    setLoading(true);
    setTimeout(() => {
      showSuccess('Appearance settings saved!');
      setLoading(false);
    }, 500);
  };

  const handleExportData = () => {
    showSuccess('Data export initiated! You will receive an email when ready.');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'data', label: 'Data', icon: FaDatabase }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1528] via-[#0D1A2D] to-[#0B1528] p-8">
      {/* Success/Error Messages */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 right-8 z-50 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm flex items-center space-x-3"
          >
            <FaCheck className="text-xl" />
            <span>{successMessage}</span>
          </motion.div>
        )}
        
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 right-8 z-50 bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#0E1A2E]/80 backdrop-blur-sm rounded-2xl border border-[#1C2636]/50 p-4 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 text-[#3B82F6] border border-[#3B82F6]/20'
                        : 'text-gray-400 hover:text-white hover:bg-[#16213E]/30'
                    }`}
                  >
                    <tab.icon className="text-lg" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0E1A2E]/80 backdrop-blur-sm rounded-2xl border border-[#1C2636]/50 p-8"
              >
                {/* Account Tab */}
                {activeTab === 'account' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
                      <p className="text-gray-400">Update your account information</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-[#0A1324] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-[#3B82F6] transition-all"
                          placeholder="your@email.com"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Current: {user?.email}
                        </p>
                      </div>

                      <motion.button
                        onClick={handleUpdateEmail}
                        disabled={loading || email === user?.email}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                          loading || email === user?.email
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg'
                        }`}
                      >
                        <FaSave />
                        <span>{loading ? 'Saving...' : 'Update Email'}</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Security Settings</h2>
                      <p className="text-gray-400">Keep your account secure</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0A1324] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-[#3B82F6] transition-all pr-12"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-[#0A1324] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-[#3B82F6] transition-all"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-[#0A1324] border border-[#1C2636] rounded-xl text-white focus:outline-none focus:border-[#3B82F6] transition-all"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <motion.button
                        onClick={handleUpdatePassword}
                        disabled={loading || !newPassword || !confirmPassword}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                          loading || !newPassword || !confirmPassword
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg'
                        }`}
                      >
                        <FaLock />
                        <span>{loading ? 'Updating...' : 'Update Password'}</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
                      <p className="text-gray-400">Manage how you receive updates</p>
                    </div>

                    <div className="space-y-4">
                      {Object.entries({
                        emailNotifications: 'Email Notifications',
                        newMessages: 'New Message Alerts',
                        projectUpdates: 'Project Update Notifications',
                        weeklyDigest: 'Weekly Summary Email'
                      }).map(([key, label]) => (
                        <motion.div
                          key={key}
                          whileHover={{ x: 4 }}
                          className="flex items-center justify-between p-4 bg-[#0A1324]/50 border border-[#1C2636] rounded-xl"
                        >
                          <div>
                            <p className="text-white font-medium">{label}</p>
                            <p className="text-sm text-gray-400">
                              {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                              {key === 'newMessages' && 'Get notified when you receive new messages'}
                              {key === 'projectUpdates' && 'Updates about your portfolio projects'}
                              {key === 'weeklyDigest' && 'Weekly summary of your portfolio activity'}
                            </p>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                            className={`relative w-14 h-7 rounded-full transition-colors ${
                              notifications[key] ? 'bg-[#3B82F6]' : 'bg-gray-600'
                            }`}
                          >
                            <motion.div
                              animate={{ x: notifications[key] ? 28 : 4 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                            />
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={handleSaveNotifications}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium shadow-lg transition-all"
                    >
                      <FaSave />
                      <span>Save Preferences</span>
                    </motion.button>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Appearance Settings</h2>
                      <p className="text-gray-400">Customize how your admin panel looks</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Theme
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {['dark', 'light'].map((theme) => (
                            <motion.button
                              key={theme}
                              onClick={() => setAppearance({ ...appearance, theme })}
                              whileHover={{ scale: 1.02 }}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                appearance.theme === theme
                                  ? 'border-[#3B82F6] bg-[#3B82F6]/10'
                                  : 'border-[#1C2636] hover:border-[#3B82F6]/50'
                              }`}
                            >
                              <div className="text-white font-medium capitalize">{theme}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Accent Color
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { name: 'blue', color: 'bg-blue-500' },
                            { name: 'purple', color: 'bg-purple-500' },
                            { name: 'green', color: 'bg-green-500' },
                            { name: 'orange', color: 'bg-orange-500' }
                          ].map((color) => (
                            <motion.button
                              key={color.name}
                              onClick={() => setAppearance({ ...appearance, accentColor: color.name })}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-full h-12 rounded-xl ${color.color} relative ${
                                appearance.accentColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0E1A2E]' : ''
                              }`}
                            >
                              {appearance.accentColor === color.name && (
                                <FaCheck className="absolute inset-0 m-auto text-white" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-4 bg-[#0A1324]/50 border border-[#1C2636] rounded-xl"
                      >
                        <div>
                          <p className="text-white font-medium">Compact Mode</p>
                          <p className="text-sm text-gray-400">Reduce spacing for a denser layout</p>
                        </div>
                        <button
                          onClick={() => setAppearance({ ...appearance, compactMode: !appearance.compactMode })}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            appearance.compactMode ? 'bg-[#3B82F6]' : 'bg-gray-600'
                          }`}
                        >
                          <motion.div
                            animate={{ x: appearance.compactMode ? 28 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                          />
                        </button>
                      </motion.div>
                    </div>

                    <motion.button
                      onClick={handleSaveAppearance}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium shadow-lg transition-all"
                    >
                      <FaSave />
                      <span>Save Appearance</span>
                    </motion.button>
                  </div>
                )}

                {/* Data Tab */}
                {activeTab === 'data' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Data Management</h2>
                      <p className="text-gray-400">Export or delete your portfolio data</p>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="p-6 bg-[#0A1324]/50 border border-[#1C2636] rounded-xl"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-2 flex items-center">
                              <FaDownload className="mr-2 text-[#3B82F6]" />
                              Export Your Data
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                              Download all your portfolio data in JSON format
                            </p>
                            <motion.button
                              onClick={handleExportData}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center space-x-2 px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-medium transition-all"
                            >
                              <FaDownload />
                              <span>Export Data</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 4 }}
                        className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-2 flex items-center">
                              <FaTrash className="mr-2 text-red-400" />
                              Danger Zone
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                              Permanently delete your account and all associated data
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-lg font-medium transition-all"
                            >
                              <FaTrash />
                              <span>Delete Account</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;