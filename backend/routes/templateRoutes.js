import express from 'express';
import {
  getTemplates,
  getRandomTemplate,
  searchTemplates,
} from '../controllers/templateController.js'; // Adjust the path if needed

const router = express.Router();

// Get all templates
router.get('/', getTemplates);

// Get random template
router.get('/random', getRandomTemplate);

// Search templates
router.get('/search', searchTemplates);

export default router;
