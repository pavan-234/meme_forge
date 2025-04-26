import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import CreateMeme from './pages/CreateMeme.jsx';
import NotFound from './pages/NotFound.jsx';
import { useTheme } from './context/ThemeContext.jsx';

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateMeme />} />
          <Route path="/create/:templateId" element={<CreateMeme />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;