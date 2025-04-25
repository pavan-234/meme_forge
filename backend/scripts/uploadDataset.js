// backend/uploadDataset.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from '../models/templateModel.js';

dotenv.config();

const sampleTemplateData = [
  {
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    title: 'Drake Hotline Bling',
    tags: ['funny', 'music', 'popular'],
    width: 500,
    height: 500,
    category: 'popular',
    defaultTextPositions: [
      {
        text: "Something you don't like",
        x: 350,
        y: 100,
        fontSize: 24,
        color: '#FFFFFF',
        outlineColor: '#000000',
        outlineWidth: 2,
        fontFamily: 'Impact',
        bold: false,
        italic: false,
        width: 200,
        height: 60,
        rotation: 0,
      },
      {
        text: 'Something you like',
        x: 350,
        y: 300,
        fontSize: 24,
        color: '#FFFFFF',
        outlineColor: '#000000',
        outlineWidth: 2,
        fontFamily: 'Impact',
        bold: false,
        italic: false,
        width: 200,
        height: 60,
        rotation: 0,
      },
    ],
  },
  {
    imageUrl: 'https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg',
    title: 'Distracted Boyfriend',
    tags: ['funny', 'relationships', 'popular'],
    width: 600,
    height: 400,
    category: 'popular',
    defaultTextPositions: [
      {
        text: 'New thing',
        x: 350,
        y: 100,
        fontSize: 24,
        color: '#FFFFFF',
        outlineColor: '#000000',
        outlineWidth: 2,
        fontFamily: 'Impact',
        bold: false,
        italic: false,
        width: 150,
        height: 50,
        rotation: 0,
      },
      {
        text: 'You',
        x: 200,
        y: 250,
        fontSize: 24,
        color: '#FFFFFF',
        outlineColor: '#000000',
        outlineWidth: 2,
        fontFamily: 'Impact',
        bold: false,
        italic: false,
        width: 100,
        height: 50,
        rotation: 0,
      },
      {
        text: 'Current responsibilities',
        x: 500,
        y: 200,
        fontSize: 24,
        color: '#FFFFFF',
        outlineColor: '#000000',
        outlineWidth: 2,
        fontFamily: 'Impact',
        bold: false,
        italic: false,
        width: 200,
        height: 50,
        rotation: 0,
      },
    ],
  },
  // Add more templates if needed...
];

const uploadTemplates = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/memeforge');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    await Template.deleteMany();
    console.log('🗑️  Existing templates deleted');

    const inserted = await Template.insertMany(sampleTemplateData);
    console.log(`✅ ${inserted.length} template(s) inserted`);

    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit();
  } catch (error) {
    console.error(`❌ Upload failed: ${error.message}`);
    process.exit(1);
  }
};

uploadTemplates();
