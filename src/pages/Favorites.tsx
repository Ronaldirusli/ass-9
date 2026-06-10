import React from 'react';
import FavoriteCard from '@/components/ui/Favoritecard';
import { useMovieStore } from '../store/movieStore';

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useMovieStore();
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">Favorites</h1>
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-800 rounded-2xl bg-gray-950/20">
            <p className="text-gray-500 text-lg">You haven't added any favorite movie yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {favorites.map((movie) => (
              <FavoriteCard key={movie.id} movie={movie} onRemove={removeFavorite} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Favorites;
