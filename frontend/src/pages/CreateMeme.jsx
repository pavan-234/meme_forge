import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import MemeEditor from '../components/editor/MemeEditor.jsx';
import Loader from '../components/ui/Loader.jsx';
import { getTemplates, getRandomTemplate } from '../api/memeAPI.js';
import { useTheme } from '../context/ThemeContext.jsx';

const CreateMeme = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [template, setTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all templates
        const allTemplates = await getTemplates();
        setTemplates(allTemplates);
        
        // If templateId is provided, find the specific template
        if (templateId) {
          const selectedTemplate = allTemplates.find(t => t._id === templateId);
          if (selectedTemplate) {
            setTemplate(selectedTemplate);
          } else {
            // Fallback to random template if ID not found
            const randomTemplate = await getRandomTemplate();
            setTemplate(randomTemplate);
          }
        } else {
          // Get random template if no ID provided
          const randomTemplate = await getRandomTemplate();
          setTemplate(randomTemplate);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [templateId]);

  useEffect(() => {
    // Filter templates based on search query
    if (searchQuery.trim() === '') {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredTemplates(filtered);
    }
  }, [searchQuery, templates]);

  const handleSaveSuccess = () => {
    navigate('/');
  };

  const handleSelectTemplate = (newTemplate) => {
    setTemplate(newTemplate);
  };

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
          icon={<ArrowLeft size={16} />}
        >
          Back to Home
        </Button>
        
        <h1 className={`text-2xl font-bold mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Create Your Meme
        </h1>
      </div>
      
      {isLoading ? (
        <Loader size="lg" color="purple" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template Selector (Left Side) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="text-lg font-medium mb-4">Template Gallery</h3>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className={`w-full px-3 py-2 rounded-md border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              
              <div className="max-h-[600px] overflow-y-auto space-y-3 pr-1">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((templateItem) => (
                    <motion.div
                      key={templateItem._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-1 rounded-md cursor-pointer transition-colors ${
                        template && template._id === templateItem._id
                          ? 'ring-2 ring-purple-500'
                          : ''
                      }`}
                      onClick={() => handleSelectTemplate(templateItem)}
                    >
                      <div className="relative h-24 w-full">
                        <img
                          src={templateItem.imageUrl}
                          alt={templateItem.title}
                          className="h-full w-full object-contain bg-white dark:bg-gray-700 rounded"
                        />
                      </div>
                      <p className="mt-1 text-sm truncate">
                        {templateItem.title}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No templates found
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Meme Editor (Right Side) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <MemeEditor template={template} onSaveSuccess={handleSaveSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMeme;