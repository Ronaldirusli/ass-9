import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '../store/movieStore';
import MovieCard from '../components/ui/Moviecard';
import { useSearchMovies, useTrendingMovies } from '../hooks/useMovies';
import { Info, Play } from 'lucide-react';
import { getBackdropURL } from '../lib/axios';

const Homepage = () => {
  const navigate = useNavigate();
  const searchQuery = useMovieStore((state) => state.searchQuery);

  const {
    data: trendingMovies,
    isLoading: loadingTrending,
    isError: errorTrending,
  } = useTrendingMovies();
  const { data: searchedMovies, isLoading: loadingSearch } = useSearchMovies(searchQuery);

  const isSearching = searchQuery.trim().length > 0;
  const displayMovies = isSearching ? searchedMovies : trendingMovies;
  const isLoading = isSearching ? loadingSearch : loadingTrending;

  if (isLoading) {
    return (
      <div className="pt-32 text-center text-gray-400 font-medium min-h-screen bg-gray-950">
        Loading movies...
      </div>
    );
  }

  if (errorTrending) {
    return (
      <div className="pt-32 text-center text-red-500 font-medium min-h-screen bg-gray-950">
        Failed to fetch data from TMDB. Please check your API Token.
      </div>
    );
  }

  const heroMovie = displayMovies && displayMovies.length > 0 ? displayMovies[0] : null;
  return (
    <div className="pb-20 bg-gray-950 min-h-screen text-white">
      {heroMovie && !isSearching && (
        <section
          className="relative h-80vh md:h-85vh w-full bg-cover bg-center flex items-center px-6 md:px-16"
          style={{
            backgroundImage: heroMovie?.backdrop_path
              ? `url(${getBackdropURL(heroMovie.backdrop_path)})`
              : `none`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via transparent to-transparent" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
              {heroMovie.title}
            </h1>
            <p className="text-gray-300 text-xs md:text-sm line-clamp-3 leading-relaxed max-w-xl">
              {heroMovie.overview}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => navigate(`/movie/${heroMovie.id}`)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Trailer
              </button>
              <button
                onClick={() => navigate(`/movie/${heroMovie.id}`)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-5 py-2.5 rounded-full font-bold text-sm backdrop-blur-sm transition-all"
              >
                <Info className="w-4 h-4">See Detail</Info>
              </button>
            </div>
          </div>
        </section>
      )}
      <section className={`px-6 md:px-16 ${isSearching ? 'pt-28' : 'mt-10'}`}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-wide">
          {isSearching ? `Search Result for '${searchQuery}'` : 'Trending Now'}
        </h2>
        {displayMovies && displayMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
            {displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No movies found. Try another keyword.
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
