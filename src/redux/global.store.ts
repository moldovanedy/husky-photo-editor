import { configureStore } from "@reduxjs/toolkit";

import takePhotoDialogsSlice from "./takePhotoDialogs.redux";
import messagesSlice from "./messages.redux";
import environmentInfoSlice from "./environmentInfo.redux";
import userInterfaceSlice from "./userInterface.redux";
import projectManagementSlice from "./projectManagement.redux";

export const store = configureStore({
    reducer: {
        takePhotoDialogs: takePhotoDialogsSlice,
        messages: messagesSlice,
        environmentInfo: environmentInfoSlice,
        userInterface: userInterfaceSlice,
        projectManagement: projectManagementSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
