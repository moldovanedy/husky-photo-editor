import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClockRotateLeft,
    faFont,
    faPen
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Tools.module.scss";
import { State } from "../../src/GlobalSpecialState";

function Tools() {
    let toolbar = useRef<HTMLElement>(null);
    useEffect(() => {
        State.addObject("toolbar", toolbar.current);
    }, []);

    return (
        <>
            <aside
                className={styles.main}
                ref={toolbar}
                onWheel={(event) => {
                    if (toolbar.current !== null) {
                        toolbar.current.scrollBy(
                            Math.round(event.deltaY / 4),
                            0
                        );
                    }
                }}
            >
                <div>
                    <FontAwesomeIcon icon={faClockRotateLeft} size={"2x"} />
                    <span>Recent</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPen} size={"2x"} />
                    <span>Transform</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPen} size={"2x"} />
                    <span>Paint</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faFont} size={"2x"} />
                    <span>Text</span>
                </div>
            </aside>

            <aside className={styles.infoPanel}>
                <span>Pos.: 1920:1080</span>
                <span>Zoom: 1.5</span>
                <span>Layer: 1</span>
            </aside>
        </>
    );
}

export default Tools;
