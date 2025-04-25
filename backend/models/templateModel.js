import mongoose from 'mongoose';

const templateSchema = mongoose.Schema(
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
    usageCount: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      required: true,
      default: 500,
    },
    height: {
      type: Number,
      required: true,
      default: 500,
    },
    defaultTextPositions: [{
      text: String,
      x: Number,
      y: Number,
      fontSize: Number,
      color: String,
      outlineColor: String,
      outlineWidth: Number,
      fontFamily: String,
      bold: Boolean,
      italic: Boolean,
      width: Number,
      height: Number,
      rotation: Number,
    }],
    category: {
      type: String,
      enum: ['popular', 'new', 'classic', 'trending'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    collection : 'memes',
  }
);

// Index for search functionality
templateSchema.index({ title: 'text', tags: 'text', category: 1 });

const Template = mongoose.model('Template', templateSchema);

export default Template;