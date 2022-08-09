import { createSlice } from "@reduxjs/toolkit";

export interface UI {
    mainMenuOpen: boolean;
    workInProgress: boolean;
}

const initialState: UI = {
    mainMenuOpen: false,
    workInProgress: false
};

export const userInterfaceSlice = createSlice({
    name: "takePhotoDialogs",
    initialState,
    reducers: {
        openMainMenu: (state: UI) => {
            state.mainMenuOpen = true;
        },
        closeMainMenu: (state: UI) => {
            state.mainMenuOpen = false;
        },
        startWork: (state: UI) => {
            state.workInProgress = true;
        },
        completeWork: (state: UI) => {
            state.workInProgress = false;
        }
    }
});

export const { openMainMenu, closeMainMenu, startWork, completeWork } =
    userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
