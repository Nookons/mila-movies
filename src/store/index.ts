import { configureStore } from '@reduxjs/toolkit';
import favoriteMovieReducer from './reducers/favoriteMovies';
import watchLaterReducer from './reducers/watchLater';
import watchedReducer from './reducers/watched';

const store = configureStore({
    reducer: {
        favorite_movies: favoriteMovieReducer,
        watch_later: watchLaterReducer,
        watched: watchedReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;