import { configureStore } from "@reduxjs/toolkit";

import takePhotoDialogsSlice from "./takePhotoDialogsSlice.redux";
import messagesSlice from "./messagesSlice.redux";
import environmentInfoSlice from "./environmentInfo.redux";
import userInterfaceSlice from "./userInterface.redux";

export const store = configureStore({
    reducer: {
        takePhotoDialogs: takePhotoDialogsSlice,
        messages: messagesSlice,
        environmentInfo: environmentInfoSlice,
        userInterface: userInterfaceSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
