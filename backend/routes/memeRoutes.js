import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getMemes,
  getMemeById,
  createMeme,
  deleteMeme,
} from '../controllers/memeController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('uploads/'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File type checking
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Routes
router
  .route('/')
  .get(getMemes)
  .post(upload.single('image'), createMeme);

router
  .route('/:id')
  .get(getMemeById)
  .delete(deleteMeme);

export default router;
