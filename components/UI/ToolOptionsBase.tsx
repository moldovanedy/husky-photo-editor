import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../src/redux/global.store";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import HeightIcon from "@mui/icons-material/Height";

import styles from "./ToolOptionsBase.module.scss";
import {
    changeHeightInfo,
    deactivateToolOptions
} from "../../src/redux/toolOptions.redux";

let firstY = 0;

function ToolOptionsBase(props: {
    children: ReactNode;
    active: boolean;
    title: string;
}) {
    let height = useSelector((state: RootState) => state.toolOptions.height);
    let topBarElement = useRef<HTMLDivElement>(null);
    let [pointerDown, setPointerDown] = useState(false);

    useEffect(() => {
        if (topBarElement.current !== null) {
            if (pointerDown) {
                topBarElement.current.style.filter = "brightness(0.5)";
            } else {
                topBarElement.current.style.filter = "";
            }
        }
    }, [pointerDown]);

    let moveY = 0;

    return (
        <div
            style={{ height: props.active ? height : 0, userSelect: "none" }}
            className={styles.mainMobile}
        >
            <div
                ref={topBarElement}
                className={styles.topBar}
                onPointerDown={(e: any) => {
                    firstY = e.clientY;
                    setPointerDown(true);
                }}
                onPointerMove={(e: any) => {
                    if (pointerDown) {
                        moveY = firstY - e.clientY;
                        if (height < 100) {
                            store.dispatch(changeHeightInfo(100));
                        } else if (height > window.innerHeight * 0.75) {
                            store.dispatch(
                                changeHeightInfo(window.innerHeight * 0.75)
                            );
                        } else {
                            store.dispatch(changeHeightInfo(height + moveY));
                        }
                        firstY = e.clientY;
                    }
                }}
                onPointerUp={(e: any) => {
                    firstY = 0;
                    setPointerDown(false);
                }}
            >
                <div style={{ paddingRight: "10px" }}>
                    <CloseIcon
                        sx={{ fontSize: "28px" }}
                        onClick={() => {
                            store.dispatch(deactivateToolOptions());
                        }}
                    />
                </div>

                <div className={styles.title}>
                    <div>
                        <HeightIcon sx={{ fontSize: "28px" }} />
                        <HeightIcon sx={{ fontSize: "28px" }} />
                    </div>
                    {props.title}
                </div>

                <div style={{ paddingLeft: "10px" }}>
                    <CheckIcon
                        sx={{ fontSize: "28px" }}
                        onClick={() => {
                            store.dispatch(deactivateToolOptions());
                        }}
                    />
                </div>
            </div>

            <div style={{ overflow: "auto" }}>{props.children}</div>
        </div>
    );
}

export default ToolOptionsBase;
