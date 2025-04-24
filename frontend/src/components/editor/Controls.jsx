import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ResizableBox } from 'react-resizable';
import { CSS } from '@dnd-kit/utilities';
import { Move, X, GripHorizontal } from 'lucide-react';
import useEditorStore from '../../store/editorStore';

const Sticker = ({ id, url, x, y, width, height }) => {
  const [isResizing, setIsResizing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `sticker-${id}`,
    data: { type: 'sticker', id }
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: x,
    top: y,
    cursor: isResizing ? 'se-resize' : 'move',
    touchAction: 'none'
  };
  
  const removeSticker = useEditorStore((state) => state.removeSticker);
  const updateSticker = useEditorStore((state) => state.updateSticker);
  const setSelectedElement = useEditorStore((state) => state.setSelectedElement);
  
  const handleClick = () => {
    setSelectedElement({ type: 'sticker', id });
  };

  const handleResize = (e, { size }) => {
    updateSticker(id, { 
      width: size.width,
      height: size.height
    });
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
        className="absolute -top-8 left-0 hidden items-center space-x-2 rounded-md bg-white/90 p-1 shadow-lg group-hover:flex dark:bg-gray-800/90"
      >
        <Move size={16} className="text-gray-600 dark:text-gray-400" />
        <button
          onClick={() => removeSticker(id)}
          className="text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
        >
          <X size={16} />
        </button>
      </div>
      
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[50, 50]}
        maxConstraints={[400, 400]}
        onResize={handleResize}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        handle={
          <div className="absolute bottom-0 right-0 cursor-se-resize">
            <GripHorizontal size={16} className="text-gray-600 dark:text-gray-400" />
          </div>
        }
      >
        <img
          src={url}
          alt="Sticker"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </ResizableBox>
    </div>
  );
};

export default Sticker;