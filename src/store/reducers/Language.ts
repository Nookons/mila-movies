import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {LanguageCookiesType} from "../../utils/Cookies/Language";

type ItemsState = {
    language: LanguageCookiesType;
    loading: boolean;
    error: string | undefined;
    isLoaded: boolean;
};

const initialState: ItemsState = {
    language: "en",
    loading: false,
    error: undefined,
    isLoaded: false,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setNewLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload as LanguageCookiesType;
        },
    },
});

// Экспортируем actions и thunk
export const { setNewLanguage } = languageSlice.actions;
export default languageSlice.reducer;
