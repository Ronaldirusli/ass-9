// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface TMDBConfig {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    poster_sizes: string[];
  };
}

// TODO: Add movie properties based on TMDB API respons
// TODO: Add more types as needed (Genre, Video, etc.)
