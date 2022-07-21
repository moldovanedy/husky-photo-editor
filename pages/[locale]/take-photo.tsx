/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faCameraRotate,
    faGear,
    faTimes,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";

import styles from "./../../styles/take-photo.module.scss";
import {
    capture,
    scaleCanvas,
    getAvailableCameras,
} from "./../../src/capturePhoto";
import PhotoResult from "./../../components/PhotoResult";
import { State } from "../../src/GlobalSpecialState";
import Link from "../../components/Link";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
const getStaticProps = makeStaticProps(["common", "takePhoto"]);
export { getStaticPaths, getStaticProps };

function TakePhoto() {
    let videoElement = useRef<HTMLVideoElement>(null),
        capturePhotoButton = useRef<SVGSVGElement>(null),
        canvasElement = useRef<HTMLCanvasElement>(null),
        changeCameraButton = useRef<HTMLElement>(null);

    let [hasTakenPhoto, setHasTakenPhoto] = useState(false),
        [isShowingAvailableCameras, setIsShowingAvailableCameras] =
            useState(false),
        [availableCameras, setAvailableCameras] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        window.onresize = () => {
            scaleCanvas(canvasElement.current);
        };
        setAvailableCameras(getAvailableCameras());

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
                    console.log(t("takePhoto:cameraAccessDenied"));
                    break;
                case "NotReadableError":
                    console.log("An unknown hardware error has occured.");
                    break;
                case "NotFoundError":
                    console.log(t("takePhoto:cameraNotFound"));
                    break;
                default:
                    console.log("An unknown error has occured.");
                    console.log(err);
                    break;
            }
        }
    }, []);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>{t("takePhoto:pageTitle")}</title>
                <link rel="icon" href="/favicon.ico" />
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
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size={"2x"}
                            title={t("common:goBack")}
                            onClick={() => {
                                // because otherwise the camera will still be on
                                let stream = State.getReference("stream");
                                if (stream !== null) {
                                    stream.stop();
                                }
                            }}
                        ></FontAwesomeIcon>
                    </Link>

                    <FontAwesomeIcon
                        icon={faCameraRotate}
                        //@ts-ignore
                        ref={changeCameraButton}
                        size={"2x"}
                        title={t("takePhoto:changeCamera")}
                        // onClick event listener is in src/capturePhoto.ts?82
                    ></FontAwesomeIcon>

                    <FontAwesomeIcon
                        icon={faVideo}
                        size={"2x"}
                        id="reloadCameraPermission"
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
                        title={t("takePhoto:rerequestCamera")}
                    ></FontAwesomeIcon>

                    <FontAwesomeIcon
                        icon={faGear}
                        size={"2x"}
                        title={t("common:openSettings")}
                    ></FontAwesomeIcon>
                </div>

                <div className={`${styles.buttonLines} ${styles.bottomLine}`}>
                    <FontAwesomeIcon
                        icon={faCircleDot}
                        size={"4x"}
                        ref={capturePhotoButton}
                        id="takePhotoButton"
                        onClick={() => {
                            setHasTakenPhoto(true);
                            if (canvasElement.current !== null) {
                                State.addReference(
                                    "canvas",
                                    canvasElement.current
                                );
                            }
                        }}
                    ></FontAwesomeIcon>
                </div>
            </main>

            <PhotoResult visible={hasTakenPhoto ? true : false} i18n={t}>
                <canvas ref={canvasElement}></canvas>
            </PhotoResult>
        </>
    );
}

export default TakePhoto;
