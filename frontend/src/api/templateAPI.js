import axios from 'axios';

const API_URL = '/api/templates';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all templates with search and filters
export const getAllTemplates = async (params = {}) => {
  try {
    const { page, limit, category, search } = params;
    const response = await api.get('/', { params: { page, limit, category, search } });
    return response.data;
  } catch (error) {
    console.error('Error getting templates:', error);
    throw error;
  }
};

// Function to get a random template
export const getRandomTemplate = async () => {
  try {
    const response = await api.get('/random');
    return response.data;
  } catch (error) {
    console.error('Error getting random template:', error);
    throw error;
  }
};

// Function to search templates
export const searchTemplates = async (query) => {
  try {
    const response = await api.get('/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching templates:', error);
    throw error;
  }
};

// Function to upload a new template
export const uploadTemplate = async (templateData) => {
  try {
    const response = await axios.post(API_URL, templateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading template:', error);
    throw error;
  }
};

// Function to increment template uses
export const incrementTemplateUses = async (id) => {
  try {
    const response = await api.put(`/${id}/use`);
    return response.data;
  } catch (error) {
    console.error(`Error incrementing template uses for ID ${id}:`, error);
    throw error;
  }
};