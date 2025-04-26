import { useState, useEffect, useRef } from 'react';

const TextBox = ({ textBox, isSelected, onSelect, onChange, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: textBox.x, y: textBox.y });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const textBoxRef = useRef(null);

  // Update position when textBox.x or textBox.y changes
  useEffect(() => {
    setPosition({ x: textBox.x, y: textBox.y });
  }, [textBox.x, textBox.y]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    onSelect();
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    onSelect();
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const parentRect = textBoxRef.current.parentElement.getBoundingClientRect();
    const textBoxRect = textBoxRef.current.getBoundingClientRect();
    
    // Calculate new position
    let newX = e.clientX - startPos.x;
    let newY = e.clientY - startPos.y;
    
    // Constrain to parent boundaries
    newX = Math.max(0, Math.min(newX, parentRect.width - textBoxRect.width));
    newY = Math.max(0, Math.min(newY, parentRect.height - textBoxRect.height));
    
    setPosition({ x: newX, y: newY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const parentRect = textBoxRef.current.parentElement.getBoundingClientRect();
    const textBoxRect = textBoxRef.current.getBoundingClientRect();
    
    // Calculate new position
    let newX = touch.clientX - startPos.x;
    let newY = touch.clientY - startPos.y;
    
    // Constrain to parent boundaries
    newX = Math.max(0, Math.min(newX, parentRect.width - textBoxRect.width));
    newY = Math.max(0, Math.min(newY, parentRect.height - textBoxRect.height));
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Update the parent component with the new position
      onChange({ x: position.x, y: position.y });
    }
  };

  useEffect(() => {
    // Add global event listeners for mouse/touch events
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, startPos]);

  // Style for the text with text stroke effect
  const textStyle = {
    fontWeight: textBox.fontWeight,
    fontStyle: textBox.fontStyle,
    fontSize: `${textBox.fontSize}px`,
    color: textBox.color,
    textDecoration: textBox.textDecoration,
    textAlign: textBox.textAlign,
    // Text stroke effect
    WebkitTextStroke: `${textBox.outlineWidth}px ${textBox.outlineColor}`,
    textShadow: `${textBox.outlineWidth}px ${textBox.outlineWidth}px 0 ${textBox.outlineColor},
                 -${textBox.outlineWidth}px ${textBox.outlineWidth}px 0 ${textBox.outlineColor},
                 ${textBox.outlineWidth}px -${textBox.outlineWidth}px 0 ${textBox.outlineColor},
                 -${textBox.outlineWidth}px -${textBox.outlineWidth}px 0 ${textBox.outlineColor}`,
    fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
    lineHeight: '1.2',
    userSelect: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    maxWidth: '80%',
    wordWrap: 'break-word',
  };

  return (
    <div
      ref={textBoxRef}
      className={`absolute p-2 ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isSelected ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={() => onSelect()}
    >
      <div style={textStyle}>{textBox.text}</div>
    </div>
  );
};

export default TextBox;