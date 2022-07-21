import { configureStore } from "@reduxjs/toolkit";

import takePhotoDialogsSlice from "./takePhotoDialogs/takePhotoDialogsSlice.redux";

export const store = configureStore({
    reducer: {
        takePhotoDialogs: takePhotoDialogsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
