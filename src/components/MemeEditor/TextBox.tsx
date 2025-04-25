import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { motion } from 'framer-motion';
import { Trash2, RotateCcw, Move, Type } from 'lucide-react';

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

interface TextBoxProps {
  item: TextItem;
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  onClick: () => void;
  onDelete: () => void;
  onChange: (updates: Partial<TextItem>) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ 
  item, 
  isActive, 
  containerRef, 
  onClick, 
  onDelete, 
  onChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Text style
  const textStyle: React.CSSProperties = {
    fontSize: `${item.fontSize}px`,
    fontFamily: item.fontFamily,
    color: item.color,
    fontWeight: item.bold ? 'bold' : 'normal',
    fontStyle: item.italic ? 'italic' : 'normal',
    cursor: isDragging ? 'grabbing' : 'grab',
    textShadow: item.outlineWidth > 0 
      ? `
         -${item.outlineWidth}px -${item.outlineWidth}px 0 ${item.outlineColor},  
          ${item.outlineWidth}px -${item.outlineWidth}px 0 ${item.outlineColor},
         -${item.outlineWidth}px ${item.outlineWidth}px 0 ${item.outlineColor},
          ${item.outlineWidth}px ${item.outlineWidth}px 0 ${item.outlineColor}
        `
      : 'none',
    transform: `rotate(${item.rotation}deg)`,
    userSelect: 'none',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    wordBreak: 'break-word',
    padding: '4px',
  };
  
  // Handle text editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newText = prompt('Edit text:', item.text);
    if (newText !== null) {
      onChange({ text: newText });
    }
  };
  
  // Handle drag
  const handleDrag = (_e: any, data: any) => {
    setIsDragging(true);
    
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newX = (data.x / containerRect.width) * 100;
      const newY = (data.y / containerRect.height) * 100;
      
      onChange({
        x: Math.max(0, Math.min(100, newX)),
        y: Math.max(0, Math.min(100, newY)),
      });
    }
  };
  
  // Handle resize
  const handleResize = (_e: any, { size }: any) => {
    setIsResizing(true);
    onChange({
      width: size.width,
      height: size.height,
    });
  };
  
  // Handle rotation
  const handleRotate = (direction: 1 | -1) => {
    const newRotation = (item.rotation + (90 * direction)) % 360;
    onChange({ rotation: newRotation });
  };
  
  return (
    <Draggable
      handle=".drag-handle"
      position={{ x: item.x, y: item.y }}
      onDrag={handleDrag}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <ResizableBox
        width={item.width}
        height={item.height}
        onResize={handleResize}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        minConstraints={[50, 20]}
        maxConstraints={[500, 200]}
        className={`absolute ${isActive ? 'z-50' : 'z-10'}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div
          ref={textRef}
          style={textStyle}
          onDoubleClick={handleDoubleClick}
          className={`relative group ${isActive ? 'ring-2 ring-purple-500' : ''}`}
        >
          {item.text}
          
          {isActive && (
            <>
              {/* Control buttons */}
              <div className="absolute -top-8 right-0 flex space-x-1 bg-gray-800 rounded-md p-1 opacity-90">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRotate(-1);
                  }}
                  className="text-white hover:text-purple-400 transition-colors p-1"
                  title="Rotate left"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRotate(1);
                  }}
                  className="text-white hover:text-purple-400 transition-colors p-1"
                  title="Rotate right"
                >
                  <RotateCcw size={14} className="transform scale-x-[-1]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-white hover:text-red-400 transition-colors p-1"
                  title="Delete text"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              
              {/* Drag handle */}
              <div className="drag-handle absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 bg-gray-800 rounded-md p-1 opacity-90 cursor-move">
                <Move size={14} className="text-white" />
              </div>
              
              {/* Edit indicator */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex space-x-1 bg-gray-800 rounded-md p-1 opacity-90">
                <Type size={14} className="text-white" />
              </div>
            </>
          )}
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default TextBox;