import { asyncHandler } from '../middleware/errorMiddleware.js';
import { Meme } from '../models/memeModel.js';
import { Template } from '../models/templateModel.js';

// Get all memes
export const getMemes = asyncHandler(async (req, res) => {
  const memes = await Meme.find({}).sort('-createdAt');
  res.json(memes);
});

// Get all templates
export const getTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({}).sort('-popularity');
  res.json(templates);
});

// Get random template
export const getRandomTemplate = asyncHandler(async (req, res) => {
  const count = await Template.countDocuments();
  const random = Math.floor(Math.random() * count);
  const template = await Template.findOne().skip(random);
  
  if (!template) {
    res.status(404);
    throw new Error('No templates found');
  }
  
  res.json(template);
});

// Search templates
export const searchTemplates = asyncHandler(async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  const templates = await Template.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { tags: { $regex: query, $options: 'i' } },
    ],
  });
  
  res.json(templates);
});

// Create new meme
export const createMeme = asyncHandler(async (req, res) => {
  const { imageUrl, title, tags } = req.body;
  
  if (!imageUrl || !title) {
    res.status(400);
    throw new Error('Please include imageUrl and title');
  }
  
  const meme = await Meme.create({
    imageUrl,
    title,
    tags: tags || [],
  });
  
  res.status(201).json(meme);
});

// Save generated meme
export const saveGeneratedMeme = asyncHandler(async (req, res) => {
  const { imageUrl, title, tags } = req.body;
  
  if (!imageUrl || !title) {
    res.status(400);
    throw new Error('Please include imageUrl and title');
  }
  
  const meme = await Meme.create({
    imageUrl,
    title,
    tags: tags || [],
  });
  
  res.status(201).json(meme);
});

// Delete meme
export const deleteMeme = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  
  if (!meme) {
    res.status(404);
    throw new Error('Meme not found');
  }
  
  await meme.deleteOne();
  res.json({ message: 'Meme removed' });
});

// Upload new template
export const uploadTemplate = asyncHandler(async (req, res) => {
  const { imageUrl, title, tags } = req.body;
  
  if (!imageUrl || !title) {
    res.status(400);
    throw new Error('Please include imageUrl and title');
  }
  
  const template = await Template.create({
    imageUrl,
    title,
    tags: tags || [],
  });
  
  res.status(201).json(template);
});