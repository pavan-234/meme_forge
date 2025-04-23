import React from 'react';
import { HexColorPicker } from 'react-colorful';
import {
  Bold,
  Italic,
  Underline,
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

  const isText = selectedElement.type === 'text';
  const element = isText
    ? textBoxes.find((box) => box.id === selectedElement.id)
    : null;

  const handleFontSizeChange = (delta) => {
    if (!element) return;
    const newSize = Math.max(12, Math.min(72, element.fontSize + delta));
    updateTextBox(element.id, { fontSize: newSize });
  };

  const handleStyleToggle = (style) => {
    if (!element) return;
    updateTextBox(element.id, {
      fontStyle: {
        ...element.fontStyle,
        [style]: !element.fontStyle[style],
      },
    });
  };

  const handleColorChange = (color) => {
    if (!element) return;
    updateTextBox(element.id, { color });
  };

  const handleDelete = () => {
    if (isText) {
      removeTextBox(selectedElement.id);
    } else if (selectedElement.type === 'sticker') {
      removeSticker(selectedElement.id);
    }
  };

  return (
    <div className="absolute right-4 top-4 space-y-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 z-50">
      {isText && element && (
        <>
          {/* Font Size Controls */}
          <div className="flex items-center justify-between space-x-2">
            <button
              onClick={() => handleFontSizeChange(-2)}
              className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Decrease font size"
            >
              <Minus size={16} />
            </button>
            <span className="min-w-[3ch] text-center font-medium">{element.fontSize}</span>
            <button
              onClick={() => handleFontSizeChange(2)}
              className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Increase font size"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Text Style Toggles */}
          <div className="flex space-x-2">
            <StyleToggle
              active={element.fontStyle.bold}
              icon={Bold}
              onClick={() => handleStyleToggle('bold')}
              label="Bold"
            />
            <StyleToggle
              active={element.fontStyle.italic}
              icon={Italic}
              onClick={() => handleStyleToggle('italic')}
              label="Italic"
            />
            <StyleToggle
              active={element.fontStyle.underline}
              icon={Underline}
              onClick={() => handleStyleToggle('underline')}
              label="Underline"
            />
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Text Color</label>
            <HexColorPicker color={element.color} onChange={handleColorChange} />
          </div>
        </>
      )}

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="flex w-full items-center justify-center space-x-2 rounded-md bg-red-100 p-2 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
        title="Delete selected element"
      >
        <Trash2 size={16} />
        <span>Delete</span>
      </button>
    </div>
  );
};

// Reusable toggle button for styles
const StyleToggle = ({ active, icon: Icon, onClick, label }) => (
  <button
    onClick={onClick}
    className={`rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
      active ? 'bg-primary-100 dark:bg-primary-900' : ''
    }`}
    title={label}
  >
    <Icon size={16} />
  </button>
);

export default Controls;
