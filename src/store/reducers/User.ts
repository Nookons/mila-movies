import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IFirebaseUser} from "../../type/User";

type ItemsState = {
    user: IFirebaseUser | null;
    loading: boolean;
    error: string | undefined;
};

const initialState: ItemsState = {
    user: null,
    loading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        userEnter: (state, action: PayloadAction<IFirebaseUser>) => {
            state.user = action.payload;
        },
        userLeave: (state) => {
            state.user = null;
        },
    },
});

export const { userEnter, userLeave } = userSlice.actions;
export default userSlice.reducer;
