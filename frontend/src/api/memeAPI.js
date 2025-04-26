import axios from 'axios';

const API_URL = 'http://localhost:5000/api/memes';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all memes
export const getMemes = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching memes:', error);
    throw error;
  }
};

// Get all templates
export const getTemplates = async () => {
  try {
    const response = await api.get('/templates');
    return response.data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

// Get random template
export const getRandomTemplate = async () => {
  try {
    const response = await api.get('/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random template:', error);
    throw error;
  }
};

// Search templates
export const searchTemplates = async (query) => {
  try {
    const response = await api.get(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching templates:', error);
    throw error;
  }
};

// Create new meme
export const createMeme = async (memeData) => {
  try {
    const response = await api.post('/', memeData);
    return response.data;
  } catch (error) {
    console.error('Error creating meme:', error);
    throw error;
  }
};

// Save generated meme
export const saveGeneratedMeme = async (memeData) => {
  try {
    const response = await api.post('/generated', memeData);
    return response.data;
  } catch (error) {
    console.error('Error saving generated meme:', error);
    throw error;
  }
};

// Delete meme
export const deleteMeme = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting meme:', error);
    throw error;
  }
};

// Upload new template
export const uploadTemplate = async (templateData) => {
  try {
    const response = await api.post('/templates', templateData);
    return response.data;
  } catch (error) {
    console.error('Error uploading template:', error);
    throw error;
  }
};