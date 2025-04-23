import Template from '../models/templateModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get all templates with optional search, category filter, and pagination
// @route   GET /api/templates
// @access  Public
const getTemplates = asyncHandler(async (req, res) => {
  const { search = '', category = '', page = 1, limit = 12 } = req.query;

  const query = {};

  if (search.trim()) {
    query.$text = { $search: search.trim() };
  }

  if (category.trim()) {
    query.category = category.trim();
  }

  const total = await Template.countDocuments(query);

  const templates = await Template.find(query)
    .sort(search ? { score: { $meta: 'textScore' } } : { uses: -1, createdAt: -1 })
    .skip((parseInt(page) - 1) * parseInt(limit))
    .limit(parseInt(limit));

  res.json({
    templates,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    },
  });
});

// @desc    Get a random template
// @route   GET /api/templates/random
// @access  Public
const getRandomTemplate = asyncHandler(async (req, res) => {
  const count = await Template.countDocuments();

  if (count === 0) {
    res.status(404);
    throw new Error('No templates found');
  }

  const randomIndex = Math.floor(Math.random() * count);

  const template = await Template.findOne().skip(randomIndex).lean();

  if (!template) {
    res.status(404);
    throw new Error('Template not found');
  }

  res.status(200).json(template);
});


// @desc    Search templates by keyword
// @route   GET /api/templates/search
// @access  Public
const searchTemplates = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || !query.trim()) {
    res.status(400);
    throw new Error('Please provide a valid search query');
  }

  const templates = await Template.find(
    { $text: { $search: query.trim() } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(20);

  res.json(templates);
});

// @desc    Upload a new template
// @route   POST /api/templates
// @access  Public
const uploadTemplate = asyncHandler(async (req, res) => {
  const { name, category, tags = '' } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  if (!name?.trim() || !category?.trim()) {
    res.status(400);
    throw new Error('Please provide both name and category');
  }

  const newTemplate = await Template.create({
    template_id: Date.now().toString(),
    name: name.trim(),
    category: category.trim(),
    template_url: `/${req.file.path.replace(/\\/g, '/')}`,
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0),
  });

  res.status(201).json(newTemplate);
});

// @desc    Increment the 'uses' counter of a template
// @route   PUT /api/templates/:id/use
// @access  Public
const incrementTemplateUses = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    res.status(404);
    throw new Error('Template not found');
  }

  template.uses += 1;
  const updatedTemplate = await template.save();

  res.json(updatedTemplate);
});

export {
  getTemplates,
  getRandomTemplate,
  searchTemplates,
  uploadTemplate,
  incrementTemplateUses,
};
