import React from 'react';
import { motion } from 'framer-motion';
import {
  Type,
  Image as ImageIcon,
  Download,
  Save,
  RefreshCw,
  Share2,
} from 'lucide-react';
import useEditorStore from '../../store/editorStore';
import { getRandomTemplate } from '../../api/templateAPI';
import { toPng } from 'html-to-image';

const Toolbar = ({ onSave }) => {
  const { addTextBox, addSticker, setTemplate } = useEditorStore();
  
  const handleAddText = () => {
    addTextBox();
  };
  
  const handleAddSticker = () => {
    // For now, we'll use a placeholder sticker URL
    addSticker({
      url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    });
  };
  
  const handleRandomTemplate = async () => {
    try {
      const template = await getRandomTemplate();
      setTemplate(template);
    } catch (error) {
      console.error('Error getting random template:', error);
    }
  };
  
  const handleDownload = async () => {
    const canvas = document.querySelector('#meme-canvas');
    if (!canvas) return;
    
    try {
      const dataUrl = await toPng(canvas, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  };
  
  const handleShare = async () => {
    const canvas = document.querySelector('#meme-canvas');
    if (!canvas) return;
    
    try {
      const dataUrl = await toPng(canvas, { quality: 0.95 });
      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'meme.png', { type: 'image/png' });
        await navigator.share({
          title: 'Check out my meme!',
          files: [file],
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing meme:', error);
    }
  };
  
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddText}
          className="rounded-md bg-primary-100 p-2 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/40"
        >
          <Type size={20} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddSticker}
          className="rounded-md bg-secondary-100 p-2 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-900/20 dark:text-secondary-400 dark:hover:bg-secondary-900/40"
        >
          <ImageIcon size={20} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRandomTemplate}
          className="rounded-md bg-accent-100 p-2 text-accent-700 hover:bg-accent-200 dark:bg-accent-900/20 dark:text-accent-400 dark:hover:bg-accent-900/40"
        >
          <RefreshCw size={20} />
        </motion.button>
      </div>
      
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="rounded-md bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <Share2 size={20} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="rounded-md bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <Download size={20} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSave}
          className="flex items-center space-x-2 rounded-md bg-success-600 px-4 py-2 text-white hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600"
        >
          <Save size={20} />
          <span>Save</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Toolbar;