import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getTemplates,
  getRandomTemplate,
  searchTemplates,
  uploadTemplate,
  incrementTemplateUses,
} from '../controllers/templateController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `template-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB max
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Routes
router.route('/').get(getTemplates).post(upload.single('image'), uploadTemplate);
router.get('/random', getRandomTemplate);
router.get('/search', searchTemplates);
router.put('/:id/use', incrementTemplateUses);

export default router;