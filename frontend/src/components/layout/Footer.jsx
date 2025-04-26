import { useTheme } from '../../context/ThemeContext.jsx';
import { Github, Twitter, Coffee } from 'lucide-react';

const Footer = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`py-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} MemeForge. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="transition-colors duration-200 hover:text-purple-600"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="transition-colors duration-200 hover:text-purple-600"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="transition-colors duration-200 hover:text-purple-600"
              aria-label="Buy me a coffee"
            >
              <Coffee size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;