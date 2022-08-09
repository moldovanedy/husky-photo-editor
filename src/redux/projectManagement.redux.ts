import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProjectInState {
    id: string;
    name: string;
    width: number;
    height: number;
    isLoading: boolean;
    isActive: boolean;
}

const initialState: ProjectInState[] = [];

export const projectManagementSlice = createSlice({
    name: "projectManagement",
    initialState,
    reducers: {
        addProjectToState: (
            state: ProjectInState[],
            action: PayloadAction<ProjectInState>
        ) => {
            state.push({
                id: action.payload.id,
                name: action.payload.name,
                width: action.payload.width,
                height: action.payload.height,
                isLoading: action.payload.isLoading,
                isActive: false
            });
            setActiveProjectRedux(action.payload.id);
        },

        /**
         * Sets "isLoading" property of project to false
         * @param state The redux state
         * @param action The id of the project
         */
        completeProjectLoading: (
            state: ProjectInState[],
            action: PayloadAction<string>
        ) => {
            state.forEach((project) => {
                if (project.id === action.payload) {
                    project.isLoading = false;
                } else {
                    project.isLoading = false; // don't display project loading infinitely, it is better to just make all projects seem loaded
                }
            });
        },

        setActiveProjectRedux: (
            state: ProjectInState[],
            action: PayloadAction<string>
        ) => {
            state.forEach((project) => {
                if (project.id === action.payload) {
                    project.isActive = true;
                } else {
                    project.isActive = false;
                }
            });
        },

        deleteProjectRedux: (
            state: ProjectInState[],
            action: PayloadAction<string>
        ) => {
            let indexOfProjectToDelete = state.findIndex(
                (project) => action.payload === project.id
            );
            if (indexOfProjectToDelete !== -1) {
                state.splice(indexOfProjectToDelete, 1);
            }
        }
    }
});

export const {
    addProjectToState,
    completeProjectLoading,
    setActiveProjectRedux,
    deleteProjectRedux
} = projectManagementSlice.actions;
export default projectManagementSlice.reducer;
