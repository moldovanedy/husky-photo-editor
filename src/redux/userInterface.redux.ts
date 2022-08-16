import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UI {
    mainMenuOpen: boolean;
    workInProgress: boolean;
    activeProject: string;
    zoomFactor: number;
    isInNavigationMode: boolean;
}

const initialState: UI = {
    mainMenuOpen: false,
    workInProgress: false,
    activeProject: "",
    zoomFactor: 1,
    isInNavigationMode: true
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
        },
        setProjectAsActive: (state: UI, action: PayloadAction<string>) => {
            state.activeProject = action.payload;
        },
        setZoomFactor: (state: UI, action: PayloadAction<number>) => {
            state.zoomFactor = action.payload;
        },
        enterNavigationMode: (state: UI) => {
            state.isInNavigationMode = true;
        },
        exitNavigationMode: (state: UI) => {
            state.isInNavigationMode = false;
        }
    }
});

export const {
    openMainMenu,
    closeMainMenu,
    startWork,
    completeWork,
    setProjectAsActive,
    setZoomFactor,
    enterNavigationMode,
    exitNavigationMode
} = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;
