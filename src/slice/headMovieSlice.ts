import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: null,
  loading: false,
  movieDetails: null,
  top10Movies: [],  
  genreMovies: [],
  genreFilmsCards: [],
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setTop10Movies: (state, action) => {
      state.top10Movies = action.payload;  // Устанавливаем топ-10 фильмов
    },
    setGenreMovies: (state, action) => {
      state.genreMovies = action.payload;
    },
    setGenreFilmsCards: (state, action) => {
      state.genreFilmsCards = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMovie, setLoading, setError, setMovieDetails, setTop10Movies, setGenreMovies, setGenreFilmsCards } = movieSlice.actions;

export default movieSlice.reducer;