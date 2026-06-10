import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '../types/movie';

// TODO: Define your store state interface
interface MovieState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // TODO: Add state properties
  // Examples: favorites, watchlist, selectedMovie, etc.

  // TODO: Add action methods
  // Examples: addToFavorites, removeFromFavorites, etc.
}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      favorites: [],
      addFavorite: (movie) =>
        set((state) => {
          if (state.favorites.some((m) => m.id === movie.id)) {
            return {};
          }

          return { favorites: [...state.favorites, movie] };
        }),

      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
      toggleFavorite: (movie) => {
        const isFav = get().isFavorite(movie.id);
        if (isFav) {
          get().removeFavorite(movie.id);
        } else {
          get().addFavorite(movie);
        }
      },
      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'movie-explorer-store',
      partialize: (state) => ({ favourites: state.favorites }),
    }
  )
  // TODO: Initialize state and implement actions
);
