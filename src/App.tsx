import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateMeme from './pages/CreateMeme';
import { DarkModeProvider } from './context/DarkModeContext';
import { MemesProvider } from './context/MemesContext';

function App() {
  return (
    <DarkModeProvider>
      <MemesProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateMeme />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MemesProvider>
    </DarkModeProvider>
  );
}

export default App;