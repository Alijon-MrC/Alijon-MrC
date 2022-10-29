import { createSlice } from "@reduxjs/toolkit";
import langObg from './data'
export const langSlice = createSlice({
    name: "lang",
    initialState: langObg["uz-UZ"],
    reducers: {
        changeLanguage(store, action) {
            return { ...langObg[action.payload] }
        }
    }
});

export const { changeLanguage } = langSlice.actions;
export default langSlice.reducer;