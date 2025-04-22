import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MemeForm from '../components/MemeForm';
import { createMeme } from '../api/memeAPI';

const CreateMeme = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (memeData) => {
    try {
      setIsSubmitting(true);
      await createMeme(memeData);
      navigate('/');
    } catch (err) {
      console.error('Error creating meme:', err);
      setError('Failed to create meme. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to gallery
        </motion.button>
      </div>
      
      <motion.div 
        className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Create a New Meme
        </h1>
        
        {error && (
          <div className="mb-6 rounded-md bg-error-50 p-4 text-error-700 dark:bg-error-900/20 dark:text-error-400">
            {error}
          </div>
        )}
        
        <MemeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
};

export default CreateMeme;