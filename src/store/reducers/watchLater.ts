import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../../type/Movie";
import { getFirestore, collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import {db} from "../../firebase";

type ItemsState = {
    watch_later: IMovie[];
    loading: boolean;
    error: string | undefined;
    isLoaded: boolean;
};

const initialState: ItemsState = {
    watch_later: [],
    loading: false,
    error: undefined,
    isLoaded: false,
};

export const subscribeToWatchLater = createAsyncThunk(
    'favoriteMovies/subscribeToWatchLaterMovies',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const moviesCollection = collection(db, "watch_later");

            onSnapshot(moviesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                const movies: IMovie[] = [];
                snapshot.forEach((doc) => {
                    movies.push(doc.data() as IMovie);
                });

                dispatch(setWatchLaterMovies(movies));
            });
        } catch (error) {
            return rejectWithValue("Не удалось получить любимые фильмы");
        }
    }
);

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        addToWatch_later: (state, action: PayloadAction<IMovie>) => {
            state.watch_later.push(action.payload);
        },
        removeFromWatch_later: (state, action: PayloadAction<string>) => {
            state.watch_later = state.watch_later.filter(movie => movie.id.toString() !== action.payload);
        },
        setWatchLaterMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.watch_later = action.payload;
            state.loading = false;
            state.isLoaded = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeToWatchLater.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(subscribeToWatchLater.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Экспортируем actions и thunk
export const { addToWatch_later, removeFromWatch_later, setWatchLaterMovies } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
