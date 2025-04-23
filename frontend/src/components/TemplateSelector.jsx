import React from 'react';
import { motion } from 'framer-motion';

const templates = [
  {
    id: 1,
    name: 'Drake Hotline Bling',
    url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    category: 'reaction',
  },
  {
    id: 2,
    name: 'Two Buttons',
    url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    category: 'decision',
  },
  {
    id: 3,
    name: 'Distracted Boyfriend',
    url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    category: 'reaction',
  },
  {
    id: 4,
    name: 'Running Away Balloon',
    url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    category: 'metaphor',
  },
  // Add more templates as needed
];

const TemplateSelector = ({ onSelect }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Choose a Template
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className="group cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-colors hover:border-primary-500 dark:hover:border-primary-400"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template)}
          >
            <div className="relative aspect-square">
              <img
                src={template.url}
                alt={template.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-40">
                <div className="flex h-full items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900">
                    Use Template
                  </span>
                </div>
              </div>
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {template.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {template.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector