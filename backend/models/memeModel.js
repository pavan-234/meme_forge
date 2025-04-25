import mongoose from 'mongoose';

const memeSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: String,
      default: 'anonymous',
    },
  },
  {
    timestamps: true,
  }
);

const Meme = mongoose.model('Meme', memeSchema);

export default Meme;