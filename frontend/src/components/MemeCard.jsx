import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Trash2 } from 'lucide-react';

const MemeCard = ({ meme, onDelete }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = meme.imageUrl;
    link.download = `memeforge-${meme._id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meme.title,
        text: 'Check out this meme I created with MemeForge!',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy link'));
    }
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img 
          src={meme.imageUrl} 
          alt={meme.title} 
          className="h-60 w-full object-cover object-center"
          loading="lazy" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 p-4 flex items-end">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {meme.title}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(meme.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Download meme"
            >
              <Download size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Share meme"
            >
              <Share2 size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(meme._id)}
              className="rounded-full p-2 text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
              aria-label="Delete meme"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;