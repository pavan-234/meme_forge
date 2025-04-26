import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button.jsx';
import { Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const NotFound = () => {
  const { darkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
    >
      <h1 className={`text-7xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        404
      </h1>
      <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="primary" icon={<Home size={18} />}>
          Go Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFound;