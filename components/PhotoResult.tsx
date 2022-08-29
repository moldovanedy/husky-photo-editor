/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import styles from "./PhotoResult.module.scss";
import { State } from "../src/GlobalSpecialState";
import { DownloadMenu, DownscaleMenu } from "./TakePhotoMenus";
import { useDispatch, useSelector } from "react-redux";

import {
    closeDownloadDialog,
    openDownloadDialog,
    openDownscaleDialog
} from "../src/redux/takePhotoDialogs.redux";
import { scaleCanvas } from "../src/capturePhoto";
import {
    MeasuringSystem,
    translate
} from "../src/utils/transform/translateElements";
import {
    convertTransformObjectToString,
    getTransformValuesOfElement
} from "../src/utils/transform/transformUtility";
import { RootState, store } from "../src/redux/global.store";
import { scale } from "../src/utils/transform/scaleElements";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DownloadIcon from "@mui/icons-material/Download";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

function PhotoResult(props: any) {
    return (
        <div
            className={styles.main}
            style={
                props.visible
                    ? {
                          opacity: 1,
                          pointerEvents: "all",
                          touchAction: "none"
                      }
                    : { opacity: 0, pointerEvents: "none" }
            }
            role={"dialog"}
        >
            <TopBar i18n={props.i18n} />
            <BottomBar i18n={props.i18n} />
            <div
                style={{
                    imageRendering: "pixelated",
                    height: "100%"
                }}
                id="scrollable"
            >
                {props.children}
            </div>
        </div>
    );
}

function TopBar({ i18n }) {
    let [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
            null
        ),
        isPressing = false,
        firstX = 0,
        firstY = 0,
        offsetX = 0,
        offsetY = 0;

    useEffect(() => {
        if (
            State.getObject("canvas") !== null &&
            State.getObject("canvas") !== undefined
        ) {
            let canvas = State.getObject("canvas");
            if (canvas instanceof HTMLCanvasElement) {
                setCanvasElement(canvas);
            }

            (
                document.getElementById("scrollable") as HTMLElement
            ).style.overflow = "hidden";

            (
                document.getElementById("scrollable") as HTMLElement
            ).addEventListener("pointerdown", (e) => {
                isPressing = true;
                let transformObject = getTransformValuesOfElement(
                    canvas.style.transform
                );

                if (
                    transformObject !== null &&
                    transformObject.translate !== undefined &&
                    transformObject.translate !== null
                ) {
                    offsetX = e.clientX;
                    offsetY = e.clientY;
                    firstX = parseInt(transformObject.translate[0]);
                    firstY = parseInt(transformObject.translate[1]);
                } else {
                    offsetX = e.clientX;
                    offsetY = e.clientY;
                    firstX = 0;
                    firstY = 0;
                }
            });

            (
                document.getElementById("scrollable") as HTMLElement
            ).addEventListener("pointerup", (e) => {
                isPressing = false;
            });

            (
                document.getElementById("scrollable") as HTMLElement
            ).addEventListener("pointermove", (e) => {
                let transformObject = getTransformValuesOfElement(
                    canvas.style.transform
                );

                if (isPressing) {
                    // translate taking into account the scale in order to prevent too quick movement at big scale and too small movement at small scale
                    translate(
                        canvas,
                        e.clientX - offsetX + firstX,
                        e.clientY - offsetY + firstY,
                        MeasuringSystem.Absolute
                    );
                }
            });
        }
    }, [State.getObject("canvas")]);

    function zoomIn() {
        if (canvasElement === null) {
            return;
        }
        let transformObject = getTransformValuesOfElement(
                canvasElement.style.transform
            ),
            previousScale = transformObject?.scale;
        if (previousScale !== undefined && previousScale[1] !== ".") {
            scale(
                canvasElement,
                parseFloat(previousScale[0]) + 0.1,
                parseFloat(previousScale[1]) + 0.1,
                MeasuringSystem.Absolute
            );
        } else {
            scale(canvasElement, 1.1, 1.1, MeasuringSystem.Absolute);
        }
    }

    function zoomOut() {
        if (canvasElement === null) {
            return;
        }
        let transformObject = getTransformValuesOfElement(
                canvasElement.style.transform
            ),
            previousScale = transformObject?.scale;
        if (previousScale !== undefined && previousScale[1] !== ".") {
            scale(
                canvasElement,
                parseFloat(previousScale[0]) - 0.1,
                parseFloat(previousScale[1]) - 0.1,
                MeasuringSystem.Absolute
            );
        } else {
            scale(canvasElement, 0.9, 0.9, MeasuringSystem.Absolute);
        }
    }

    return (
        <div className={styles.actionLinesPhoto}>
            <ZoomInIcon
                className="themeDependentIcon"
                sx={{ fontSize: "36px", color: "#fff" }}
                onClick={() => {
                    zoomIn();
                }}
            />

            <ZoomOutIcon
                className="themeDependentIcon"
                sx={{ fontSize: "36px", color: "#fff" }}
                onClick={() => {
                    zoomOut();
                }}
            />

            <CloseFullscreenIcon
                className="themeDependentIcon"
                sx={{ fontSize: "28px" }}
                onClick={() => {
                    scaleCanvas(canvasElement);
                }}
            />

            <CameraAltIcon
                className="themeDependentIcon"
                sx={{ fontSize: "36px", color: "#fff" }}
                onClick={() => {
                    document.location.reload();
                }}
            />
        </div>
    );
}

function BottomBar({ i18n }) {
    const dispatch = useDispatch();
    let [photoWidth, setPhotoWidth] = useState(0);
    let [photoHeight, setPhotoHeight] = useState(0);

    let downscaleDialogOpen = useSelector(
            (state: RootState) => state.takePhotoDialogs.downscaleDialog
        ),
        downloadDialogOpen = useSelector(
            (state: RootState) => state.takePhotoDialogs.downloadDialog
        );

    useEffect(() => {
        if (
            State.getObject("canvas") !== null &&
            State.getObject("canvas") !== undefined
        ) {
            let canvas = State.getObject("canvas");
            if (canvas instanceof HTMLCanvasElement) {
                setPhotoWidth(canvas.width);
                setPhotoHeight(canvas.height);
            }
        }
    }, [State.getObject("canvas"), downscaleDialogOpen]);

    return (
        <>
            <div className={styles.actionLinesPhoto} style={{ bottom: "30px" }}>
                {photoWidth}x{photoHeight}
            </div>
            <div className={styles.actionLinesPhoto} style={{ bottom: 0 }}>
                <button
                    className={styles.actionLineButtons}
                    style={{ backgroundColor: "#a1a045" }}
                    onClick={() => {
                        dispatch(openDownscaleDialog());
                    }}
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
                    <DownloadIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "16px" }}
                    />
                </button>

                {downloadDialogOpen ? (
                    <DownloadMenu
                        i18n={i18n}
                        closeEvent={() => {
                            dispatch(closeDownloadDialog());
                        }}
                    />
                ) : null}
                <DownscaleMenu i18n={i18n} />
            </div>
        </>
    );
}

export default PhotoResult;
