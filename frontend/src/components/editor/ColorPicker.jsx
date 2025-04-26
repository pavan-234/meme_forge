import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useTheme } from '../../context/ThemeContext.jsx';

const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          type="button"
          className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center mr-2"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open color picker"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={`px-3 py-1 rounded border ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
          }`}
          placeholder="#FFFFFF"
        />
      </div>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={handleClickOutside}
          />
          <div className="absolute z-20 mt-2">
            <HexColorPicker color={color} onChange={onChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;