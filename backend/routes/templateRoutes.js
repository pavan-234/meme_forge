// routes/templateRoutes.js
import express from 'express';
import {
  getTemplates,
  getRandomTemplate,
  searchTemplates,
} from '../controllers/templateController.js';

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all meme templates
router.get('/', getTemplates);

// @route   GET /api/templates/search?query=xyz
// @desc    Search meme templates
router.get('/search', searchTemplates);

// @route   GET /api/templates/random
// @desc    Get a random meme template
router.get('/random', getRandomTemplate);

export default router;
