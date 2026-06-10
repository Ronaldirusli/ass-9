import { useQuery } from '@tanstack/react-query';
import { movieService } from '../services/movieService';

export const useAPIConfig = () => {
  return useQuery({
    queryKey: ['tmdb', 'config'],
    queryFn: movieService.getAPI,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movie', 'trending'],
    queryFn: movieService.getTrendingMovies,
    staleTime: 1000 * 60 * 5,
  });
};
export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: ['movies', 'videos', id],
    queryFn: () => movieService.getMovieVideos(id),
    enabled: !!id,
  });
};

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => movieService.searchMovie(query),
    enabled: query.length > 0,
  });
};
// TODO: Implement useQuery hook
// Hint: Use movieService.getPopularMovies as queryFn

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
