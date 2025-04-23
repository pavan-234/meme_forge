import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Meme from '../models/memeModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all memes with filtering and pagination
// @route   GET /api/memes
// @access  Public
const getMemes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const category = req.query.category;
  const search = req.query.search;
  const sortBy = req.query.sortBy || 'createdAt';
  
  const query = {};
  
  // Apply filters
  if (category && category !== 'all') {
    query.category = category;
  }
  
  if (search) {
    query.$text = { $search: search };
  }
  
  // Get total count for pagination
  const total = await Meme.countDocuments(query);
  
  // Get memes with pagination and sorting
  const memes = await Meme.find(query)
    .sort({ [sortBy]: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  
  res.json({
    memes,
    pagination: {
      page,
      pages: Math.ceil(total / limit),
      total,
    },
  });
});

// @desc    Get single meme by ID and increment views
// @route   GET /api/memes/:id
// @access  Public
const getMemeById = asyncHandler(async (req, res) => {
  const meme = await Meme.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  
  if (meme) {
    res.json(meme);
  } else {
    res.status(404);
    throw new Error('Meme not found');
  }
});

// @desc    Create a new meme
// @route   POST /api/memes
// @access  Public
const createMeme = asyncHandler(async (req, res) => {
  const { title, topText, bottomText, category, tags } = req.body;
  
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }
  
  if (!title) {
    res.status(400);
    throw new Error('Please add a title');
  }
  
  // Process tags
  const processedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];
  
  // Create meme
  const meme = await Meme.create({
    title,
    imageUrl: `/${req.file.path}`,
    topText: topText || '',
    bottomText: bottomText || '',
    category: category || 'other',
    tags: processedTags,
  });
  
  if (meme) {
    res.status(201).json(meme);
  } else {
    res.status(400);
    throw new Error('Invalid meme data');
  }
});

// @desc    Update meme likes
// @route   PUT /api/memes/:id/like
// @access  Public
const likeMeme = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  
  if (meme) {
    meme.likes += 1;
    const updatedMeme = await meme.save();
    res.json(updatedMeme);
  } else {
    res.status(404);
    throw new Error('Meme not found');
  }
});

// @desc    Delete a meme
// @route   DELETE /api/memes/:id
// @access  Public
const deleteMeme = asyncHandler(async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  
  if (meme) {
    // Delete image file
    const imagePath = path.join(__dirname, '..', meme.imageUrl);
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    
    await Meme.deleteOne({ _id: req.params.id });
    res.json({ message: 'Meme removed' });
  } else {
    res.status(404);
    throw new Error('Meme not found');
  }
});

// @desc    Get meme statistics
// @route   GET /api/memes/stats
// @access  Public
const getMemeStats = asyncHandler(async (req, res) => {
  const stats = await Meme.aggregate([
    {
      $group: {
        _id: null,
        totalMemes: { $sum: 1 },
        totalViews: { $sum: '$views' },
        totalLikes: { $sum: '$likes' },
        avgLikes: { $avg: '$likes' },
        categories: {
          $push: '$category'
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalMemes: 1,
        totalViews: 1,
        totalLikes: 1,
        avgLikes: { $round: ['$avgLikes', 2] },
        categoryDistribution: {
          $reduce: {
            input: '$categories',
            initialValue: {},
            in: {
              $mergeObjects: [
                '$$value',
                { $literal: { $concat: ['$$this'] }, $add: [{ $ifNull: [{ $getField: { field: { $concat: ['$$this'] }, input: '$$value' } }, 0] }, 1] }
              ]
            }
          }
        }
      }
    }
  ]);

  res.json(stats[0] || {
    totalMemes: 0,
    totalViews: 0,
    totalLikes: 0,
    avgLikes: 0,
    categoryDistribution: {}
  });
});

export { getMemes, getMemeById, createMeme, deleteMeme, likeMeme, getMemeStats };