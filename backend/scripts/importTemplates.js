import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from '../models/templateModel.js';
import templates from '../data/templates.json' assert { type: 'json' };

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const importData = async () => {
  try {
    // Clear existing templates
    await Template.deleteMany();
    
    // Add tags array to each template based on category
    const templatesWithTags = templates.map(template => ({
      ...template,
      tags: [template.category, ...template.category.split(' ')],
    }));
    
    // Import templates
    await Template.insertMany(templatesWithTags);
    
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();