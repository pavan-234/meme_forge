import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Template } from '../models/templateModel.js';

// Load environment variables
dotenv.config();

// Sample meme template dataset
const memeTemplates = [
  {
    imageUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    title: 'Drake Hotline Bling',
    tags: ['drake', 'hotline', 'bling', 'approval', 'rejection'],
  },
  {
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    title: 'Distracted Boyfriend',
    tags: ['distracted', 'boyfriend', 'jealousy', 'unfaithful'],
  },
  {
    imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
    title: 'Two Buttons',
    tags: ['buttons', 'choice', 'decision', 'red', 'sweating'],
  },
  {
    imageUrl: 'https://i.imgflip.com/9vct.jpg',
    title: 'Batman Slapping Robin',
    tags: ['batman', 'robin', 'slap', 'comic'],
  },
  {
    imageUrl: 'https://i.imgflip.com/4t0m5.jpg',
    title: 'Hide the Pain Harold',
    tags: ['hide', 'pain', 'harold', 'smile', 'old man'],
  },
  {
    imageUrl: 'https://i.imgflip.com/3oevdk.jpg',
    title: 'Woman Yelling at Cat',
    tags: ['woman', 'cat', 'yelling', 'dinner', 'confused'],
  },
  {
    imageUrl: 'https://i.imgflip.com/28j0te.jpg',
    title: 'Change My Mind',
    tags: ['change', 'mind', 'table', 'sign', 'debate'],
  },
  {
    imageUrl: 'https://i.imgflip.com/1bij.jpg',
    title: 'One Does Not Simply',
    tags: ['one', 'does', 'not', 'simply', 'boromir', 'lord of the rings'],
  },
  {
    imageUrl: 'https://i.imgflip.com/gtj5t.jpg',
    title: 'Oprah You Get A',
    tags: ['oprah', 'you', 'get', 'a', 'giveaway'],
  },
  {
    imageUrl: 'https://i.imgflip.com/2hgfw.jpg',
    title: 'Laughing Men in Suits',
    tags: ['laughing', 'men', 'suits', 'business', 'pointing'],
  },
  {
    imageUrl: 'https://i.imgflip.com/bh6xo.jpg',
    title: 'Y U No',
    tags: ['y u no', 'angry', 'rage comic'],
  },
  {
    imageUrl: 'https://i.imgflip.com/64sz4.jpg',
    title: 'Grandma Finds The Internet',
    tags: ['grandma', 'internet', 'surprised', 'old', 'computer'],
  },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');

    try {
      // Check if templates already exist
      const existingCount = await Template.countDocuments();
      if (existingCount > 0) {
        console.log(`Templates already exist (${existingCount}). Skipping upload.`);
        process.exit(0);
      }

      // Upload templates
      await Template.insertMany(memeTemplates);
      console.log(`${memeTemplates.length} meme templates uploaded successfully`);
      process.exit(0);
    } catch (error) {
      console.error('Error uploading templates:', error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });