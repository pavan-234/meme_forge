import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="absolute"
      >
        {darkMode ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-primary-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;