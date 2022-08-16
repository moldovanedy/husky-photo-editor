/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import styles from "./../../styles/take-photo.module.scss";
import { capture, scaleCanvas } from "./../../src/capturePhoto";
import PhotoResult from "./../../components/PhotoResult";
import { State } from "../../src/GlobalSpecialState";
import Link from "../../components/Link";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import VideocamIcon from "@mui/icons-material/Videocam";
import SettingsIcon from "@mui/icons-material/Settings";
import CameraIcon from "@mui/icons-material/Camera";

const getStaticProps = makeStaticProps(["common", "takePhoto", "messages"]);
export { getStaticPaths, getStaticProps };

function TakePhoto() {
    let videoElement = useRef<HTMLVideoElement>(null),
        capturePhotoButton = useRef<SVGSVGElement>(null),
        canvasElement = useRef<HTMLCanvasElement>(null),
        changeCameraButton = useRef<SVGSVGElement>(null);

    let [hasTakenPhoto, setHasTakenPhoto] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        window.onresize = () => {
            scaleCanvas(canvasElement.current);
        };

        try {
            if (
                videoElement.current !== null &&
                capturePhotoButton.current !== null &&
                canvasElement.current !== null
            ) {
                capture(
                    0,
                    videoElement.current,
                    capturePhotoButton.current,
                    canvasElement.current,
                    changeCameraButton.current
                );
            }
        } catch (err: any) {
            switch (err.name) {
                case "NotAllowedError":
                    console.log(t("messages:errors.cameraAccessDenied"));
                    break;
                case "NotReadableError":
                    console.log(t("messages:errors.unknownHardwareError"));
                    break;
                case "NotFoundError":
                    console.log(t("messages:errors.cameraNotFound"));
                    break;
                default:
                    console.log(t("messages:errors.unknownError"));
                    console.log(err);
                    break;
            }
        }
    }, []);

    return (
        <>
            <Head>
                <title>{t("takePhoto:pageTitle")}</title>
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app/take-photo"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <main id={styles.mainCamera} className="centerAlign">
                <div>
                    {/* default width and height */}
                    <video
                        id={styles.video}
                        ref={videoElement}
                        width="1920"
                        height="1080"
                    ></video>
                </div>

                <div className={`${styles.buttonLines} ${styles.topLine}`}>
                    <Link href="/">
                        <ArrowBackIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "36px", color: "#fff" }}
                            onClick={() => {
                                // because otherwise the camera will still be on
                                let stream = State.getObject("stream");
                                if (stream !== null) {
                                    stream.stop();
                                }
                            }}
                        />
                    </Link>

                    <CameraswitchIcon
                        className="themeDependentIcon"
                        ref={changeCameraButton}
                        sx={{ fontSize: "36px", color: "#fff" }}
                        // onClick event listener is in src/capturePhoto.ts?82
                    />

                    <VideocamIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "36px", color: "#fff" }}
                        onClick={() => {
                            if (
                                videoElement.current !== null &&
                                capturePhotoButton.current !== null &&
                                canvasElement.current !== null
                            ) {
                                capture(
                                    0,
                                    videoElement.current,
                                    capturePhotoButton.current,
                                    canvasElement.current,
                                    changeCameraButton.current
                                );
                            }
                        }}
                    />

                    <SettingsIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "36px", color: "#fff" }}
                    />
                </div>

                <div className={`${styles.buttonLines} ${styles.bottomLine}`}>
                    <CameraIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "60px", color: "#fff" }}
                        ref={capturePhotoButton}
                        onClick={() => {
                            setHasTakenPhoto(true);
                            if (canvasElement.current !== null) {
                                State.addObject(
                                    "canvas",
                                    canvasElement.current
                                );
                            }
                        }}
                    />
                </div>
            </main>

            <PhotoResult visible={hasTakenPhoto ? true : false} i18n={t}>
                <canvas ref={canvasElement}></canvas>
            </PhotoResult>
        </>
    );
}

export default TakePhoto;
