/*---------------------------------------------------------------------------------------------
 * Here we store all the messages created for the user (informations, errors when something
 * went wrong, success message when something was completed sucessfully etc.)
 *--------------------------------------------------------------------------------------------*/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 as uuidV1 } from "uuid";

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
    id: string; //uuid
    timeCreated: number;
}

export interface MessageCreated {
    name: string;
    message: string;
    type: MessageType;
}

const initialState: UserMessage[] = [];

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        createMessage: (
            state: UserMessage[],
            action: PayloadAction<MessageCreated>
        ) => {
            let uuid = uuidV1();
            state.push({
                name: action.payload.name,
                message: action.payload.message,
                type: action.payload.type,
                id: uuid,
                timeCreated: Date.now(),
            });
            // setTimeout(() => {
            //     disposeMessage(uuid);
            // }, 10000);
        },
        disposeMessage: (
            state: UserMessage[],
            action: PayloadAction<string>
        ) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i] === undefined) break;
                if (state[i].id === action.payload) {
                    for (let j = 0; j < state.length - i; j++) {
                        state[j] = state[j + 1];
                    }
                    state.pop();
                }
            }
        },
    },
});

export const { createMessage, disposeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
