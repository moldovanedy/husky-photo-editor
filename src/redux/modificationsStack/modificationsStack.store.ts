import { configureStore } from "@reduxjs/toolkit";

import openedProjectsSlice from "./openedProjects.redux";

export const modificationsStack = configureStore({
    reducer: {
        openedProjects: openedProjectsSlice
    }
});

export type RootState = ReturnType<typeof modificationsStack.getState>;
export type AppDispatch = typeof modificationsStack.dispatch;
