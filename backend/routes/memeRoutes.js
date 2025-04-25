// routes/memeRoutes.js
import express from 'express';
import {
  getMemes,
  uploadMeme,
  deleteMeme,
  saveGeneratedMeme,
} from '../controllers/memeController.js';

const router = express.Router();

// Get all memes
router.get('/', getMemes);

// Upload new meme
router.post('/', uploadMeme);

// Delete meme
router.delete('/:id', deleteMeme);

// Save user-generated meme
router.post('/generated', saveGeneratedMeme);

export default router;
