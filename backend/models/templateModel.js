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
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Template = mongoose.model('Template', templateSchema);