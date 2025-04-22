import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Meme from '../models/memeModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all memes
// @route   GET /api/memes
// @access  Public
const getMemes = asyncHandler(async (req, res) => {
  const memes = await Meme.find({}).sort({ createdAt: -1 });
  res.json(memes);
});

// @desc    Get single meme by ID
// @route   GET /api/memes/:id
// @access  Public
const getMemeById = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) {
    res.status(404).json({ message: 'Meme not found' });
    return;
  }

  res.json(meme);
});

// @desc    Create a new meme
// @route   POST /api/memes
// @access  Public
const createMeme = asyncHandler(async (req, res) => {
  const { title, topText, bottomText } = req.body;

  if (!req.file) {
    res.status(400).json({ message: 'Please upload an image' });
    return;
  }

  if (!title) {
    res.status(400).json({ message: 'Please add a title' });
    return;
  }

  const meme = await Meme.create({
    title,
    imageUrl: `/uploads/${req.file.filename}`, // Corrected image URL
    topText: topText || '',
    bottomText: bottomText || '',
  });

  res.status(201).json(meme);
});

// @desc    Delete a meme
// @route   DELETE /api/memes/:id
// @access  Public
const deleteMeme = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) {
    res.status(404).json({ message: 'Meme not found' });
    return;
  }

  const imagePath = path.join(__dirname, '..', meme.imageUrl);

  try {
    await fs.unlink(imagePath); // Async unlink
  } catch (error) {
    console.error('Error deleting image file:', error.message);
  }

  await Meme.deleteOne({ _id: meme._id });

  res.json({ message: 'Meme removed' });
});

export { getMemes, getMemeById, createMeme, deleteMeme };
