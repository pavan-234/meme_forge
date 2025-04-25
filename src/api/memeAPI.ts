import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/memes';

export interface MemeTemplate {
  _id: string;
  imageUrl: string;
  title: string;
  tags: string[];
  usageCount: number;
  createdAt: string;
}

export interface Meme {
  _id: string;
  imageUrl: string;
  title: string;
  tags: string[];
  createdAt: string;
}

// Get all memes
export const getMemes = async (): Promise<Meme[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get all templates
export const getTemplates = async (): Promise<MemeTemplate[]> => {
  const response = await axios.get(`${API_URL}/templates`);
  return response.data;
};

// Upload new meme
export const uploadMeme = async (memeData: {
  imageUrl: string;
  title: string;
  tags: string[];
}): Promise<Meme> => {
  const response = await axios.post(API_URL, memeData);
  return response.data;
};

// Delete meme
export const deleteMeme = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get random meme template
export const getRandomTemplate = async (): Promise<MemeTemplate> => {
  const response = await axios.get(`${API_URL}/random`);
  return response.data;
};

// Search meme templates
export const searchTemplates = async (query: string): Promise<MemeTemplate[]> => {
  const response = await axios.get(`${API_URL}/search?query=${query}`);
  return response.data;
};

// Save user-generated meme
export const saveGeneratedMeme = async (memeData: {
  imageUrl: string;
  title: string;
  tags: string[];
}): Promise<Meme> => {
  const response = await axios.post(`${API_URL}/generated`, memeData);
  return response.data;
};