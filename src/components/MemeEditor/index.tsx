import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import { Download, Type, Sticker, Image, Settings, Plus } from 'lucide-react';
import TextBox from './TextBox';
import TextControls from './TextControls';
import TemplateSelector from './TemplateSelector';
import { MemeTemplate } from '../../api/memeAPI';

interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  outlineColor: string;
  outlineWidth: number;
}

interface MemeEditorProps {
  initialTemplate?: MemeTemplate;
  onSave: (imageUrl: string, title: string) => void;
}

const MemeEditor: React.FC<MemeEditorProps> = ({ initialTemplate, onSave }) => {
  const [template, setTemplate] = useState<MemeTemplate | null>(initialTemplate || null);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [showTemplateSelector, setShowTemplateSelector] = useState(!initialTemplate);
  
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Set title when template changes
  useEffect(() => {
    if (template) {
      setTitle(template.title);
    }
  }, [template]);
  
  // Add new text box
  const addTextBox = () => {
    const newId = `text-${Date.now()}`;
    const newTextItem: TextItem = {
      id: newId,
      text: 'Edit this text',
      x: 50,
      y: 50,
      fontSize: 24,
      fontFamily: 'Impact',
      color: '#FFFFFF',
      bold: false,
      italic: false,
      outlineColor: '#000000',
      outlineWidth: 2,
    };
    
    setTextItems([...textItems, newTextItem]);
    setActiveTextId(newId);
  };
  
  // Update text item
  const updateTextItem = (id: string, updates: Partial<TextItem>) => {
    setTextItems(
      textItems.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };
  
  // Delete text item
  const deleteTextItem = (id: string) => {
    setTextItems(textItems.filter(item => item.id !== id));
    if (activeTextId === id) {
      setActiveTextId(null);
    }
  };
  
  // Handle template selection
  const handleTemplateSelect = (selectedTemplate: MemeTemplate) => {
    setTemplate(selectedTemplate);
    setTitle(selectedTemplate.title);
    setShowTemplateSelector(false);
  };
  
  // Generate and download meme
  const generateMeme = async () => {
    if (!editorRef.current || !template) return;
    
    try {
      // Hide active text controls before capturing
      const activeTextId = document.querySelector('.text-controls');
      if (activeTextId) {
        activeTextId.classList.add('hidden');
      }
      
      const dataUrl = await htmlToImage.toJpeg(editorRef.current, { quality: 0.95 });
      
      // Show text controls again
      if (activeTextId) {
        activeTextId.classList.remove('hidden');
      }
      
      // Save or download
      onSave(dataUrl, title);
      
    } catch (error) {
      console.error('Error generating meme:', error);
    }
  };
  
  const downloadMeme = async () => {
    if (!editorRef.current || !template) return;
    
    try {
      const activeTextId = document.querySelector('.text-controls');
      if (activeTextId) {
        activeTextId.classList.add('hidden');
      }
      
      const dataUrl = await htmlToImage.toJpeg(editorRef.current, { quality: 0.95 });
      
      if (activeTextId) {
        activeTextId.classList.remove('hidden');
      }
      
      // Download
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.href = dataUrl;
      link.click();
      
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {showTemplateSelector ? (
        <TemplateSelector onSelect={handleTemplateSelect} />
      ) : (
        <div className="space-y-6">
          {/* Title input */}
          <div>
            <label htmlFor="meme-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meme Title
            </label>
            <input
              id="meme-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter a title for your meme"
            />
          </div>
          
          {/* Editor toolbar */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors"
              onClick={addTextBox}
            >
              <Type size={16} />
              <span>Add Text</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors"
              onClick={() => setShowTemplateSelector(true)}
            >
              <Image size={16} />
              <span>Change Template</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors"
              onClick={generateMeme}
            >
              <Plus size={16} />
              <span>Save Meme</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-colors"
              onClick={downloadMeme}
            >
              <Download size={16} />
              <span>Download</span>
            </motion.button>
          </div>
          
          {/* Editor canvas */}
          <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            {template ? (
              <div ref={editorRef} className="relative">
                <img 
                  src={template.imageUrl} 
                  alt={template.title}
                  className="w-full max-h-[600px] object-contain"
                />
                
                {textItems.map(item => (
                  <TextBox
                    key={item.id}
                    item={item}
                    isActive={activeTextId === item.id}
                    onClick={() => setActiveTextId(item.id)}
                    onDelete={() => deleteTextItem(item.id)}
                    onChange={(updates) => updateTextItem(item.id, updates)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray-500 dark:text-gray-400">Please select a template</p>
              </div>
            )}
          </div>
          
          {/* Text controls */}
          {activeTextId && (
            <TextControls
              textItem={textItems.find(item => item.id === activeTextId)!}
              onChange={updates => updateTextItem(activeTextId, updates)}
              onDelete={() => deleteTextItem(activeTextId)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MemeEditor;