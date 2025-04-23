import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Move } from 'lucide-react';
import useEditorStore from '../../store/editorStore';

const TextBox = ({
  id,
  text,
  x,
  y,
  fontSize,
  color,
  fontStyle,
  outline,
  width,
  padding,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `text-${id}`,
    data: { type: 'text', id },
  });

  const updateTextBox = useEditorStore((state) => state.updateTextBox);
  const setSelectedElement = useEditorStore((state) => state.setSelectedElement);

  const handleTextChange = (e) => {
    updateTextBox(id, { text: e.target.value });
  };

  const handleClick = () => {
    setSelectedElement({ type: 'text', id });
  };

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
    textShadow: outline
      ? '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'
      : 'none',
    cursor: 'move',
    userSelect: 'none',
    touchAction: 'none',
    zIndex: 20,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className="group"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -top-8 left-1/2 -translate-x-1/2 hidden rounded bg-white/90 px-2 py-1 shadow-lg group-hover:flex dark:bg-gray-800/90"
        title="Drag to move"
      >
        <Move size={16} className="text-gray-600 dark:text-gray-400" />
      </div>

      {/* Editable Text Input */}
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        className="w-full bg-transparent text-center focus:outline-none"
        style={{
          fontSize: `${fontSize}px`,
          color,
          textShadow: style.textShadow,
          fontWeight: style.fontWeight,
          fontStyle: style.fontStyle,
          textDecoration: style.textDecoration,
        }}
        title="Click to edit"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default TextBox;
