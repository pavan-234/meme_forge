import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Download } from 'lucide-react';
import { Meme } from '../api/memeAPI';

interface MemeCardProps {
  meme: Meme;
  onDelete?: (id: string) => void;
  onSelect?: (meme: Meme) => void;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme, onDelete, onSelect }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(meme.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${meme.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative group aspect-square">
        <img 
          src={meme.imageUrl}
          alt={meme.title}
          className="w-full h-full object-cover"
          onClick={() => onSelect && onSelect(meme)}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        
        {/* Action buttons */}
        <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onDelete && (
            <button
              onClick={() => onDelete(meme._id)}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
              aria-label="Delete meme"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
            aria-label="Download meme"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">{meme.title}</h3>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {meme.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;