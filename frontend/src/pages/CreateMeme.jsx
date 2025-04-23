import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import Canvas from '../components/editor/Canvas';
import Toolbar from '../components/editor/Toolbar';
import Loading from '../components/Loading';

import { createMeme } from '../api/memeAPI';
import { getRandomTemplate } from '../api/templateAPI';

import useEditorStore from '../store/editorStore';
import { toPng } from 'html-to-image';

const CreateMeme = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    template,
    textBoxes,
    stickers,
    setTemplate,
    clearEditor
  } = useEditorStore();

  useEffect(() => {
    loadRandomTemplate();
    return () => clearEditor(); // cleanup on unmount
  }, []);

  const loadRandomTemplate = async () => {
    try {
      setIsLoading(true);
      const tmpl = await getRandomTemplate();
      setTemplate(tmpl);
    } catch (err) {
      console.error('Template load error:', err);
      setError('😢 Failed to load meme template. Please refresh.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const canvas = document.querySelector('#meme-canvas');
    if (!canvas || !template) {
      setError('Canvas not found or template not loaded!');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert DOM to image
      const dataUrl = await toPng(canvas, { quality: 0.95 });
      const blob = await (await fetch(dataUrl)).blob();

      // Prepare form data
      const formData = new FormData();
      formData.append('image', blob, 'meme.png');
      formData.append('title', template.name);
      formData.append('template', template._id);
      formData.append('textBoxes', JSON.stringify(textBoxes));
      formData.append('stickers', JSON.stringify(stickers));

      await createMeme(formData);
      navigate('/');
    } catch (err) {
      console.error('Save error:', err);
      setError('❌ Failed to save meme. Try again!');
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
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {error && (
          <div className="rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <Toolbar onSave={handleSave} isSubmitting={isSubmitting} />
        <div id="meme-canvas">
          <Canvas />
        </div>
      </motion.div>
    </div>
  );
};

export default CreateMeme;
