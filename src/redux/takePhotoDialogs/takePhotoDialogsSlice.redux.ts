import { createSlice } from "@reduxjs/toolkit";

export interface Dialogs {
    downloadDialog: boolean;
    downscaleDialog: boolean;
    value: number;
}

const initialState: Dialogs = {
    downloadDialog: false,
    downscaleDialog: false,
    value: 1,
};

export const takePhotoDialogsSlice = createSlice({
    name: "takePhotoDialogs",
    initialState,
    reducers: {
        openDownloadDialog: (state: { downloadDialog: boolean }) => {
            state.downloadDialog = true;
        },
        closeDownloadDialog: (state: { downloadDialog: boolean }) => {
            state.downloadDialog = false;
        },
        openDownscaleDialog: (state: { downscaleDialog: boolean }) => {
            state.downscaleDialog = true;
        },
        closeDownscaleDialog: (state: { downscaleDialog: boolean }) => {
            state.downscaleDialog = false;
        },
    },
});

export const selectDownloadDialog = (state) =>
    state.takePhotoDialogs.downloadDialog;

export const selectDownscaleDialog = (state) =>
    state.takePhotoDialogs.downscaleDialog;

export const {
    openDownloadDialog,
    openDownscaleDialog,
    closeDownloadDialog,
    closeDownscaleDialog,
} = takePhotoDialogsSlice.actions;
export default takePhotoDialogsSlice.reducer;
