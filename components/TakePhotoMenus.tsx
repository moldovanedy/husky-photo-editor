/* eslint-disable react-hooks/exhaustive-deps */
import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    closeDownloadDialog,
    closeDownscaleDialog,
    selectDownloadDialog,
    selectDownscaleDialog
} from "../src/redux/takePhotoDialogsSlice.redux";

import styles from "./TakePhotoMenus.module.scss";
import { downloadPhoto } from "./../src/savePhoto";
import { State } from "../src/GlobalSpecialState";

import { store } from "./../src/redux/global.store";
import { createMessage, MessageType } from "../src/redux/messagesSlice.redux";
import { v1 as uuid } from "uuid";

export function DownloadMenu({ i18n }) {
    const downloadDialogState = useSelector(selectDownloadDialog);
    const dispatch = useDispatch();

    let [qualityValue, setQualityValue] = useState(90),
        [fileFormat, setFileFormat] = useState("PNG"),
        [fileName, setFileName] = useState("download");
    let qualityRangeInput = useRef<HTMLInputElement>(null),
        qualityNumberInput = useRef<HTMLInputElement>(null),
        fileFormatInput = useRef<HTMLSelectElement>(null),
        fileNameInput = useRef<HTMLInputElement>(null),
        mainElement = useRef<HTMLDivElement>(null),
        downloadLink = useRef<HTMLAnchorElement>(null);

    function changeQuality(quality: number) {
        setQualityValue(quality);
    }

    function changeFileFormat() {
        if (fileFormatInput.current !== null) {
            setFileFormat(fileFormatInput.current.value);
        }
    }

    function changeFileName() {
        if (fileNameInput.current !== null) {
            setFileName(fileNameInput.current.value);
        }
    }

    function downloadImage() {
        let canvasRef = State.getObject("canvas");
        if (
            downloadLink.current !== null &&
            canvasRef !== null &&
            canvasRef instanceof HTMLCanvasElement
        ) {
            downloadPhoto(
                qualityValue,
                fileFormat,
                fileName,
                downloadLink.current,
                canvasRef
            );
        } else {
            throw new Error("References were null or incorrect");
        }
    }

    function generateRandomFileName() {
        let randomName = uuid();
        setFileName(randomName);
    }

    useEffect(() => {
        if (mainElement.current === null) {
            return;
        }

        if (downloadDialogState) {
            mainElement.current.style.opacity = "1";
            mainElement.current.style.pointerEvents = "all";
        } else {
            mainElement.current.style.opacity = "0";
            mainElement.current.style.pointerEvents = "none";
        }
    }, [downloadDialogState]);

    return (
        <div ref={mainElement} className={`centerAlign ${styles.photoOptions}`}>
            <FontAwesomeIcon
                icon={faTimes}
                size={"3x"}
                style={{ position: "absolute", top: "7%", right: "8%" }}
                onClick={() => {
                    dispatch(closeDownloadDialog());
                }}
            />
            <div className={`centerAlign ${styles.optionsWindow}`}>
                <div>
                    <span>{i18n("common:saveAs")}</span>
                    <select
                        ref={fileFormatInput}
                        id="fileFormat"
                        onChange={() => {
                            changeFileFormat();
                        }}
                    >
                        <option value="PNG">PNG</option>
                        <option value="JPG">JPG</option>
                        <option value="WEBP">WebP</option>
                    </select>
                </div>

                <div>
                    <span>{i18n("common:quality")}</span>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={qualityValue}
                        disabled={fileFormat === "PNG" ? true : false}
                        ref={qualityRangeInput}
                        onChange={() => {
                            if (qualityRangeInput.current !== null) {
                                if (
                                    isNaN(
                                        parseInt(
                                            qualityRangeInput.current.value
                                        )
                                    )
                                ) {
                                    changeQuality(1);
                                    qualityRangeInput.current.value = "1";
                                } else {
                                    changeQuality(
                                        parseInt(
                                            qualityRangeInput.current.value
                                        )
                                    );
                                }
                            }
                        }}
                    />
                    <input
                        id="qualityInput"
                        type="number"
                        min="1"
                        max="100"
                        value={qualityValue}
                        ref={qualityNumberInput}
                        disabled={fileFormat === "PNG" ? true : false}
                        onChange={() => {
                            if (qualityNumberInput.current !== null) {
                                if (
                                    isNaN(
                                        parseInt(
                                            qualityNumberInput.current.value
                                        )
                                    )
                                ) {
                                    changeQuality(1);
                                } else {
                                    changeQuality(
                                        parseInt(
                                            qualityNumberInput.current.value
                                        )
                                    );
                                }
                            }
                        }}
                    />
                </div>

                <div>
                    <span>{i18n("common:imgName")}</span>
                    <input
                        ref={fileNameInput}
                        type="text"
                        value={fileName}
                        onChange={() => {
                            changeFileName();
                        }}
                    />
                    <button
                        className={styles.downloadButton}
                        onClick={() => {
                            generateRandomFileName();
                        }}
                        style={{
                            backgroundColor: "#2dc4cc",
                            marginLeft: "10px",
                            maxWidth: "500px"
                        }}
                    >
                        {i18n("common:generateRandomName")}
                    </button>
                </div>

                <div>
                    <a
                        ref={downloadLink}
                        className={styles.downloadButton}
                        onClick={() => {
                            downloadImage();
                        }}
                    >
                        {i18n("common:download")}
                        <FontAwesomeIcon icon={faDownload} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export function DownscaleMenu({ i18n }) {
    const downscaleDialogState = useSelector(selectDownscaleDialog);
    const dispatch = useDispatch();

    let [downscaleRatio, setDownscaleRatio] = useState(1),
        [width, setWidth] = useState(0),
        [height, setHeight] = useState(0);
    let downscaleRatioInput = useRef<HTMLInputElement>(null),
        downscaleRatioRangeInput = useRef<HTMLInputElement>(null),
        mainElement = useRef<HTMLDivElement>(null),
        downloadLink = useRef<HTMLAnchorElement>(null);

    function changeDownscaleRatio(value: number) {
        setDownscaleRatio(value);
    }

    function downscaleImage() {
        let canvasRef: HTMLCanvasElement = State.getObject("canvas"),
            image: ImageBitmap;
        if (canvasRef === null) {
            return;
        }

        let ctx: CanvasRenderingContext2D | null = canvasRef.getContext("2d");
        if (ctx === null) {
            store.dispatch(
                createMessage({
                    name: "Unsupported feature",
                    message:
                        "The following feature is not supported on your browser: canvas. Please upgrade your browser. Or reload the page as it might just be an unknown error.",
                    type: MessageType.Error
                })
            );
            return;
        } else {
            createImageBitmap(canvasRef).then((imgBitmap) => {
                image = imgBitmap;
                //@ts-ignore Object is possibly 'null'
                ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
                canvasRef.width = Math.round(imgBitmap.width * downscaleRatio);
                canvasRef.height = Math.round(
                    imgBitmap.height * downscaleRatio
                );

                //@ts-ignore Object is possibly 'null'
                ctx.scale(downscaleRatio, downscaleRatio);
                //@ts-ignore Object is possibly 'null'
                ctx.drawImage(image, 0, 0);
            });
        }
    }

    useEffect(() => {
        if (mainElement.current === null) {
            return;
        }

        let canvasRef = State.getObject("canvas");
        if (canvasRef !== null) {
            setWidth(canvasRef.width);
            setHeight(canvasRef.height);
        }

        if (downscaleDialogState) {
            mainElement.current.style.opacity = "1";
            mainElement.current.style.pointerEvents = "all";
        } else {
            mainElement.current.style.opacity = "0";
            mainElement.current.style.pointerEvents = "none";
        }
    }, [downscaleDialogState]);

    return (
        <div ref={mainElement} className={`centerAlign ${styles.photoOptions}`}>
            <FontAwesomeIcon
                icon={faTimes}
                size={"3x"}
                style={{ position: "absolute", top: "7%", right: "8%" }}
                onClick={() => {
                    dispatch(closeDownscaleDialog());
                }}
            />
            <div className={`centerAlign ${styles.optionsWindow}`}>
                <div>
                    <span>{i18n("takePhoto:downscaleRatio")}:</span>

                    <input
                        type={"range"}
                        ref={downscaleRatioRangeInput}
                        min={0.01}
                        step={0.01}
                        max={1}
                        value={downscaleRatio}
                        onChange={() => {
                            if (downscaleRatioRangeInput.current !== null) {
                                changeDownscaleRatio(
                                    parseFloat(
                                        downscaleRatioRangeInput.current.value
                                    )
                                );
                            }
                        }}
                    />

                    <input
                        type={"number"}
                        ref={downscaleRatioInput}
                        value={downscaleRatio}
                        onChange={() => {
                            if (downscaleRatioInput.current !== null) {
                                changeDownscaleRatio(
                                    parseFloat(
                                        downscaleRatioInput.current.value
                                    )
                                );
                            }
                        }}
                    />
                </div>

                <div>
                    <span>{i18n("common:imageProperties.width")}:</span>
                    <span>{Math.round(width * downscaleRatio)}</span>
                    <br />
                    <span>{i18n("common:imageProperties.height")}:</span>
                    <span>{Math.round(height * downscaleRatio)}</span>
                </div>

                <div>
                    <a
                        ref={downloadLink}
                        className={styles.downloadButton}
                        onClick={() => {
                            downscaleImage();
                        }}
                    >
                        {i18n("takePhoto:downscale")}
                    </a>
                </div>
            </div>
        </div>
    );
}
