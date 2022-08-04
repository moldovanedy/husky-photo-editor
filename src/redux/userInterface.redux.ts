import { createSlice } from "@reduxjs/toolkit";

export interface UI {
    mainMenuOpen: boolean;
}

const initialState: UI = {
    mainMenuOpen: false
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
        }
    }
});

export const { openMainMenu, closeMainMenu } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
