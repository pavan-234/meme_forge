import axios from 'axios';

const API_URL = '/api/memes';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all memes
export const getAllMemes = async () => {
  try {
    const response = await api.get('/');
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
    // For FormData, we need different headers
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