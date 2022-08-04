/*---------------------------------------------------------------------------------------------
 *
 *--------------------------------------------------------------------------------------------*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";

import { Project } from "../../storage/db";

const initialState: Project[] = [];
export const projectModificationsStackSlice = createSlice({
    name: "projectModificationsStack",
    initialState,
    reducers: {
        openProject(state: Project[], action: PayloadAction<Project>) {
            state.push({
                id: action.payload.id,
                originalPhotoName: action.payload.originalPhotoName,
                lastModifiedInApp: action.payload.lastModifiedInApp,
                initialData: action.payload.initialData,
                currentData: action.payload.currentData,
                modificationsStack: action.payload.modificationsStack
            });
        },

        createNewProject(
            state: Project[],
            action: PayloadAction<{ width: number; height: number }>
        ) {
            state.push({
                id: uuid(),
                originalPhotoName: undefined,
                lastModifiedInApp: Date.now(),
                initialData: new Uint8ClampedArray(0),
                currentData: [
                    {
                        data: new Uint8ClampedArray(
                            action.payload.width * action.payload.height
                        ),
                        name: "Layer1",
                        width: action.payload.width,
                        height: action.payload.height,
                        zIndex: 1
                    }
                ],
                modificationsStack: []
            });
        }
    }
});

export const { openProject, createNewProject } =
    projectModificationsStackSlice.actions;
export default projectModificationsStackSlice.reducer;
