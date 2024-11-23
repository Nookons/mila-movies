import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../../type/Movie";
import { getFirestore, collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import {db} from "../../firebase";

type ItemsState = {
    watched: IMovie[];
    loading: boolean;
    error: string | undefined;
    isLoaded: boolean;
};

const initialState: ItemsState = {
    watched: [],
    loading: false,
    error: undefined,
    isLoaded: false,
};

export const subscribeToWatched = createAsyncThunk(
    'favoriteMovies/subscribeToWatchedMovies',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const moviesCollection = collection(db, "watched");

            onSnapshot(moviesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                const movies: IMovie[] = [];
                snapshot.forEach((doc) => {
                    movies.push(doc.data() as IMovie);
                });

                dispatch(setWatched(movies));
            });
        } catch (error) {
            return rejectWithValue("Can't loading watched movies");
        }
    }
);

const watchedSlice = createSlice({
    name: 'watched',
    initialState,
    reducers: {
        addToWatched: (state, action: PayloadAction<IMovie>) => {
            state.watched.push(action.payload);
        },
        removeFromWatched: (state, action: PayloadAction<string>) => {
            state.watched = state.watched.filter(movie => movie.id.toString() !== action.payload);
        },
        setWatched: (state, action: PayloadAction<IMovie[]>) => {
            state.watched = action.payload;
            state.loading = false;
            state.isLoaded = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToWatched.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(subscribeToWatched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Экспортируем actions и thunk
export const { addToWatched, removeFromWatched, setWatched } = watchedSlice.actions;
export default watchedSlice.reducer;
