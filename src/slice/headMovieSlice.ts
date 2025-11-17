import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Movie, MovieState } from '../types/movie';

const initialState:MovieState = {
  movie: null,
  loading: false,
  movieDetails: null,
  top10Movies: [],  
  genreMovies: [],
  accountFavorites: [],
  genreFilmsCards: [],
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie(state, action: PayloadAction<Movie>) {
      state.movie = action.payload;
    },
    setMovieDetails(state, action: PayloadAction<Movie>) {
      state.movieDetails = action.payload;
    },
    setTop10Movies(state, action: PayloadAction<Movie[]>) {
      state.top10Movies = action.payload;
    },
    setGenreMovies(state, action: PayloadAction<Movie[]>) {
      state.genreMovies = action.payload;
    },
    setGenreFilmsCards(state, action: PayloadAction<Movie[]>) {
      state.genreFilmsCards = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setAccountFavorites(state, action: PayloadAction<Movie[]>) {
      state.accountFavorites = action.payload;
    },
  },
});


export const { setMovie, setLoading, setError, setMovieDetails, setTop10Movies, setGenreMovies, setGenreFilmsCards, setAccountFavorites } = movieSlice.actions;

export default movieSlice.reducer;