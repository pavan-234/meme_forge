import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCcw } from 'lucide-react';
import { getTemplates, getRandomTemplate, searchTemplates, MemeTemplate } from '../../api/memeAPI';

interface TemplateSelectorProps {
  onSelect: (template: MemeTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);
  
  // Fetch all templates
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTemplates();
      setTemplates(data);
    } catch (err) {
      setError('Failed to load templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchTemplates();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await searchTemplates(searchQuery);
      setTemplates(data);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Get random template
  const handleRandomTemplate = async () => {
    try {
      setLoading(true);
      setError(null);
      const template = await getRandomTemplate();
      onSelect(template);
    } catch (err) {
      setError('Failed to get random template');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Select a Template</h2>
      
      {/* Search and random */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            placeholder="Search templates..."
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleRandomTemplate}
          className="flex items-center justify-center space-x-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
        >
          <RefreshCcw size={16} />
          <span>Random</span>
        </button>
      </div>
      
      {/* Templates grid */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="h-64 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : templates.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No templates found
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <motion.div
              key={template._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow"
              onClick={() => onSelect(template)}
            >
              <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {template.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;