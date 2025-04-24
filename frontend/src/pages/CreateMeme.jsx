import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import Canvas from '../components/editor/Canvas';
import Toolbar from '../components/editor/Toolbar';
import MemeForm from '../components/MemeForm';
import Loading from '../components/Loading';
import { createMeme } from '../api/memeAPI';
import { getRandomTemplate } from '../api/templateAPI';
import useEditorStore from '../store/editorStore';
import { toPng } from 'html-to-image';

const CreateMeme = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('template'); // 'template' or 'upload'
  const navigate = useNavigate();
  
  const { template, textBoxes, stickers, setTemplate, clearEditor } = useEditorStore();
  
  useEffect(() => {
    if (mode === 'template') {
      loadRandomTemplate();
    } else {
      setIsLoading(false);
    }
    return () => clearEditor();
  }, [mode]);
  
  const loadRandomTemplate = async () => {
    try {
      setIsLoading(true);
      const template = await getRandomTemplate();
      setTemplate(template);
    } catch (err) {
      setError('Failed to load template. Please try again.');
      console.error('Error loading template:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = async () => {
    const canvas = document.querySelector('#meme-canvas');
    if (!canvas || !template) return;
    
    try {
      setIsSubmitting(true);
      
      const dataUrl = await toPng(canvas, { quality: 0.95 });
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('image', blob, 'meme.png');
      formData.append('title', template.name);
      formData.append('template', template._id);
      formData.append('textBoxes', JSON.stringify(textBoxes));
      formData.append('stickers', JSON.stringify(stickers));
      
      await createMeme(formData);
      navigate('/');
    } catch (err) {
      console.error('Error saving meme:', err);
      setError('Failed to save meme. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = async (formData) => {
    try {
      setIsSubmitting(true);
      await createMeme(formData);
      navigate('/');
    } catch (err) {
      console.error('Error uploading meme:', err);
      setError('Failed to upload meme. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to gallery
        </motion.button>

        <div className="flex gap-2">
          <button
            onClick={() => setMode('template')}
            className={`rounded-md px-4 py-2 ${
              mode === 'template'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Use Template
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`rounded-md px-4 py-2 ${
              mode === 'upload'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Upload Image
          </button>
        </div>
      </div>
      
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {error && (
          <div className="rounded-md bg-error-50 p-4 text-error-700 dark:bg-error-900/20 dark:text-error-400">
            {error}
          </div>
        )}
        
        {mode === 'template' ? (
          <>
            <Toolbar onSave={handleSave} onRandomTemplate={loadRandomTemplate} />
            <div id="meme-canvas">
              <Canvas />
            </div>
          </>
        ) : (
          <MemeForm onSubmit={handleUpload} isSubmitting={isSubmitting} />
        )}
      </motion.div>
    </div>
  );
};

export default CreateMeme;