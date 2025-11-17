export interface Movie {
    id: number;
    title: string;
    plot: string;
    tmdbRating: number;
    releaseYear: number;
    genres: string[];
    runtime: number;
    trailerUrl: string;
    trailerYouTubeId: string;
    posterUrl: string;
    language?: string;
    budget?: number;
    revenue?: number;
    director?: string;
    production?: string;
    awardsSummary?: string;
  }
  
  export interface MovieState {
    movie: Movie | null;
    movieDetails: Movie | null;
    top10Movies: Movie[];
    genreMovies: Movie[];
    accountFavorites: Movie[];
    genreFilmsCards: Movie[];
    loading: boolean;
    error: string | null;
  }