import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, XCircle } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import MemeCard from '../components/meme/MemeCard.jsx';
import Loader from '../components/ui/Loader.jsx';
import MemeForm from '../components/meme/MemeForm.jsx';
import { getTemplates, getMemes, searchTemplates } from '../api/memeAPI.js';
import { useTheme } from '../context/ThemeContext.jsx';

const Home = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState([]);
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { darkMode } = useTheme();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      if (activeTab === 'templates') {
        const data = await getTemplates();
        setTemplates(data);
      } else {
        const data = await getMemes();
        setMemes(data);
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      const results = await searchTemplates(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching templates:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMemeDelete = (id) => {
    setMemes(memes.filter(meme => meme._id !== id));
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    fetchData();
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Determine what to display
  const displayItems = searchQuery.trim() && searchResults.length > 0
    ? searchResults
    : activeTab === 'templates'
      ? templates
      : memes;

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          MemeForge
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Create, customize, and share hilarious memes
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for templates..."
              className={`w-full px-4 py-2 pl-10 rounded-l-md border ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18} 
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>
          <Button type="submit" variant="primary" className="rounded-l-none">
            Search
          </Button>
        </form>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'templates'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('memes')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'memes'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            My Memes
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {searchQuery.trim() && searchResults.length > 0
              ? `Search Results for "${searchQuery}"`
              : activeTab === 'templates'
              ? 'Meme Templates'
              : 'My Created Memes'}
          </h2>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'templates' && (
            <Button
              variant="outline"
              onClick={() => setShowUploadForm(!showUploadForm)}
              icon={<PlusCircle size={18} />}
            >
              {showUploadForm ? 'Cancel Upload' : 'Upload Template'}
            </Button>
          )}
          <Link to="/create">
            <Button variant="primary" icon={<PlusCircle size={18} />}>
              Create Meme
            </Button>
          </Link>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <MemeForm onSuccess={handleUploadSuccess} />
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <Loader size="lg" color="purple" />
      ) : (
        <>
          {/* Search Results / Templates / Memes */}
          {displayItems.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {displayItems.map((item) => (
                <motion.div key={item._id} variants={itemVariants}>
                  <MemeCard
                    meme={item}
                    isTemplate={activeTab === 'templates' || searchQuery.trim()}
                    onDelete={handleMemeDelete}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {searchQuery.trim() ? (
                <p>No results found for "{searchQuery}". Try another search term.</p>
              ) : activeTab === 'templates' ? (
                <p>No templates available. Be the first to upload a template!</p>
              ) : (
                <p>You haven't created any memes yet. Start by creating one!</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;