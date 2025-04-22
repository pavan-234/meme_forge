import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import MemeCard from '../components/MemeCard';
import Loading from '../components/Loading';
import { getAllMemes, deleteMeme } from '../api/memeAPI';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchMemes();
  }, []);
  
  const fetchMemes = async () => {
    try {
      setLoading(true);
      const data = await getAllMemes();
      setMemes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load memes. Please try again later.');
      console.error('Error fetching memes:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      try {
        await deleteMeme(id);
        setMemes((prevMemes) => prevMemes.filter((meme) => meme._id !== id));
      } catch (err) {
        setError('Failed to delete meme. Please try again.');
        console.error('Error deleting meme:', err);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading type="skeleton" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-error-50 p-6 text-center dark:bg-error-900/20">
          <h2 className="mb-2 text-lg font-medium text-error-700 dark:text-error-400">
            {error}
          </h2>
          <button
            onClick={fetchMemes}
            className="mt-4 rounded-md bg-error-100 px-4 py-2 text-error-700 hover:bg-error-200 dark:bg-error-900/40 dark:text-error-400 dark:hover:bg-error-900/60"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Latest Memes
        </h1>
        
        <Link to="/create">
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={18} className="mr-2" />
            Create New Meme
          </motion.button>
        </Link>
      </div>
      
      {memes.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-12 text-center dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
            No memes yet
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Be the first to create an awesome meme!
          </p>
          <Link to="/create">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={18} className="mr-2" />
              Create New Meme
            </motion.button>
          </Link>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memes.map((meme) => (
              <MemeCard 
                key={meme._id} 
                meme={meme} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Home;