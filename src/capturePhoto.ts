import { State } from "./GlobalSpecialState";

import { store } from "./redux/global.store";
import { createMessage, MessageType } from "./redux/messages.redux";

/**
 * Captures user's camera and displays output in a video element
 * @param videotrackIndex Usually 0
 * @param videoElement The video element that will hold user's camera output
 * @param capturePhotoButton The element that, when pressed, will render current frame on a canvas
 * @param canvasReference The canvas that will be filled with the current frame
 * @param changeCameraButton Optional element that will change the camera's facing mode
 */
export function capture(
    videotrackIndex: number,
    videoElement: HTMLVideoElement,
    capturePhotoButton: SVGSVGElement | HTMLElement,
    canvasReference: HTMLCanvasElement,
    changeCameraButton: SVGSVGElement | null
): void {
    let i18n = State.getObject("translationContext");

    if (videotrackIndex === null || videotrackIndex === undefined) {
        videotrackIndex = 0;
    }

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                width: { min: 240, ideal: 9999, max: 9999 },
                height: { min: 144, ideal: 9999, max: 9999 },
                frameRate: { min: 1, ideal: 30, max: 9999 },
                facingMode: {
                    ideal:
                        localStorage.getItem("isFrontCamera") === "true"
                            ? "user"
                            : "environment"
                }
            }
        })
        .then((mediaStream) => {
            var video: HTMLVideoElement = videoElement;

            State.addObject(
                "stream",
                mediaStream.getVideoTracks()[videotrackIndex]
            );

            if (video !== null) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    if (video !== null) {
                        video.play();
                        if (
                            mediaStream
                                .getVideoTracks()
                                [videotrackIndex].getCapabilities().height !==
                                undefined &&
                            mediaStream
                                .getVideoTracks()
                                [videotrackIndex].getCapabilities().width !==
                                undefined
                        ) {
                            // @ts-ignore Object is possibly 'undefined'
                            video.width = mediaStream
                                .getVideoTracks()
                                [videotrackIndex].getCapabilities().width.max;
                            // @ts-ignore Object is possibly 'undefined'
                            video.height = mediaStream
                                .getVideoTracks()
                                [videotrackIndex].getCapabilities().height.max;
                        }
                    } else {
                        store.dispatch(
                            createMessage({
                                message: i18n("messages:errors.unknownError"),
                                type: MessageType.Error
                            })
                        );
                    }
                };
                //add event listener at runtime
                var takePhotoButton = capturePhotoButton;
                if (takePhotoButton !== null) {
                    takePhotoButton.addEventListener("click", () => {
                        takePhotoAction(
                            video,
                            canvasReference,
                            mediaStream.getVideoTracks()[videotrackIndex]
                        );
                    });
                }

                if (changeCameraButton !== null) {
                    changeCameraButton.addEventListener("click", () => {
                        switchCameraFacingMode();
                    });
                }
            } else {
                store.dispatch(
                    createMessage({
                        message: i18n("messages:errors.unknownError"),
                        type: MessageType.Error
                    })
                );
            }
        })
        .catch(function (err) {
            switch (err.name) {
                case "NotAllowedError":
                    store.dispatch(
                        createMessage({
                            message: i18n("messages:errors.cameraAccessDenied"),
                            type: MessageType.Error
                        })
                    );
                    break;
                case "NotReadableError":
                    store.dispatch(
                        createMessage({
                            message: i18n(
                                "messages:errors.unknownHardwareError"
                            ),
                            type: MessageType.Error
                        })
                    );
                    break;
                case "NotFoundError":
                    store.dispatch(
                        createMessage({
                            message: i18n("messages:errors.cameraNotFound"),
                            type: MessageType.Error
                        })
                    );
                    break;
                default:
                    store.dispatch(
                        createMessage({
                            message: i18n("messages:errors.unknownError"),
                            type: MessageType.Error
                        })
                    );
                    break;
            }
        });
}

/**
 * Captures a photo from video element, draws it on canvas and stops the video stream
 * @param videoElement The video element from which to take photo
 * @param canvasReference The canvas on which to draw the resulting image
 * @param streamTrack The stream which provided the video element the actual image taken from the user's camera
 */
export function takePhotoAction(
    videoElement: HTMLVideoElement,
    canvasReference: HTMLCanvasElement,
    streamTrack: MediaStreamTrack
) {
    let i18n = State.getObject("translationContext");

    if (
        streamTrack.getSettings().width !== undefined &&
        streamTrack.getSettings().height
    ) {
        // @ts-ignore
        canvasReference.width = streamTrack.getSettings().width;
        // @ts-ignore
        canvasReference.height = streamTrack.getSettings().height;
    } else {
        store.dispatch(
            createMessage({
                message: i18n("messages:errors.unknownError"),
                type: MessageType.Error
            })
        );
    }

    let ctx = canvasReference.getContext("2d");
    if (ctx !== null) {
        ctx.drawImage(
            videoElement,
            0,
            0,
            canvasReference.width,
            canvasReference.height
        );
    }

    streamTrack.stop();
    State.deleteObject("stream");
}

/**
 * Switches the camera facing mode (front/rear)
 */
export function switchCameraFacingMode(): void {
    let localData = localStorage.getItem("isFrontCamera");
    if (localData === null) {
        localStorage.setItem("isFrontCamera", "false");
    } else {
        if (localData === "true") {
            localStorage.setItem("isFrontCamera", "false");
        } else {
            localStorage.setItem("isFrontCamera", "true");
        }
    }

    //maybe reloading document is better
    setTimeout(() => {
        document.location.reload();
    }, 500);
}

/**
 * Tries to scale the canvas to fit the screen
 * @param canvasElement The canvas element that needs to be scaled
 */
export function scaleCanvas(canvasElement: HTMLCanvasElement | null): void {
    var canvas: HTMLCanvasElement | null = canvasElement;
    if (canvas === null) {
        return;
    }

    //take window width and height a little smaller so as to create the illusion of padding around the canvas
    var canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        windowWidth = window.innerWidth - 30,
        windowHeight = window.innerHeight - 30,
        scaleFactor = 1,
        marginDivisionFactor = 4;

    if (canvasWidth >= canvasHeight) {
        scaleFactor = windowWidth / canvasWidth;
    } else {
        scaleFactor = windowHeight / canvasHeight;
    }

    var canvasScaledWidth = canvasWidth * scaleFactor,
        canvasScaledHeight = canvasHeight * scaleFactor;

    canvas.style.transform = `scale(${scaleFactor}, ${scaleFactor})`;

    if (windowWidth >= 1800) {
        marginDivisionFactor = 2; //on large screens will prevent top content from being lost
    }
    canvas.style.marginLeft = -(canvasWidth - canvasScaledWidth) / 2 + 5 + "px"; //5px margin to left
    canvas.style.marginRight = -(canvasWidth - canvasScaledWidth) / 2 + "px";
    canvas.style.marginTop =
        -(canvasHeight - canvasScaledHeight) / marginDivisionFactor + 5 + "px";
    canvas.style.marginBottom = -(canvasHeight - canvasScaledHeight) / 2 + "px";
}
