import express from 'express';
import {
  getMemes,
  getTemplates,
  getRandomTemplate,
  searchTemplates,
  createMeme,
  saveGeneratedMeme,
  deleteMeme,
  uploadTemplate,
} from '../controllers/memeController.js';

const router = express.Router();

// Get all memes
router.get('/', getMemes);

// Get all templates
router.get('/templates', getTemplates);

// Get random template
router.get('/random', getRandomTemplate);

// Search templates
router.get('/search', searchTemplates);

// Create new meme
router.post('/', createMeme);

// Save generated meme
router.post('/generated', saveGeneratedMeme);

// Delete meme
router.delete('/:id', deleteMeme);

// Upload new template
router.post('/templates', uploadTemplate);

export default router;