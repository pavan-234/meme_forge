import { asyncHandler } from '../middleware/errorMiddleware.js';
import Meme from '../models/memeModel.js';
import Template from '../models/templateModel.js';

// @desc    Get all memes
// @route   GET /api/memes
// @access  Public
const getMemes = asyncHandler(async (req, res) => {
  const memes = await Meme.find({}).sort({ createdAt: -1 });
  res.json(memes);
});

// @desc    Upload new meme
// @route   POST /api/memes
// @access  Public
const uploadMeme = asyncHandler(async (req, res) => {
  const { imageUrl, title, tags } = req.body;

  if (!imageUrl || !title) {
    res.status(400);
    throw new Error('Please provide an image URL and title');
  }

  const meme = await Meme.create({
    imageUrl,
    title,
    tags: tags || [],
  });

  res.status(201).json(meme);
});

// @desc    Delete meme
// @route   DELETE /api/memes/:id
// @access  Public
const deleteMeme = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) {
    res.status(404);
    throw new Error('Meme not found');
  }

  await meme.deleteOne();
  res.json({ message: 'Meme removed' });
});

// @desc    Get random meme template
// @route   GET /api/memes/random
// @access  Public
const getRandomTemplate = asyncHandler(async (req, res) => {
  const count = await Template.countDocuments();
  
  if (count === 0) {
    res.status(404);
    throw new Error('No templates found');
  }
  
  const random = Math.floor(Math.random() * count);
  const template = await Template.findOne().skip(random);
  
  // Increment usage count
  template.usageCount += 1;
  await template.save();
  
  res.json(template);
});

// @desc    Search meme templates
// @route   GET /api/memes/search
// @access  Public
const searchTemplates = asyncHandler(async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    res.status(400);
    throw new Error('Please provide a search query');
  }
  
  // Search by text index or tag matching
  const templates = await Template.find({
    $or: [
      { $text: { $search: query } },
      { tags: { $in: [query] } },
      { title: { $regex: query, $options: 'i' } },
    ],
  }).limit(20);
  
  res.json(templates);
});

// @desc    Save user-generated meme
// @route   POST /api/memes/generated
// @access  Public
const saveGeneratedMeme = asyncHandler(async (req, res) => {
  const { imageUrl, title, tags } = req.body;

  if (!imageUrl || !title) {
    res.status(400);
    throw new Error('Please provide an image URL and title');
  }

  const meme = await Meme.create({
    imageUrl,
    title,
    tags: tags || [],
  });

  res.status(201).json(meme);
});

// @desc    Get all templates
// @route   GET /api/memes/templates
// @access  Public
const getTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({}).sort({ usageCount: -1 });
  res.json(templates);
});

export {
  getMemes,
  uploadMeme,
  deleteMeme,
  getRandomTemplate,
  searchTemplates,
  saveGeneratedMeme,
  getTemplates,
};