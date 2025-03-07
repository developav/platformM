import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: null,
  loading: false,
  top10Movies: [],  
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMovie, setLoading, setError, setTop10Movies } = movieSlice.actions;

export default movieSlice.reducer;