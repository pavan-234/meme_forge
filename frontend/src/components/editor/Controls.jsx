import React from 'react';
import { HexColorPicker } from 'react-colorful';
import {
  Bold,
  Italic,
  Underline,
  Type,
  Image as ImageIcon,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import useEditorStore from '../../store/editorStore';

const Controls = () => {
  const {
    selectedElement,
    textBoxes,
    updateTextBox,
    removeTextBox,
    removeSticker,
  } = useEditorStore();
  
  if (!selectedElement) return null;
  
  const element =
    selectedElement.type === 'text'
      ? textBoxes.find((box) => box.id === selectedElement.id)
      : null;
  
  const handleFontSizeChange = (delta) => {
    if (element) {
      updateTextBox(element.id, {
        fontSize: Math.max(12, Math.min(72, element.fontSize + delta)),
      });
    }
  };
  
  const handleStyleChange = (style) => {
    if (element) {
      updateTextBox(element.id, {
        fontStyle: {
          ...element.fontStyle,
          [style]: !element.fontStyle[style],
        },
      });
    }
  };
  
  const handleColorChange = (color) => {
    if (element) {
      updateTextBox(element.id, { color });
    }
  };
  
  const handleDelete = () => {
    if (selectedElement.type === 'text') {
      removeTextBox(selectedElement.id);
    } else if (selectedElement.type === 'sticker') {
      removeSticker(selectedElement.id);
    }
  };
  
  return (
    <div className="absolute right-4 top-4 space-y-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      {selectedElement.type === 'text' && element && (
        <>
          <div className="flex items-center justify-between space-x-2">
            <button
              onClick={() => handleFontSizeChange(-2)}
              className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Minus size={16} />
            </button>
            <span className="min-w-[3ch] text-center">{element.fontSize}</span>
            <button
              onClick={() => handleFontSizeChange(2)}
              className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleStyleChange('bold')}
              className={`rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                element.fontStyle.bold ? 'bg-primary-100 dark:bg-primary-900' : ''
              }`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => handleStyleChange('italic')}
              className={`rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                element.fontStyle.italic ? 'bg-primary-100 dark:bg-primary-900' : ''
              }`}
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => handleStyleChange('underline')}
              className={`rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                element.fontStyle.underline ? 'bg-primary-100 dark:bg-primary-900' : ''
              }`}
            >
              <Underline size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Color</label>
            <HexColorPicker color={element.color} onChange={handleColorChange} />
          </div>
        </>
      )}
      
      <button
        onClick={handleDelete}
        className="flex w-full items-center justify-center space-x-2 rounded-md bg-error-100 p-2 text-error-700 hover:bg-error-200 dark:bg-error-900/20 dark:text-error-400 dark:hover:bg-error-900/40"
      >
        <Trash2 size={16} />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default Controls;