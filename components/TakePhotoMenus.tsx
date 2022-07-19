import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    closeDownloadDialog,
    selectDownloadDialog,
} from "../src/redux/takePhotoDialogs/takePhotoDialogsSlice.redux";

import styles from "./TakePhotoMenus.module.scss";
import { downloadPhoto } from "./../src/savePhoto";
import { State } from "../src/GlobalElementReferences.state";

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
        let canvasRef = State.getReference("canvas");
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
                        defaultValue="download"
                        onChange={() => {
                            changeFileName();
                        }}
                    />
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
