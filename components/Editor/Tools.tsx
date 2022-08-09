import React, { useEffect, useRef } from "react";

import styles from "./Tools.module.scss";
import { State } from "../../src/GlobalSpecialState";

import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import TitleIcon from "@mui/icons-material/Title";

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
                    <HistoryIcon sx={{ fontSize: "28px" }} />
                    <span>Recent</span>
                </div>
                <div>
                    <EditIcon sx={{ fontSize: "28px" }} />
                    <span>Transform</span>
                </div>
                <div>
                    <EditIcon sx={{ fontSize: "28px" }} />
                    <span>Paint</span>
                </div>
                <div>
                    <TitleIcon sx={{ fontSize: "28px" }} />
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
