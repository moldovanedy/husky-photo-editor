import { configureStore } from "@reduxjs/toolkit";

import takePhotoDialogsSlice from "./takePhotoDialogs/takePhotoDialogsSlice.redux";
import messagesSlice from "./messages/messagesSlice.redux";

export const store = configureStore({
    reducer: {
        takePhotoDialogs: takePhotoDialogsSlice,
        messages: messagesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
