import React from 'react';
import type { Movie } from '../../types/movie';
import { getPosterURL } from '../../lib/axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = getPosterURL(movie.poster_path);
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="aspect-2/3 w-full overflow-hidden relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via black/20 to transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4" />
      </div>
      <div className="p-3 space-y-1 bg-gray-950">
        <h3 className="font-bold text-sm text-white truncate group-hover:text-red-500 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} className="fill-current" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
