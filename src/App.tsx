import './index.css';
import Navbar from './components/ui/Navbar';
import Homepage from './pages/Homepage';
import Favorites from './pages/Favorites';
import MovieDetail from './pages/MovieDetail';
import Footer from './components/ui/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  // TODO: Setup routing dengan React Router
  // TODO: Implement layout structure
  // TODO: Add navigation between pages

  return (
    <div className="min-h-screen bg-background text-white antialiased selection:bg-red-600 selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
