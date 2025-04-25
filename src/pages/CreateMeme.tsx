import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MemeEditor from '../components/MemeEditor';
import MemeForm from '../components/MemeForm';
import { useMemesContext } from '../context/MemesContext';

const CreateMeme: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'upload'>('editor');
  const { uploadNewMeme, saveMeme, loading } = useMemesContext();
  const navigate = useNavigate();
  
  const handleSaveMeme = async (imageUrl: string, title: string) => {
    try {
      await saveMeme(imageUrl, title);
      navigate('/');
    } catch (error) {
      console.error('Error saving meme:', error);
    }
  };
  
  const handleUploadMeme = async (formData: { title: string; imageUrl: string; tags: string[] }) => {
    try {
      await uploadNewMeme(formData);
      navigate('/');
    } catch (error) {
      console.error('Error uploading meme:', error);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Meme</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'editor'
              ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('editor')}
        >
          Meme Editor
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'upload'
              ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Template
        </button>
      </div>
      
      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'editor' ? (
          <MemeEditor onSave={handleSaveMeme} />
        ) : (
          <MemeForm onSubmit={handleUploadMeme} loading={loading} />
        )}
      </motion.div>
    </div>
  );
};

export default CreateMeme;