/*---------------------------------------------------------------------------------------------
 * Here we store all the messages created for the user (informations, errors when something
 * went wrong, success message when something was completed sucessfully)
 *--------------------------------------------------------------------------------------------*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum MessageType {
    Information,
    Warning,
    Error,
    Success,
}

export interface UserMessage {
    name: string;
    message: string;
    type: MessageType;
    id: number;
}

const initialState: UserMessage[] = [];

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        createMessage: (
            state: UserMessage[],
            action: PayloadAction<UserMessage>
        ) => {
            state.push({
                name: action.payload.name,
                message: action.payload.message,
                type: action.payload.type,
                id: action.payload.id,
            });
        },
        disposeMessage: (
            state: UserMessage[],
            action: PayloadAction<number>
        ) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i] === undefined) break; //throws errors
                if (state[i].id === action.payload) {
                    for (let j = 0; j < state.length - i; j++) {
                        state[j] = state[j + 1];
                    }
                    state.pop();
                }
            }
            // state = state.filter((item) => {
            //     item.id !== action.payload;
            // });
        },
    },
});

export const { createMessage, disposeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
