import axios from 'axios';

const API_URL = '/api/memes';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all memes with search and filters
export const getAllMemes = async (params = {}) => {
  try {
    const { page, limit, category, search, sortBy } = params;
    const response = await api.get('/', { params: { page, limit, category, search, sortBy } });
    return response.data;
  } catch (error) {
    console.error('Error getting memes:', error);
    throw error;
  }
};

// Function to get a single meme by ID
export const getMemeById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting meme with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new meme
export const createMeme = async (memeData) => {
  try {
    const response = await axios.post(API_URL, memeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating meme:', error);
    throw error;
  }
};

// Function to like a meme
export const likeMeme = async (id) => {
  try {
    const response = await api.put(`/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error liking meme with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a meme
export const deleteMeme = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting meme with ID ${id}:`, error);
    throw error;
  }
};

// Function to get meme statistics
export const getMemeStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error getting meme statistics:', error);
    throw error;
  }
};