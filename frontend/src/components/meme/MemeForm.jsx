import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { uploadTemplate } from '../../api/memeAPI.js';
import { useTheme } from '../../context/ThemeContext.jsx';

const MemeForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { darkMode } = useTheme();
  
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!imageUrl.trim()) {
      setError('Image URL is required');
      return;
    }
    
    if (!validateUrl(imageUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    
    try {
      setIsLoading(true);
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      const templateData = {
        title,
        imageUrl,
        tags: tagArray,
      };
      
      await uploadTemplate(templateData);
      
      // Reset form
      setTitle('');
      setImageUrl('');
      setTags('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error uploading template:', error);
      setError('Failed to upload template. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md p-6`}
    >
      <h2 className="text-xl font-semibold mb-4">Upload New Template</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <X size={16} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="Enter template title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block mb-1 font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="tags" className="block mb-1 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="funny, reaction, popular"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add relevant tags to make your template easier to find
          </p>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
          icon={<Upload size={18} />}
        >
          {isLoading ? 'Uploading...' : 'Upload Template'}
        </Button>
      </form>
    </motion.div>
  );
};

export default MemeForm;