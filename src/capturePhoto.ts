let stream: MediaStream;

/**
 * @description Captures user's camera and displays output in a video element
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
    changeCameraButton: HTMLElement | null
): void {
    if (videotrackIndex === null || videotrackIndex === undefined) {
        videotrackIndex = 0;
    }

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                width: { min: 240, ideal: 9999, max: 9999 },
                height: { min: 144, ideal: 9999, max: 9999 },
                facingMode: {
                    ideal:
                        localStorage.getItem("isFrontCamera") === "true"
                            ? "user"
                            : "environment",
                },
            },
        })
        .then((mediaStream) => {
            var video: HTMLVideoElement = videoElement;
            stream = mediaStream;

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
                        throw new Error("Video element does not exist");
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
                        switchCameraFacingMode(
                            videotrackIndex,
                            videoElement,
                            capturePhotoButton,
                            canvasReference,
                            changeCameraButton
                        );
                    });
                }
            } else {
                throw new Error("Take photo element does not exist");
            }
        })
        .catch(function (err) {
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
        });
}

export function takePhotoAction(
    videoElement: HTMLVideoElement,
    canvasReference: HTMLCanvasElement,
    streamTrack: MediaStreamTrack
) {
    if (
        streamTrack.getSettings().width !== undefined &&
        streamTrack.getSettings().height
    ) {
        // @ts-ignore
        canvasReference.width = streamTrack.getSettings().width;
        // @ts-ignore
        canvasReference.height = streamTrack.getSettings().height;
    } else {
        alert("Not supported");
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
}

export function getAvailableCameras(): string[] {
    let devicesList: string[] = [];
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach((device) => {
            if (device.kind === "videoinput") {
                devicesList.push(device.label);
            }
        });
    });
    return devicesList;
}

/**
 * @description Switches the camera facing mode (front/rear) and accepts the same parameters that capture function accepts
 * @param videotrackIndex Usually 0
 * @param videoElement The video element that will hold user's camera output
 * @param capturePhotoButton The element that, when pressed, will render current frame on a canvas
 * @param canvasReference The canvas that will be filled with the current frame
 * @param changeCameraButton Optional element that will change the camera's facing mode
 */
export function switchCameraFacingMode(
    videotrackIndex: number,
    videoElement: HTMLVideoElement,
    capturePhotoButton: SVGSVGElement | HTMLElement,
    canvasReference: HTMLCanvasElement,
    changeCameraButton: HTMLElement | null
) {
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
    capture(
        videotrackIndex,
        videoElement,
        capturePhotoButton,
        canvasReference,
        changeCameraButton
    );
}

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

    canvas.style.transform = `scale(${scaleFactor})`;

    if (windowWidth >= 1800) {
        marginDivisionFactor = 2; //on large screens will prevent top content from being lost
    }
    canvas.style.marginLeft = -(canvasWidth - canvasScaledWidth) / 2 + 5 + "px"; //5px margin to left
    canvas.style.marginRight = -(canvasWidth - canvasScaledWidth) / 2 + "px";
    canvas.style.marginTop =
        -(canvasHeight - canvasScaledHeight) / marginDivisionFactor + 5 + "px";
    canvas.style.marginBottom = -(canvasHeight - canvasScaledHeight) / 2 + "px";
}
