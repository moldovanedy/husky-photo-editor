import React, { useEffect, useRef } from "react";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCameraRotate,
    faGear,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";

import styles from "./../../styles/take-photo.module.scss";
import { capture, scaleCanvas } from "./../../src/capturePhoto";

function TakePhoto() {
    var videoElement = useRef<HTMLVideoElement>(null),
        capturePhotoButton = useRef<SVGSVGElement>(null);

    // window.onresize = () => {
    //         scaleCanvas();
    //     };

    useEffect(() => {
        try {
            capture(0, videoElement.current, capturePhotoButton.current);
        } catch (err: any) {
            switch (err.name) {
                case "NotAllowedError":
                    console.log(
                        "Permission to camera has been denied. Please reload page settings to grant permission to camera"
                    );
                    break;
                case "NotReadableError":
                    console.log("An unknown hardware error has occured.");
                    break;
                case "NotFoundError":
                    console.log(
                        "We were unable to find a camera on your device."
                    );
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
                <title>Take a photo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id={styles.mainCamera} className="centerAlign">
                <div id="container">
                    {/* default width and height */}
                    <video
                        id={styles.video}
                        ref={videoElement}
                        width="400"
                        height="200"
                    ></video>
                </div>

                <div className={`${styles.buttonLines} ${styles.topLine}`}>
                    <FontAwesomeIcon
                        icon={faCameraRotate}
                        size={"2x"}
                        title="Switch between front and rear camera."
                        // onclick="switchCamera()"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                        icon={faVideo}
                        size={"2x"}
                        id="reloadCameraPermission"
                        onClick={() => {
                            capture(
                                0,
                                videoElement.current,
                                capturePhotoButton.current
                            );
                        }}
                        title="Request camera permission again."
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                        icon={faGear}
                        size={"2x"}
                        title="Open settings."
                    ></FontAwesomeIcon>
                </div>

                <div className={`${styles.buttonLines} ${styles.bottomLine}`}>
                    <FontAwesomeIcon
                        icon={faCircleDot}
                        size={"4x"}
                        ref={capturePhotoButton}
                        id="takePhotoButton"
                    ></FontAwesomeIcon>
                </div>
            </main>
        </>
    );
}

export default TakePhoto;
