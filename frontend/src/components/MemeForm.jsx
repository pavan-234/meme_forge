import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const MemeForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'other',
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const categories = [
    { value: 'funny', label: 'Funny' },
    { value: 'sad', label: 'Sad' },
    { value: 'reaction', label: 'Reaction' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setError('Please select an image file (png, jpg, jpeg)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setError('');
    setImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!image) {
      setError('Please select an image for your meme');
      return;
    }
    
    if (!formData.title.trim()) {
      setError('Please provide a title for your meme');
      return;
    }
    
    const memeData = new FormData();
    memeData.append('title', formData.title);
    memeData.append('category', formData.category);
    memeData.append('image', image);
    
    onSubmit(memeData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {error && (
        <motion.div 
          className="rounded-md bg-error-50 p-4 text-error-700 dark:bg-error-900/20 dark:text-error-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Meme Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a catchy title"
          className="input mt-1"
          maxLength={100}
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input mt-1"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Image
        </label>
        
        <div className="mt-1">
          {!imagePreview ? (
            <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 transition-colors hover:border-primary-400 dark:border-gray-700 dark:hover:border-primary-600">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <ImageIcon size={36} className="text-gray-400 group-hover:text-primary-500 dark:text-gray-500" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-primary-600 group-hover:text-primary-500 dark:text-primary-400">
                    Click to upload
                  </p>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mt-2 overflow-hidden rounded-lg">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-64 w-full object-contain"
              />
              
              <motion.button 
                type="button"
                onClick={removeImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-gray-700 shadow-md hover:bg-white dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <X size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Upload size={18} />
              <span>Upload Meme</span>
            </div>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default MemeForm;