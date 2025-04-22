import mongoose from 'mongoose';

const memeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image'],
    },
    topText: {
      type: String,
      trim: true,
      maxlength: [50, 'Top text cannot be more than 50 characters'],
    },
    bottomText: {
      type: String,
      trim: true,
      maxlength: [50, 'Bottom text cannot be more than 50 characters'],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Meme = mongoose.model('Meme', memeSchema);

export default Meme;