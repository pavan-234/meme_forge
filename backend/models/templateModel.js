// import mongoose from 'mongoose';

// const templateSchema = mongoose.Schema(
//   {
//     template_id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     template_url: {
//       type: String,
//       required: true,
//     },
//     tags: [{
//       type: String,
//       trim: true,
//     }],
//     uses: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Add text indexes for search functionality
// templateSchema.index({ name: 'text', category: 'text', tags: 'text' });

// const Template = mongoose.model('Template', templateSchema);

// export default Template;

import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    template_id: { type: String, required: true },  // 🛠 Added this to match your dataset
    name: { type: String, required: true },
    category: { type: String, required: true },
    template_url: { type: String, required: true },
    // uses: { type: Number, default: 0 },
    // tags: [{ type: String }],
  },
  {
    timestamps: true,
    collection: 'memes', // 👈 connect to your 'memes' collection
  }
);

// Export the model
const Template = mongoose.model('Template', templateSchema);
export default Template;
