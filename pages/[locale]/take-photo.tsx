/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import styles from "./../../styles/take-photo.module.scss";
import { capture, scaleCanvas } from "./../../src/capturePhoto";
import PhotoResult from "./../../components/PhotoResult";
import { State } from "../../src/GlobalSpecialState";
import PrivacyPolicy from "../../components/PrivacyPolicy";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraSwitchIcon from "@mui/icons-material/Cameraswitch";
import VideocamIcon from "@mui/icons-material/Videocam";
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

    let [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    useEffect(() => {
        let context = State.getObject("translationContext");
        if (context === null) {
            State.addObject("translationContext", t);
        }

        window.onresize = () => {
            scaleCanvas(canvasElement.current);
        };

        let hasAcceptedLegalTerms = localStorage.getItem(
            "hasAcceptedLegalTerms"
        );
        if (
            hasAcceptedLegalTerms === null ||
            hasAcceptedLegalTerms === undefined
        ) {
            setShowPrivacyPolicy(true);
        }

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

            {showPrivacyPolicy ? (
                <PrivacyPolicy
                    title={t("common:initial.privacyPolicyDialogTitle")}
                    content={t("common:initial.privacyPolicyDialogContent")}
                />
            ) : null}

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
                    <ArrowBackIcon
                        sx={{ fontSize: "36px" }}
                        onClick={() => {
                            // to ensure the camera stops when leaving the page,
                            // in addition to calling stram.stop(),
                            // use location replace insead of link component
                            let stream = State.getObject("stream");
                            if (stream !== null) {
                                stream.stop();
                            }
                            document.location.pathname = "/";
                        }}
                    />

                    <CameraSwitchIcon
                        ref={changeCameraButton}
                        sx={{ fontSize: "36px" }}
                        // onClick event listener is in src/capturePhoto.ts?82
                    />

                    <VideocamIcon
                        sx={{ fontSize: "36px" }}
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
                </div>

                <div className={`${styles.buttonLines} ${styles.bottomLine}`}>
                    <CameraIcon
                        sx={{ fontSize: "60px" }}
                        ref={capturePhotoButton}
                        onClick={() => {
                            setHasTakenPhoto(true);

                            let settings: any = {},
                                audio = new Audio(
                                    "/assets/audio/takePhoto.mp3"
                                );
                            if (localStorage.getItem("settings") !== null) {
                                settings = JSON.parse(
                                    //@ts-ignore
                                    localStorage.getItem("settings")
                                );
                            }

                            if (settings.soundsEnabled) {
                                audio.volume = settings.appVolume
                                    ? settings.appVolume / 100
                                    : 30;
                                audio.play();
                            }

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
