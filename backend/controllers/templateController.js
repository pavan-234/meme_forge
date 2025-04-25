import { asyncHandler } from '../middleware/errorMiddleware.js';
import Template from '../models/templateModel.js';

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
const getTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({}).sort({ usageCount: -1 });
  res.json(templates);
});

// @desc    Get random meme template
// @route   GET /api/templates/random
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
// @route   GET /api/templates/search
// @access  Public
const searchTemplates = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Please provide a search query');
  }

  const templates = await Template.find({
    $or: [
      { $text: { $search: query } },
      { tags: { $in: [query] } },
      { title: { $regex: query, $options: 'i' } },
    ],
  }).limit(20);

  res.json(templates);
});

export {
  getTemplates,
  getRandomTemplate,
  searchTemplates,
};
