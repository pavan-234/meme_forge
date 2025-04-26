import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Edit2, Download } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { deleteMeme } from '../../api/memeAPI.js';

const MemeCard = ({ meme, isTemplate = false, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useTheme();
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      try {
        setIsLoading(true);
        await deleteMeme(meme._id);
        if (onDelete) {
          onDelete(meme._id);
        }
      } catch (error) {
        console.error('Error deleting meme:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={meme.imageUrl} 
          alt={meme.title} 
          className="w-full h-64 object-contain bg-gray-200 dark:bg-gray-700" 
          loading="lazy"
        />
        
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 p-2"
          >
            {isTemplate ? (
              <Link to={`/create/${meme._id}`}>
                <Button variant="primary" size="sm" icon={<Edit2 size={16} />}>
                  Use Template
                </Button>
              </Link>
            ) : (
              <>
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={<Download size={16} />}
                  onClick={() => window.open(meme.imageUrl, '_blank')}
                >
                  Download
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  icon={<Trash2 size={16} />}
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </>
            )}
          </motion.div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>
          {meme.title}
        </h3>
        
        {meme.tags && meme.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {meme.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-block text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                {tag}
              </span>
            ))}
            {meme.tags.length > 3 && (
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                +{meme.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemeCard;