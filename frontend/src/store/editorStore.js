import { create } from 'zustand';

const useEditorStore = create((set) => ({
  template: null,
  textBoxes: [],
  stickers: [],
  selectedElement: null,
  
  setTemplate: (template) => set({ template }),
  
  addTextBox: (textBox) => set((state) => ({
    textBoxes: [...state.textBoxes, {
      id: Date.now(),
      text: 'Add text here',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#FFFFFF',
      fontStyle: {
        bold: false,
        italic: false,
        underline: false
      },
      outline: true,
      width: 200,
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
      x: 50,
      y: 50,
      width: 100,
      height: 100,
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
    selectedElement: null
  })
}));

export default useEditorStore;