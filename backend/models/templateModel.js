// // models/memeModel.js
// import mongoose from 'mongoose';

// const memeSchema = new mongoose.Schema({
//   imageUrl: { type: String, required: true },
//   title: { type: String, required: true },
//   tags: { type: [String], default: [] },
//   usageCount: { type: Number, default: 0 },
// }, { timestamps: true });

// // Update the collection name to 'memes'
// const Meme = mongoose.model('Meme', memeSchema, 'memes');

// export default Meme;


import mongoose from 'mongoose';

// Define the schema for the memes collection
const memeSchema = new mongoose.Schema(
  {
    template_id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    template_url: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: 'memes', // Specify the collection name
  }
);

// Create the model and connect it to the 'memes' collection
const Meme = mongoose.model('Meme', memeSchema, 'memes');

export default Meme;
