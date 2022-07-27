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
import { State } from "../src/GlobalSpecialState";
import { DownloadMenu, DownscaleMenu } from "./TakePhotoMenus";
import { useDispatch } from "react-redux";

import {
    openDownloadDialog,
    openDownscaleDialog,
} from "../src/redux/takePhotoDialogs/takePhotoDialogsSlice.redux";
import { scaleCanvas } from "../src/capturePhoto";
import {
    MeasuringSystem,
    translate,
} from "../src/utils/transform/translateElements";
import {
    convertTransformObjectToString,
    getTransformValuesOfElement,
} from "../src/utils/transform/transformUtility";
import { store } from "../src/redux/global.store";
import { scale } from "../src/utils/transform/scaleElements";

function PhotoResult(props: any) {
    return (
        <div
            className={styles.main}
            style={
                props.visible
                    ? {
                          opacity: 1,
                          pointerEvents: "all",
                          touchAction: "none",
                          overflow: "hidden",
                      }
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
        ),
        isPressing = false,
        firstX = 0,
        firstY = 0,
        offsetX = 0,
        offsetY = 0;

    useEffect(() => {
        if (
            State.getReference("canvas") !== null &&
            State.getReference("canvas") !== undefined
        ) {
            let canvas = State.getReference("canvas");
            if (canvas instanceof HTMLCanvasElement) {
                setCanvasElement(canvas);
            }

            document.body.addEventListener("pointerdown", (e) => {
                isPressing = true;
                let transformObject = getTransformValuesOfElement(
                    canvas.style.transform
                );

                if (transformObject !== null) {
                    convertTransformObjectToString(transformObject);
                }

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

            document.body.addEventListener("pointerup", (e) => {
                isPressing = false;
            });

            document.body.addEventListener("pointermove", (e) => {
                let transformObject = getTransformValuesOfElement(
                    canvas.style.transform
                );

                if (isPressing) {
                    if (
                        transformObject?.scale !== null &&
                        transformObject?.scale !== undefined
                    ) {
                        translate(
                            canvas,
                            e.clientX - offsetX + firstX,
                            e.clientY - offsetY + firstY,
                            MeasuringSystem.Absolute
                        );
                    } else {
                        translate(
                            canvas,
                            e.clientX - offsetX + firstX,
                            e.clientY - offsetY + firstY,
                            MeasuringSystem.Absolute
                        );
                    }
                }
            });
        }
    }, [State.getReference("canvas")]);

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
    let [photoWidth, setPhotoWidth] = useState(0);
    let [photoHeight, setPhotoHeight] = useState(0);
    let [resizedPhoto, setResizedPhoto] = useState(false);

    store.subscribe(() => {
        setResizedPhoto(store.getState().takePhotoDialogs.downscaleDialog);
    });

    useEffect(() => {
        if (
            State.getReference("canvas") !== null &&
            State.getReference("canvas") !== undefined
        ) {
            let canvas = State.getReference("canvas");
            if (canvas instanceof HTMLCanvasElement) {
                setPhotoWidth(canvas.width);
                setPhotoHeight(canvas.height);
            }
        }
    }, [State.getReference("canvas"), resizedPhoto]);

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
                    <FontAwesomeIcon icon={faDownload} />
                </button>

                <DownloadMenu i18n={i18n} />
                <DownscaleMenu i18n={i18n} />
            </div>
        </>
    );
}

export default PhotoResult;
