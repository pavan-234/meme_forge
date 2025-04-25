import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

import memeRoutes from './routes/memeRoutes.js';
import templateRoutes from './routes/templateRoutes.js'; // ✅ new

import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/memes', memeRoutes);
app.use('/api/templates', templateRoutes); // ✅ new

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MemeForge API is running...' });
});

// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
