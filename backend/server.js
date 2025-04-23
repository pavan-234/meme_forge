import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import memeRoutes from './routes/memeRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Get __dirname in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Logger for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/memes', memeRoutes);
app.use('/api/templates', templateRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// Error handler middleware
app.use(errorHandler);

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});