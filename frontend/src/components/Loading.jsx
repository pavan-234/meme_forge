import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <div className="h-60 w-full animate-pulse bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-4">
            <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mt-3 flex items-center justify-between">
              <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute h-full w-full rounded-full border-4 border-t-primary-600 dark:border-t-primary-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

const Loading = ({ type = 'spinner' }) => {
  return type === 'skeleton' ? <LoadingSkeleton /> : <LoadingSpinner />;
};

export default Loading;