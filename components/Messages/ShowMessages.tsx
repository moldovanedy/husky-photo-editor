import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

import { store } from "../../src/redux/global.store";
import { disposeMessage } from "../../src/redux/messages/messagesSlice.redux";
import styles from "./ShowMessages.module.scss";

function ShowMessages() {
    let [globalStore, setGlobalStore] = useState(store.getState());

    store.subscribe(() => {
        setGlobalStore(store.getState());
    });

    return (
        <aside
            className={`centerAlign ${styles.messagesContainer}`}
            style={{ flexDirection: "column" }}
        >
            {globalStore.messages.map((item, index) => {
                let msgType = "";
                switch (item.type) {
                    case 0:
                        msgType = "Information";
                        break;
                    case 1:
                        msgType = "Warning";
                        break;
                    case 2:
                        msgType = "Error";
                        break;
                    default:
                        msgType = "Success";
                        break;
                }
                return (
                    <div
                        key={index}
                        role={"alert"}
                        style={
                            item.type === 0
                                ? { backgroundColor: "#6082cc" }
                                : item.type === 1
                                ? { backgroundColor: "#ccbc3a" }
                                : item.type === 2
                                ? { backgroundColor: "#f5494c" }
                                : { backgroundColor: "#8ee77c" }
                        }
                        className={styles.message}
                    >
                        <Message
                            key={index}
                            name={item.name}
                            message={item.message}
                            id={item.id}
                        />
                    </div>
                );
            })}
        </aside>
    );
}

function Message({ name, message, id }) {
    let messageId = useRef<HTMLInputElement>(null);

    return (
        <>
            <input type={"hidden"} ref={messageId} value={id} />
            <FontAwesomeIcon
                icon={faTimes}
                size={"2x"}
                className={styles.closeButton}
                onClick={() => {
                    if (messageId.current !== null) {
                        store.dispatch(
                            disposeMessage(
                                //@ts-ignore
                                parseInt(messageId.current.value)
                            )
                        );
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
