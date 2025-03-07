import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slice/headMovieSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
