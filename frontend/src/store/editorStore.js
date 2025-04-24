import { create } from 'zustand';

const useEditorStore = create((set) => ({
  template: null,
  textBoxes: [],
  stickers: [],
  selectedElement: null,
  canvasSize: { width: 0, height: 0 },
  
  setTemplate: (template) => set({ template }),
  
  setCanvasSize: (size) => set({ canvasSize: size }),
  
  addTextBox: (textBox) => set((state) => ({
    textBoxes: [...state.textBoxes, {
      id: Date.now(),
      text: 'Add text here',
      x: state.canvasSize.width / 4,
      y: state.canvasSize.height / 4,
      fontSize: 24,
      color: '#FFFFFF',
      fontStyle: {
        bold: false,
        italic: false,
        underline: false
      },
      outline: true,
      width: state.canvasSize.width / 2,
      padding: 10,
      ...textBox
    }]
  })),
  
  updateTextBox: (id, updates) => set((state) => ({
    textBoxes: state.textBoxes.map((box) =>
      box.id === id ? { ...box, ...updates } : box
    )
  })),
  
  removeTextBox: (id) => set((state) => ({
    textBoxes: state.textBoxes.filter((box) => box.id !== id),
    selectedElement: state.selectedElement?.id === id ? null : state.selectedElement
  })),
  
  addSticker: (sticker) => set((state) => ({
    stickers: [...state.stickers, {
      id: Date.now(),
      x: state.canvasSize.width / 4,
      y: state.canvasSize.height / 4,
      width: state.canvasSize.width / 4,
      height: state.canvasSize.width / 4,
      ...sticker
    }]
  })),
  
  updateSticker: (id, updates) => set((state) => ({
    stickers: state.stickers.map((sticker) =>
      sticker.id === id ? { ...sticker, ...updates } : sticker
    )
  })),
  
  removeSticker: (id) => set((state) => ({
    stickers: state.stickers.filter((sticker) => sticker.id !== id),
    selectedElement: state.selectedElement?.id === id ? null : state.selectedElement
  })),
  
  setSelectedElement: (element) => set({ selectedElement: element }),
  
  clearEditor: () => set({
    template: null,
    textBoxes: [],
    stickers: [],
    selectedElement: null,
    canvasSize: { width: 0, height: 0 }
  })
}));

export default useEditorStore;