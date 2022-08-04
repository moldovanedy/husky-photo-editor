/*---------------------------------------------------------------------------------------------
 * Here we store basic inforamtion about environment such as window height, window width,
 * OS, browser version etc.
 *--------------------------------------------------------------------------------------------*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EnvInfo {
    windowHeight: number;
    windowWidth: number;
}

const initialState: EnvInfo = {
    windowHeight: 0,
    windowWidth: 0
};

export const environmentInfoSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        changeWindowHeightInfo: (
            state: EnvInfo,
            action: PayloadAction<number>
        ) => {
            state.windowHeight = action.payload;
        },

        changeWindowWidthInfo: (
            state: EnvInfo,
            action: PayloadAction<number>
        ) => {
            state.windowWidth = action.payload;
        }
    }
});

export const { changeWindowHeightInfo, changeWindowWidthInfo } =
    environmentInfoSlice.actions;
export default environmentInfoSlice.reducer;
