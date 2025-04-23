import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search memes..."
          className="w-full rounded-full border border-gray-300 bg-white py-2 pl-12 pr-10 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Search size={18} className="text-gray-400" />
        </div>
        {searchTerm && (
          <motion.button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={18} />
          </motion.button>
        )}
      </div>
    </form>
  );
};

export default SearchBar