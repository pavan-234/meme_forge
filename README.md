# MemeForge - Meme Generator App

MemeForge is a full-stack meme generator application built with React, Node.js, Express, and MongoDB.

## Features

- Create custom memes with top and bottom text
- Browse a gallery of created memes
- Download and share memes
- Dark mode support
- Responsive design that works on all devices

## Tech Stack

### Frontend
- React
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Axios (API calls)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Multer (file uploads)

## Project Structure

```
MemeForge/
├── frontend/            # React frontend application
│   ├── public/          # Static assets
│   ├── src/             # Source files
│   │   ├── assets/      # Images, fonts, etc.
│   │   ├── api/         # API service layer
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
├── backend/             # Node.js backend application
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   └── server.js        # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm run install:all
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory based on the example
   - Set your MongoDB connection string

4. Start the development servers:

```bash
npm run dev
```

This will start both the frontend and backend servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Production Build

To create a production build:

```bash
npm run build
```

## License

MIT"# meme_forge" 
