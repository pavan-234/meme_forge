import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import MemeCard from '../components/MemeCard';
import { useMemesContext } from '../context/MemesContext';

const Home: React.FC = () => {
  const { memes, loading, error, removeMeme } = useMemesContext();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Meme Gallery</h1>
        <Link 
          to="/create" 
          className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PlusCircle size={16} />
          <span>Create Meme</span>
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      ) : memes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No memes yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first meme to get started!
          </p>
          <Link 
            to="/create" 
            className="inline-flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <PlusCircle size={16} />
            <span>Create Meme</span>
          </Link>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {memes.map((meme) => (
            <MemeCard 
              key={meme._id} 
              meme={meme} 
              onDelete={removeMeme}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;