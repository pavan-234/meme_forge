import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Type, Bold, Italic, Underline, Move } from 'lucide-react';
import useEditorStore from '../../store/editorStore';

const TextBox = ({ id, text, x, y, fontSize, color, fontStyle, outline, width, padding }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `text-${id}`,
    data: { type: 'text', id }
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: x,
    top: y,
    width,
    padding,
    fontSize: `${fontSize}px`,
    color,
    fontWeight: fontStyle.bold ? 'bold' : 'normal',
    fontStyle: fontStyle.italic ? 'italic' : 'normal',
    textDecoration: fontStyle.underline ? 'underline' : 'none',
    textShadow: outline ? '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' : 'none',
    cursor: 'move',
    userSelect: 'none',
    touchAction: 'none'
  };
  
  const updateTextBox = useEditorStore((state) => state.updateTextBox);
  const setSelectedElement = useEditorStore((state) => state.setSelectedElement);
  
  const handleTextChange = (e) => {
    updateTextBox(id, { text: e.target.value });
  };
  
  const handleClick = () => {
    setSelectedElement({ type: 'text', id });
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className="group relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute -top-8 left-0 hidden rounded-md bg-white/90 p-1 shadow-lg group-hover:flex dark:bg-gray-800/90"
      >
        <Move size={16} className="text-gray-600 dark:text-gray-400" />
      </div>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        className="w-full bg-transparent text-center focus:outline-none"
        style={{ fontSize: `${fontSize}px`, color }}
      />
    </div>
  );
};

export default TextBox;