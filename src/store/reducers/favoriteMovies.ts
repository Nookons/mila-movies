import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {collection, onSnapshot, QuerySnapshot, DocumentData, query, where} from "firebase/firestore";
import { db } from "../../firebase";
import { IFavorite } from "../../type/Favorite";
import {IFirebaseUser} from "../../type/User";

type ItemsState = {
    favorite_movies: IFavorite | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    favorite_movies: null,
    loading: false,
    error: undefined,
};

export const subscribeToFavoriteMovies = createAsyncThunk(
    'favoriteMovies/subscribeToFavoriteMovies',
    async (user: IFirebaseUser, { dispatch, rejectWithValue }) => {
        if (!user || !user.uid) {
            return rejectWithValue("Пользователь не найден");
        }

        try {
            const moviesCollection = query(collection(db, "favorites"), where("user", "==", user.uid));

            onSnapshot(moviesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                snapshot.forEach((doc) => {
                    dispatch(setFavoriteMovies(doc.data() as IFavorite));
                });
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
        addToFavorite: (state, action: PayloadAction<number>) => {
            if (state.favorite_movies) {
                state.favorite_movies.list.push(action.payload); // Add the movie to the list
            }
        },
       removeFromFavorite: (state, action: PayloadAction<number>) => {
            if (state.favorite_movies) {
                state.favorite_movies.list = state.favorite_movies.list.filter(item => item !== action.payload);
            }
        },
        setFavoriteMovies: (state, action: PayloadAction<IFavorite>) => {
            state.favorite_movies = action.payload;
            state.loading = false;
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

// Exporting actions and reducer
export const { addToFavorite, removeFromFavorite, setFavoriteMovies } = favoriteMovieSlice.actions;
export default favoriteMovieSlice.reducer;
