import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

import styles from "./Modal.module.scss";

function Modal(props: {
    title: string;
    show: boolean;
    closeEvent: Function;
    cancelBtnText: string;
    button1Event: Function;
    button1Text?: string;
    button2Event?: Function;
    button2Text?: string;
    children: any;
}) {
    let containerRef = useRef<HTMLElement>(null),
        modalRef = useRef<HTMLDivElement>(null);

    let btn1Text = "OK",
        btn2Text: string = "2",
        hasButton2 = false;

    if (props.button1Text === undefined) {
        btn1Text = "OK";
    }

    if (props.button2Event !== undefined) {
        if (props.button2Text !== undefined) {
            btn2Text = props.button2Text;
        }
        hasButton2 = true;
    }

    function closeModal() {
        if (containerRef.current !== null && modalRef.current !== null) {
            // so as to make a fade out animation
            containerRef.current.style.opacity = "0";
            modalRef.current.style.transform = "scale(0.5)";
            modalRef.current.style.marginBottom = "100px";

            setTimeout(() => {
                props.closeEvent();
            }, 500);
        } else {
            props.closeEvent();
        }
    }

    return props.show ? (
        <aside
            className={`centerAlign ${styles.container}`}
            role={"alertdialog"}
            ref={containerRef}
        >
            <div className={styles.modal} ref={modalRef}>
                <span>{props.title}</span>
                <FontAwesomeIcon
                    icon={faTimes}
                    size={"2x"}
                    style={{ float: "right" }}
                    onClick={() => {
                        closeModal();
                    }}
                />

                <div className={styles.content}>{props.children}</div>

                <div className={styles.buttonArea}>
                    <button
                        onClick={() => {
                            props.button1Event();
                        }}
                    >
                        {btn1Text}
                    </button>

                    {hasButton2 ? (
                        <button
                            onClick={() => {
                                //Can ignore because hasButton2 will be true only if button2Event is defined
                                // @ts-ignore Cannot invoke an object which is possibly 'undefined'
                                props.button2Event();
                            }}
                        >
                            {btn2Text}
                        </button>
                    ) : null}

                    <button
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        {props.cancelBtnText}
                    </button>
                </div>
            </div>
        </aside>
    ) : null;
}

export default Modal;
