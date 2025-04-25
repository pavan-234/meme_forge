// transformTemplates.js
import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('./rawTemplates.json', 'utf-8'));

const transformed = rawData.map(t => ({
  title: t.name,
  imageUrl: t.template_url,
  category: 'classic', // or choose based on logic
  tags: t.name.split(' '), // simple tag generation
  usageCount: 0,
  width: 500,
  height: 500,
  defaultTextPositions: [
    {
      text: "Top Text",
      x: 50,
      y: 50,
      fontSize: 24,
      color: "#ffffff",
      outlineColor: "#000000",
      outlineWidth: 2,
      fontFamily: "Impact",
      bold: true,
      italic: false,
      width: 200,
      height: 50,
      rotation: 0,
    },
    {
      text: "Bottom Text",
      x: 50,
      y: 400,
      fontSize: 24,
      color: "#ffffff",
      outlineColor: "#000000",
      outlineWidth: 2,
      fontFamily: "Impact",
      bold: true,
      italic: false,
      width: 200,
      height: 50,
      rotation: 0,
    }
  ]
}));

fs.writeFileSync('./transformedTemplates.json', JSON.stringify(transformed, null, 2));
