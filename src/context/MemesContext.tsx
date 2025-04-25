import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMemes, Meme, uploadMeme, deleteMeme, saveGeneratedMeme } from '../api/memeAPI';

interface MemesContextType {
  memes: Meme[];
  loading: boolean;
  error: string | null;
  uploadNewMeme: (memeData: { imageUrl: string; title: string; tags: string[] }) => Promise<void>;
  removeMeme: (id: string) => Promise<void>;
  saveMeme: (imageUrl: string, title: string) => Promise<void>;
  refreshMemes: () => Promise<void>;
}

const MemesContext = createContext<MemesContextType>({
  memes: [],
  loading: false,
  error: null,
  uploadNewMeme: async () => {},
  removeMeme: async () => {},
  saveMeme: async () => {},
  refreshMemes: async () => {},
});

export const useMemesContext = () => useContext(MemesContext);

export const MemesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    refreshMemes();
  }, []);
  
  const refreshMemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMemes();
      setMemes(data);
    } catch (err) {
      setError('Failed to load memes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const uploadNewMeme = async (memeData: { imageUrl: string; title: string; tags: string[] }) => {
    try {
      setLoading(true);
      setError(null);
      await uploadMeme(memeData);
      await refreshMemes();
    } catch (err) {
      setError('Failed to upload meme');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const removeMeme = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteMeme(id);
      setMemes(memes.filter(meme => meme._id !== id));
    } catch (err) {
      setError('Failed to delete meme');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const saveMeme = async (imageUrl: string, title: string) => {
    try {
      setLoading(true);
      setError(null);
      await saveGeneratedMeme({ imageUrl, title, tags: [] });
      await refreshMemes();
    } catch (err) {
      setError('Failed to save meme');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MemesContext.Provider value={{ 
      memes, 
      loading, 
      error, 
      uploadNewMeme, 
      removeMeme, 
      saveMeme,
      refreshMemes,
    }}>
      {children}
    </MemesContext.Provider>
  );
};