import { configureStore } from '@reduxjs/toolkit';
import favoriteMovieReducer from './reducers/favoriteMovies';

const store = configureStore({
    reducer: {
        favorite_movies: favoriteMovieReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;