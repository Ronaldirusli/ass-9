import React from 'react';
import type { Movie } from '../../types/movie';
import { getPosterURL } from '@/lib/axios';

interface FavoritecardProps {
  movie: Movie;
  onRemove: (id: number) => void;
}

const Favoritecard: React.FC<FavoritecardProps> = ({ movie, onRemove }) => {
  const posterUrl = getPosterURL(movie.poster_path);

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl bg-gray-950/40 border border-gray-800 relative group transition-all duration-300 hover:border-gray-700">
      <div className="w-full sm:w-140px md:w-160px shrink-0 aspect-2/3 rounded-lg overflow-hidden bg-gray-800">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-bold text-white line-clamp-1">{movie.title}</h3>
            <button
              onClick={() => onRemove(movie.id)}
              className="text-red-550 hover:scale-110 transition-transform p-1"
              aria-label="Remove from favourites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path d="M11.645 20.91l-.007-.003-.003-.002-2.334-1.333C4.38 16.353 2 13.504 2 10.4 2 6.544 5.143 3.5 9 3.5c2.078 0 3.96 1.01 5.122 2.622C15.286 4.51 17.168 3.5 19.25 3.5c3.857 0 7 3.544 7 7.4 0 3.104-2.38 5.953-7.3 0.174l-2.334 1.333-.003.002-.007.003a2.33 2.33 0 01-2.33 0z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-amber-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-semibold text-amber-400">
              {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}/10
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-3 line-clamp-3 md:line-clamp-4 max-w-2xl leading-relaxed">
            {movie.overview ?? 'No description available for this movie.'}
          </p>
          <div className="mt-5 sm:mt-0">
            <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-all py-2.5 px-4 w-full sm:w-140px md:w-160px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Favoritecard;
