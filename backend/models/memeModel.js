import mongoose from 'mongoose';

const textBoxSchema = mongoose.Schema({
  text: String,
  x: Number,
  y: Number,
  fontSize: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: '#FFFFFF'
  },
  fontStyle: {
    bold: { type: Boolean, default: false },
    italic: { type: Boolean, default: false },
    underline: { type: Boolean, default: false }
  },
  outline: {
    type: Boolean,
    default: true
  },
  width: Number,
  padding: {
    type: Number,
    default: 10
  }
});

const stickerSchema = mongoose.Schema({
  url: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number
});

const memeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image'],
    },
    textBoxes: [textBoxSchema],
    stickers: [stickerSchema],
    category: {
      type: String,
      enum: ['funny', 'sad', 'reaction', 'gaming', 'other'],
      default: 'other',
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    creator: {
      type: String,
      required: true,
      default: 'anonymous',
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
memeSchema.index({ title: 'text', tags: 'text' });

const Meme = mongoose.model('Meme', memeSchema);

export default Meme;