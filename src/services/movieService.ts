import { axiosInstance } from '../lib/axios';
import type { Movie, TMDBConfig } from '../types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

export const movieService = {
  getAPI: async (): Promise<TMDBConfig> => {
    const { data } = await axiosInstance.get('/configuration');
    return data as TMDBConfig;
  },
  getTrendingMovies: async (): Promise<Movie[]> => {
    const { data } = await axiosInstance.get('trending/movie/day');
    return data.results;
  },
  getMovieDetails: async (id: number): Promise<Movie> => {
    const { data } = await axiosInstance.get(`/movie/${id}`);
    return data as Movie;
  },
  getMovieVideos: async (id: number): Promise<string | null> => {
    const { data } = await axiosInstance.get(`/movie/${id}/videos`);
    const trailer = data.results?.find(
      (video: { type: string; site: string; key: string }) =>
        video.type === 'Trailer' && video.site === 'Youtube'
    );
    return trailer ? trailer.key : null;
  },
  searchMovie: async (query: string): Promise<Movie[]> => {
    const { data } = await axiosInstance.get(`/search/movie`, {
      params: { query },
    });
    return data.results;
  },
};

// TODO: Implement getPopularMovies function
// Endpoint: GET /movie/popular
// TODO: Implement getNowPlayingMovies function
// Endpoint: GET /movie/now_playing
// TODO: Implement getMovieDetails function
// Endpoint: GET /movie/{movie_id}
// TODO: Implement searchMovies function
// Endpoint: GET /search/movie
// TODO: Add more endpoints as needed
