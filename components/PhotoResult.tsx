/* eslint-disable react-hooks/exhaustive-deps */
import {
    faCamera,
    faDownload,
    faMagnifyingGlassMinus,
    faMagnifyingGlassPlus,
    faMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

import styles from "./PhotoResult.module.scss";
import { State } from "../src/GlobalElementReferences.state";
import { DownloadMenu } from "./TakePhotoMenus";
import { useDispatch } from "react-redux";

import { openDownloadDialog } from "../src/redux/takePhotoDialogs/takePhotoDialogsSlice.redux";
import { scaleCanvas } from "../src/capturePhoto";

function PhotoResult(props: any) {
    return (
        <div
            className={styles.main}
            style={
                props.visible
                    ? { opacity: 1, pointerEvents: "all" }
                    : { opacity: 0, pointerEvents: "none" }
            }
            role={"dialog"}
        >
            <TopBar i18n={props.i18n} />
            <BottomBar i18n={props.i18n} />
            {props.children}
        </div>
    );
}

function TopBar({ i18n }) {
    let [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
        null
    );

    useEffect(() => {
        if (
            State.getReference("canvas") !== null &&
            State.getReference("canvas") !== undefined
        ) {
            let canvas = State.getReference("canvas");
            if (canvas instanceof HTMLCanvasElement) {
                setCanvasElement(canvas);
            }
        }
    }, [State.getReference("canvas")]);

    function zoomIn() {
        if (canvasElement === null) {
            return;
        }
        gsap.to(canvasElement, { scale: "+=0.1" });
    }

    function zoomOut() {
        if (canvasElement === null) {
            return;
        }
        gsap.to(canvasElement, { scale: "-=0.1" });
    }

    return (
        <div className={styles.actionLinesPhoto}>
            <FontAwesomeIcon
                icon={faMagnifyingGlassPlus}
                size={"2x"}
                onClick={() => {
                    zoomIn();
                }}
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlassMinus}
                size={"2x"}
                onClick={() => {
                    zoomOut();
                }}
            />
            <FontAwesomeIcon
                icon={faMinimize}
                size={"2x"}
                onClick={() => {
                    scaleCanvas(canvasElement);
                }}
                title="Resize the canvas to fit the screen (doesn't affect final photo)"
            />
            <FontAwesomeIcon
                icon={faCamera}
                size={"2x"}
                onClick={() => {
                    document.location.reload();
                }}
            />
        </div>
    );
}

function BottomBar({ i18n }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.actionLinesPhoto} style={{ bottom: 0 }}>
            <button
                className={styles.actionLineButtons}
                style={{ backgroundColor: "#a1a045" }}
            >
                {i18n("takePhoto:downscale")}
            </button>
            <button
                className={styles.actionLineButtons}
                style={{ backgroundColor: "#17bd17" }}
                onClick={() => {
                    dispatch(openDownloadDialog());
                }}
            >
                {i18n("takePhoto:download")}{" "}
                <FontAwesomeIcon icon={faDownload} />
            </button>

            <DownloadMenu i18n={i18n} />
        </div>
    );
}

export default PhotoResult;
