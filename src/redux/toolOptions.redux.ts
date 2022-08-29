import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToolOptionsWindow {
    height: number;
    width: number;
    isActive: boolean;
}

const initialState: ToolOptionsWindow = {
    height: 200,
    width: 200,
    isActive: false
};

export const toolOptionsSlice = createSlice({
    name: "toolOptions",
    initialState,
    reducers: {
        changeHeightInfo: (
            state: ToolOptionsWindow,
            action: PayloadAction<number>
        ) => {
            state.height = action.payload;
        },

        changeWidthInfo: (
            state: ToolOptionsWindow,
            action: PayloadAction<number>
        ) => {
            state.width = action.payload;
        },

        activateToolOptions: (state: ToolOptionsWindow) => {
            state.isActive = true;
        },

        deactivateToolOptions: (state: ToolOptionsWindow) => {
            state.isActive = false;
        }
    }
});

export const {
    changeHeightInfo,
    changeWidthInfo,
    activateToolOptions,
    deactivateToolOptions
} = toolOptionsSlice.actions;
export default toolOptionsSlice.reducer;
