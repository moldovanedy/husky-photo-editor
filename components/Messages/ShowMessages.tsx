import React, { useEffect, useRef, useState } from "react";

import { RootState, store } from "../../src/redux/global.store";
import { disposeMessage } from "../../src/redux/messages.redux";
import styles from "./ShowMessages.module.scss";

import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertColor, Snackbar } from "@mui/material";

function ShowMessages() {
    let [msgStore, setMsgStore] = useState(store.getState().messages);
    let [isOpen, setIsOpen] = useState(true);

    store.subscribe(() => {
        setMsgStore(store.getState().messages);
        setIsOpen(true);
    });

    function closeSnack(id) {
        setIsOpen(false);
        setTimeout(() => {
            store.dispatch(disposeMessage(id));
        }, 500);
    }

    return (
        <aside
            className={`centerAlign ${styles.messagesContainer}`}
            style={{ flexDirection: "column" }}
        >
            {msgStore.map((item, index) => {
                let msgType = "";
                switch (item.type) {
                    case 0:
                        msgType = "info";
                        break;
                    case 1:
                        msgType = "warning";
                        break;
                    case 2:
                        msgType = "error";
                        break;
                    default:
                        msgType = "success";
                        break;
                }
                return (
                    <Snackbar
                        key={index}
                        open={isOpen}
                        autoHideDuration={6000}
                        onClose={() => {
                            closeSnack(item.id);
                        }}
                    >
                        <Alert
                            severity={msgType as AlertColor}
                            sx={{ width: "100%" }}
                            onClose={() => {
                                closeSnack(item.id);
                            }}
                        >
                            {item.message}
                        </Alert>
                    </Snackbar>
                );
            })}
        </aside>
    );
}

function Message({ name, message, id }) {
    let messageId = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (messageId.current !== null) {
                store.dispatch(disposeMessage(messageId.current.value));
            }
        }, 5000);
    }, []);

    return (
        <>
            <input type={"hidden"} ref={messageId} value={id} />
            <CloseIcon
                className={styles.closeButton}
                sx={{ fontSize: "28px" }}
                onClick={() => {
                    if (messageId.current !== null) {
                        store.dispatch(disposeMessage(messageId.current.value));
                    }
                }}
            />
            <b style={{ fontSize: "20px", color: "#000" }}>{name}</b>
            <br />
            <span style={{ color: "#000" }}>{message}</span>
        </>
    );
}

export default ShowMessages;
