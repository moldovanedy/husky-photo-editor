/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    closeDownloadDialog,
    closeDownscaleDialog,
    selectDownloadDialog,
    selectDownscaleDialog
} from "../src/redux/takePhotoDialogs.redux";

import styles from "./TakePhotoMenus.module.scss";
import { downloadPhoto } from "./../src/savePhoto";
import { State } from "../src/GlobalSpecialState";

import { store } from "./../src/redux/global.store";
import { createMessage, MessageType } from "../src/redux/messages.redux";
import { v1 as uuid } from "uuid";

import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    MenuItem,
    InputLabel,
    Select,
    Slider,
    Input,
    TextField,
    Button,
    DialogActions
} from "@mui/material";

export function DownloadMenu({ i18n, closeEvent }) {
    const downloadDialogState = useSelector(selectDownloadDialog);
    const dispatch = useDispatch();

    let [qualityValue, setQualityValue] = useState(90),
        [fileFormat, setFileFormat] = useState("PNG"),
        [fileName, setFileName] = useState("download");
    let mainElement = useRef<HTMLDivElement>(null),
        downloadLink = useRef<HTMLAnchorElement>(null);

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
            dispatch(
                createMessage({
                    message: i18n("messages:errors.unknownError"),
                    type: MessageType.Error
                })
            );
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
        <Dialog open={true} onClose={closeEvent}>
            <DialogTitle>Save photo options</DialogTitle>
            <DialogContent>
                <div>
                    <InputLabel id="fileFormat">
                        {i18n("common:saveAs")}
                    </InputLabel>
                    <Select
                        labelId="fileFormat"
                        value={fileFormat}
                        label={"Format"}
                        onChange={(e) => {
                            setFileFormat(e.target.value);
                        }}
                    >
                        <MenuItem value={"PNG"}>PNG</MenuItem>
                        <MenuItem value={"JPG"}>JPG/JPEG</MenuItem>
                        <MenuItem value={"WEBP"}>WebP</MenuItem>
                    </Select>
                </div>

                <div>
                    <p>{i18n("common:quality")}</p>
                    <div className="centerAlign">
                        <Slider
                            disabled={
                                fileFormat !== "JPG" && fileFormat !== "WEBP"
                            }
                            sx={{ marginRight: "20px" }}
                            value={
                                typeof qualityValue === "number"
                                    ? qualityValue
                                    : 0
                            }
                            onChange={(e) => {
                                //@ts-ignore
                                setQualityValue(e.target.value);
                            }}
                        />
                        <Input
                            disabled={
                                fileFormat !== "JPG" && fileFormat !== "WEBP"
                            }
                            value={qualityValue}
                            size="small"
                            onChange={(e) =>
                                setQualityValue(parseInt(e.target.value))
                            }
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 100,
                                type: "number"
                            }}
                        />
                    </div>
                </div>

                <TextField
                    margin="dense"
                    id="name"
                    label={i18n("common:imgName")}
                    type="text"
                    value={fileName}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setFileName(e.target.value);
                    }}
                />

                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                        setFileName(uuid());
                    }}
                >
                    {i18n("common:generateRandomName")}
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeEvent}>{i18n("common:cancel")}</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        downloadImage();
                    }}
                >
                    <a style={{ color: "#000" }} ref={downloadLink}>
                        {i18n("common:download")}
                    </a>
                </Button>
            </DialogActions>
        </Dialog>
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
                    //@ts-ignore
                    message: i18n("messages:errors.unsupportedFeature", {
                        feature: "HTML5 canvas"
                    }),
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
            <CloseIcon
                className="themeDependentIcon"
                sx={{
                    position: "absolute",
                    top: "7%",
                    right: "8%",
                    fontSize: "48px"
                }}
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
