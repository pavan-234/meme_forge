import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Plus, Trash2, Download, Save, RefreshCcw
} from 'lucide-react';
import Button from '../ui/Button.jsx';
import TextBox from './TextBox.jsx';
import ColorPicker from './ColorPicker.jsx';
import { getRandomTemplate, saveGeneratedMeme } from '../../api/memeAPI.js';
import { useTheme } from '../../context/ThemeContext.jsx';

const MemeEditor = ({ template, onSaveSuccess }) => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedTextBoxId, setSelectedTextBoxId] = useState(null);
  const [memeTitle, setMemeTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(template);
  const memeRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    // When template prop changes, update the current template
    if (template) {
      setCurrentTemplate(template);
      setMemeTitle(template.title ? `Edit of ${template.title}` : 'My Custom Meme');
      // Reset text boxes when template changes
      setTextBoxes([]);
      setSelectedTextBoxId(null);
    }
  }, [template]);

  const handleAddTextBox = () => {
    const newTextBox = {
      id: Date.now().toString(),
      text: 'Add text here',
      x: 50,
      y: 50,
      fontSize: 24,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 2,
      textAlign: 'center',
    };
    
    setTextBoxes([...textBoxes, newTextBox]);
    setSelectedTextBoxId(newTextBox.id);
  };

  const handleTextBoxSelect = (id) => {
    setSelectedTextBoxId(id);
  };

  const handleTextBoxChange = (id, changes) => {
    setTextBoxes(
      textBoxes.map((box) => (box.id === id ? { ...box, ...changes } : box))
    );
  };

  const handleTextBoxDelete = (id) => {
    setTextBoxes(textBoxes.filter((box) => box.id !== id));
    if (selectedTextBoxId === id) {
      setSelectedTextBoxId(null);
    }
  };

  const handleRandomTemplate = async () => {
    try {
      setIsLoadingTemplate(true);
      const newTemplate = await getRandomTemplate();
      setCurrentTemplate(newTemplate);
      setMemeTitle(newTemplate.title ? `Edit of ${newTemplate.title}` : 'My Custom Meme');
      // Reset text boxes when template changes
      setTextBoxes([]);
      setSelectedTextBoxId(null);
    } catch (error) {
      console.error('Error fetching random template:', error);
    } finally {
      setIsLoadingTemplate(false);
    }
  };

  const handleDownload = async () => {
    if (!memeRef.current) return;

    try {
      const dataUrl = await toPng(memeRef.current, { quality: 0.95 });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = `${memeTitle.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  };

  const handleSave = async () => {
    if (!memeRef.current) return;

    try {
      setIsLoading(true);
      const dataUrl = await toPng(memeRef.current, { quality: 0.95 });
      
      // Save meme to database
      const memeData = {
        title: memeTitle,
        imageUrl: dataUrl,
        tags: currentTemplate.tags || [],
      };
      
      await saveGeneratedMeme(memeData);
      
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (error) {
      console.error('Error saving meme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Find the selected text box
  const selectedTextBox = textBoxes.find((box) => box.id === selectedTextBoxId);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Meme Canvas (Left side) */}
      <div className="col-span-1 md:col-span-2">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Meme Editor</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag text boxes to position them on the image
          </p>
        </div>

        {currentTemplate ? (
          <div className="relative border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div 
              ref={memeRef}
              className="relative"
              style={{ 
                backgroundImage: `url(${currentTemplate.imageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '400px'
              }}
            >
              {/* Text boxes */}
              {textBoxes.map((textBox) => (
                <TextBox
                  key={textBox.id}
                  textBox={textBox}
                  isSelected={selectedTextBoxId === textBox.id}
                  onSelect={() => handleTextBoxSelect(textBox.id)}
                  onChange={(changes) => handleTextBoxChange(textBox.id, changes)}
                  onDelete={() => handleTextBoxDelete(textBox.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Select a template to start creating your meme
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={handleAddTextBox}
            icon={<Plus size={18} />}
            disabled={!currentTemplate}
          >
            Add Text
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleRandomTemplate}
            icon={<RefreshCcw size={18} />}
            disabled={isLoadingTemplate}
          >
            {isLoadingTemplate ? 'Loading...' : 'Random Template'}
          </Button>
          
          <Button
            variant="success"
            onClick={handleDownload}
            icon={<Download size={18} />}
            disabled={!currentTemplate || textBoxes.length === 0}
          >
            Download
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSave}
            icon={<Save size={18} />}
            disabled={!currentTemplate || textBoxes.length === 0 || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Meme'}
          </Button>
        </div>
      </div>

      {/* Controls Panel (Right side) */}
      <div className="col-span-1">
        <div className="sticky top-20">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-medium mb-4">Meme Settings</h3>
            
            <div className="mb-4">
              <label htmlFor="memeTitle" className="block mb-1 text-sm font-medium">
                Meme Title
              </label>
              <input
                type="text"
                id="memeTitle"
                value={memeTitle}
                onChange={(e) => setMemeTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter meme title"
              />
            </div>
            
            {selectedTextBox ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="text" className="block mb-1 text-sm font-medium">
                    Text
                  </label>
                  <textarea
                    id="text"
                    value={selectedTextBox.text}
                    onChange={(e) =>
                      handleTextBoxChange(selectedTextBox.id, { text: e.target.value })
                    }
                    className={`w-full px-3 py-2 rounded-md border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Font Size
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={selectedTextBox.fontSize}
                    onChange={(e) =>
                      handleTextBoxChange(selectedTextBox.id, {
                        fontSize: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>12px</span>
                    <span>{selectedTextBox.fontSize}px</span>
                    <span>72px</span>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Text Color
                  </label>
                  <ColorPicker
                    color={selectedTextBox.color}
                    onChange={(color) =>
                      handleTextBoxChange(selectedTextBox.id, { color })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Outline Color
                  </label>
                  <ColorPicker
                    color={selectedTextBox.outlineColor}
                    onChange={(outlineColor) =>
                      handleTextBoxChange(selectedTextBox.id, { outlineColor })
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Outline Width
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={selectedTextBox.outlineWidth}
                    onChange={(e) =>
                      handleTextBoxChange(selectedTextBox.id, {
                        outlineWidth: parseFloat(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>0px</span>
                    <span>{selectedTextBox.outlineWidth}px</span>
                    <span>5px</span>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Text Style
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleTextBoxChange(selectedTextBox.id, {
                          fontWeight:
                            selectedTextBox.fontWeight === 'bold' ? 'normal' : 'bold',
                        })
                      }
                      className={`p-2 rounded ${
                        selectedTextBox.fontWeight === 'bold'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-label="Bold"
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleTextBoxChange(selectedTextBox.id, {
                          fontStyle:
                            selectedTextBox.fontStyle === 'italic' ? 'normal' : 'italic',
                        })
                      }
                      className={`p-2 rounded ${
                        selectedTextBox.fontStyle === 'italic'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-label="Italic"
                    >
                      <Italic size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleTextBoxChange(selectedTextBox.id, {
                          textDecoration:
                            selectedTextBox.textDecoration === 'underline'
                              ? 'none'
                              : 'underline',
                        })
                      }
                      className={`p-2 rounded ${
                        selectedTextBox.textDecoration === 'underline'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-label="Underline"
                    >
                      <Underline size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Text Alignment
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleTextBoxChange(selectedTextBox.id, { textAlign: 'left' })
                      }
                      className={`p-2 rounded ${
                        selectedTextBox.textAlign === 'left'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-label="Align Left"
                    >
                      <AlignLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleTextBoxChange(selectedTextBox.id, { textAlign: 'center' })
                      }
                      className={`p-2 rounded ${
                        selectedTextBox.textAlign === 'center'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-label="Align Center"
                    >
                      <AlignCenter size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleTextBoxChange(selectedTextBox.id, { textAlign: 'right' })
                      }
                      className={`p-2 rounded ${
                        selectedTextBox.textAlign === 'right'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-label="Align Right"
                    >
                      <AlignRight size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleTextBoxDelete(selectedTextBox.id)}
                    fullWidth
                    icon={<Trash2 size={16} />}
                  >
                    Delete Text Box
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {textBoxes.length > 0
                    ? 'Select a text box to edit'
                    : 'Add a text box to get started'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;