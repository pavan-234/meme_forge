import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Github, Twitter, Instagram } from 'lucide-react'; // ✅ Import all needed icons

const Footer = () => {
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-white py-8 shadow-inner dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {year} MemeForge. All rights reserved.
            </p>
            <div className="mt-2 flex items-center justify-center text-xs text-gray-500 dark:text-gray-500 md:justify-start">
              Made with
              <motion.div 
                whileHover={{ scale: 1.3 }}
                className="mx-1"
              >
                <Heart size={14} className="fill-red-500 text-red-500" />
              </motion.div>
              by MemeForge Team
            </div>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
