import { motion } from 'framer-motion';

const Loader = ({ size = 'md', color = 'purple', fullScreen = false }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  
  const colorMap = {
    purple: 'border-purple-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    gray: 'border-gray-600',
  };
  
  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeMap[size]} border-4 border-t-transparent rounded-full ${colorMap[color]}`}
    />
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
        {spinner}
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center p-4">
      {spinner}
    </div>
  );
};

export default Loader;