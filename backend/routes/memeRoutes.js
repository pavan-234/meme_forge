import express from 'express';
import {
  getMemes,
  uploadMeme,
  deleteMeme,
  getRandomTemplate,
  searchTemplates,
  saveGeneratedMeme,
  getTemplates,
} from '../controllers/memeController.js';

const router = express.Router();

// Get all memes
router.get('/', getMemes);

// Upload new meme
router.post('/', uploadMeme);

// Delete meme
router.delete('/:id', deleteMeme);

// Get random meme template
router.get('/random', getRandomTemplate);

// Search meme templates
router.get('/search', searchTemplates);

// Save user-generated meme
router.post('/generated', saveGeneratedMeme);

// Get all templates
router.get('/templates', getTemplates);

export default router;