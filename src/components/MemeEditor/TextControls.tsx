import React from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Type, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import Select from 'react-select';

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
  width: number;
  height: number;
  rotation: number;
}

interface TextControlsProps {
  textItem: TextItem;
  onChange: (updates: Partial<TextItem>) => void;
  onDelete: () => void;
}

const fonts = [
  { value: 'Impact, sans-serif', label: 'Impact' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: '"Comic Sans MS", cursive', label: 'Comic Sans' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: '"Helvetica Neue", sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Courier New", monospace', label: 'Courier' },
];

const TextControls: React.FC<TextControlsProps> = ({ textItem, onChange, onDelete }) => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showOutlineColorPicker, setShowOutlineColorPicker] = React.useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
          <Type size={16} className="mr-2" />
          Text Controls
        </h3>
        <button
          type="button"
          onClick={onDelete}
          className="p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Font family */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font
          </label>
          <Select
            value={fonts.find(f => f.value === textItem.fontFamily)}
            onChange={(option) => option && onChange({ fontFamily: option.value })}
            options={fonts}
            className="react-select-container"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#7C3AED',
                primary75: '#8B5CF6',
                primary50: '#A78BFA',
                primary25: '#C4B5FD',
              },
            })}
          />
        </div>
        
        {/* Font size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font Size
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="12"
              max="72"
              value={textItem.fontSize}
              onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
              className="flex-grow"
            />
            <input
              type="number"
              min="12"
              max="72"
              value={textItem.fontSize}
              onChange={(e) => onChange({ fontSize: parseInt(e.target.value) })}
              className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-center dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        {/* Text formatting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Formatting
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onChange({ bold: !textItem.bold })}
              className={`p-2 rounded-md ${
                textItem.bold
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => onChange({ italic: !textItem.italic })}
              className={`p-2 rounded-md ${
                textItem.italic
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Italic size={16} />
            </button>
            <button
              type="button"
              onClick={() => onChange({ textAlign: 'left' })}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
            >
              <AlignLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => onChange({ textAlign: 'center' })}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
            >
              <AlignCenter size={16} />
            </button>
            <button
              type="button"
              onClick={() => onChange({ textAlign: 'right' })}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
            >
              <AlignRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Text color */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Text Color
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: textItem.color }}
            />
            <input
              type="text"
              value={textItem.color}
              onChange={(e) => onChange({ color: e.target.value })}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          {showColorPicker && (
            <div className="absolute z-10 mt-2">
              <div className="fixed inset-0" onClick={() => setShowColorPicker(false)} />
              <div className="relative">
                <HexColorPicker
                  color={textItem.color}
                  onChange={(color) => onChange({ color })}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Outline color */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Outline Color
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowOutlineColorPicker(!showOutlineColorPicker)}
              className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: textItem.outlineColor }}
            />
            <input
              type="text"
              value={textItem.outlineColor}
              onChange={(e) => onChange({ outlineColor: e.target.value })}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          {showOutlineColorPicker && (
            <div className="absolute z-10 mt-2">
              <div className="fixed inset-0" onClick={() => setShowOutlineColorPicker(false)} />
              <div className="relative">
                <HexColorPicker
                  color={textItem.outlineColor}
                  onChange={(color) => onChange({ outlineColor: color })}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Outline width */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Outline Width
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={textItem.outlineWidth}
              onChange={(e) => onChange({ outlineWidth: parseFloat(e.target.value) })}
              className="flex-grow"
            />
            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={textItem.outlineWidth}
              onChange={(e) => onChange({ outlineWidth: parseFloat(e.target.value) })}
              className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-center dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TextControls;