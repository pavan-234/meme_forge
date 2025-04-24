import React, { useRef, useEffect } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import TextBox from './TextBox';
import Sticker from './Sticker';
import Controls from './Controls';
import useEditorStore from '../../store/editorStore';

const Canvas = () => {
  const canvasRef = useRef(null);
  const { template, textBoxes, stickers, setCanvasSize } = useEditorStore();
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);
  
  useEffect(() => {
    if (canvasRef.current && template) {
      const img = new Image();
      img.src = template.template_url;
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        const width = canvasRef.current.offsetWidth;
        const height = width * aspectRatio;
        setCanvasSize({ width, height });
      };
    }
  }, [template]);
  
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const [type, id] = active.id.split('-');
    
    if (type === 'text') {
      const textBox = textBoxes.find((box) => box.id === parseInt(id));
      if (textBox) {
        useEditorStore.getState().updateTextBox(parseInt(id), {
          x: textBox.x + delta.x,
          y: textBox.y + delta.y,
        });
      }
    } else if (type === 'sticker') {
      const sticker = stickers.find((s) => s.id === parseInt(id));
      if (sticker) {
        useEditorStore.getState().updateSticker(parseInt(id), {
          x: sticker.x + delta.x,
          y: sticker.y + delta.y,
        });
      }
    }
  };
  
  if (!template) return null;
  
  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <div 
        ref={canvasRef}
        id="meme-canvas"
        className="relative mx-auto overflow-hidden rounded-lg bg-white shadow-lg"
        style={{ width: '100%', maxWidth: '600px' }}
      >
        <img
          src={template.template_url}
          alt={template.name}
          className="h-full w-full object-contain"
          draggable={false}
        />
        
        {textBoxes.map((textBox) => (
          <TextBox key={textBox.id} {...textBox} />
        ))}
        
        {stickers.map((sticker) => (
          <Sticker key={sticker.id} {...sticker} />
        ))}
        
        <Controls />
      </div>
    </DndContext>
  );
};

export default Canvas;