import { configureStore } from '@reduxjs/toolkit';
import favoriteMovieReducer from './reducers/favoriteMovies';
import watchLaterReducer from './reducers/watchLater';
import watchedReducer from './reducers/watched';
import languageSlice from './reducers/Language';
import userSlice from './reducers/User';

const store = configureStore({
    reducer: {
        favorite_movies: favoriteMovieReducer,
        watch_later: watchLaterReducer,
        watched: watchedReducer,
        language: languageSlice,
        user: userSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;