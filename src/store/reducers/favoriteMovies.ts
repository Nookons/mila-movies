import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../../type/Movie";
import { getFirestore, collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import {db} from "../../firebase";

// Тип для любимого фильма
type FavoriteMovie = {
    robot_id: string;
    title: string;
};

type ItemsState = {
    favorite_movie: IMovie[];
    loading: boolean;
    error: string | undefined;
    isLoaded: boolean;
};

const initialState: ItemsState = {
    favorite_movie: [],
    loading: false,
    error: undefined,
    isLoaded: false,
};

export const subscribeToFavoriteMovies = createAsyncThunk(
    'favoriteMovies/subscribeToFavoriteMovies',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const moviesCollection = collection(db, "favorites");

            onSnapshot(moviesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                const movies: IMovie[] = [];
                snapshot.forEach((doc) => {
                    movies.push(doc.data() as IMovie);
                });

                // Обновляем состояние через action
                dispatch(setFavoriteMovies(movies));
            });
        } catch (error) {
            return rejectWithValue("Не удалось получить любимые фильмы");
        }
    }
);

const favoriteMovieSlice = createSlice({
    name: 'favoriteMovies',
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<IMovie>) => {
            state.favorite_movie.push(action.payload);
        },
        removeFromFavorite: (state, action: PayloadAction<string>) => {
            state.favorite_movie = state.favorite_movie.filter(item => item.id.toString() !== action.payload);
        },
        setFavoriteMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.favorite_movie = action.payload;
            state.loading = false;
            state.isLoaded = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToFavoriteMovies.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(subscribeToFavoriteMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Экспортируем actions и thunk
export const { addToFavorite, removeFromFavorite, setFavoriteMovies } = favoriteMovieSlice.actions;
export default favoriteMovieSlice.reducer;
