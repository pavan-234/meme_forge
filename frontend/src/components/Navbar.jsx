import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { to: '/', label: 'Home', active: location.pathname === '/' },
    { to: '/create', label: 'Create Meme', active: location.pathname === '/create' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Camera size={32} className="text-primary-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">MemeForge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  link.active 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                {link.active && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600 dark:bg-primary-400" 
                    initial={false}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={toggleMenu}
              className="ml-2 rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    link.active 
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;