import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter } from 'lucide-react';
import MemeCard from '../components/MemeCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import { getAllMemes, deleteMeme } from '../api/memeAPI';

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'funny', label: 'Funny' },
    { value: 'sad', label: 'Sad' },
    { value: 'reaction', label: 'Reaction' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'other', label: 'Other' },
  ];
  
  useEffect(() => {
    fetchMemes();
  }, [searchTerm, category, page]);
  
  const fetchMemes = async () => {
    try {
      setLoading(true);
      const data = await getAllMemes({
        page,
        limit: 12,
        category,
        search: searchTerm,
        sortBy: 'createdAt',
      });
      setMemes(data.memes);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to load memes. Please try again later.');
      console.error('Error fetching memes:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
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
  
  if (loading && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading type="skeleton" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
        
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={category}
              onChange={handleCategoryChange}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mb-8 rounded-lg bg-error-50 p-6 text-center dark:bg-error-900/20">
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
      )}
      
      {memes.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-12 text-center dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
            No memes found
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {searchTerm
              ? 'Try different search terms or filters'
              : 'Be the first to create an awesome meme!'}
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
        <>
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
          
          {pagination && pagination.pages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(pagination.pages)].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-8 w-8 rounded-full ${
                    page === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;