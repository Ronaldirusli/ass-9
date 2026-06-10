import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { getPosterURL, getBackdropURL } from '../lib/axios';

interface MovieDetailData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
  };
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${id}`, {
          params: { append_to_response: 'credits' },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-400 font-medium min-h-screen bg-gray-950">
        Loading movie details...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="pt-32 text-center text-red-500 font-medium min-h-screen bg-gray-950">
        Movie not found.
        <button
          onClick={() => navigate('/')}
          className="block mx-auto mt-4 text-sm text-white bg-red-600 px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const mainCast = movie.credits?.cast.slice(0, 5) || [];

  return (
    <div className="w-full bg-gray-950 min-h-screen pb-12">
      <div
        className="relative h-55vh md:h-65vh w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${getBackdropURL(movie.backdrop_path)})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-gray-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-16 pb-6 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            {movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mt-2 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3v18.75h18V7.5H3v15.25zm2.25-10.5h13.5"
              />
            </svg>
            <span>
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Unknown'}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-8 grid grid-col-1 md:grid-cols-[260px_1fr] gap-8 items-start">
        <div className="w-full max-w-260px rounded-xl overflow-hidden shadow-2xl border border-gray-950/80 bg-gray-900 self-center md:self-auto mx-auto md:mx-0">
          <img
            src={getPosterURL(movie.poster_path)}
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="bg-gray-950/60 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center min-w-90px">
              <span className="text-10px uppercase font-bold text-gray-500 tracking-wider">
                Rating
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.6 3.102-1.196 4.622c-.21.81.674 1.455 1.374.97L10 15.683l4.194 2.328c.7.485 1.584-.16 1.373-.97l-1.195-4.623 3.6-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}/10</span>
              </div>
            </div>
            <div className="bg-gray-950/60 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center min-w-120px">
              <span className="text-10px uppercase font-bold text-gray-500 tracking-wider">
                Genre
              </span>
              <span className="text-white text-xs font-semibold mt-0.5">
                {movie.genres.length > 0 ? movie.genres[0].name : 'N/A'}
              </span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-white mb-2">Overview</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">
            {movie.overview || 'No overview available for this movie.'}
          </p>

          <h2 className="text-lg font-bold text-white mt-8 mb-4">Cast & Crew</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {mainCast.map((actor) => (
              <div
                key={actor.id}
                className="flex items-center gap-3 bg-gray-950/30 border border-gray-800/40 p-2 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-950 flex-shrink-0">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : 'https://via.placeholder.com/185x185?text=No+Image'
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{actor.name}</p>
                  <p className="text-10px text-gray-500 truncate mt-0.5">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
