var imageCapture: ImageCapture,
    stream: MediaStream,
    constraints = {
        audio: false,
        video: {
            width: { min: 240, ideal: 9999, max: 9999 },
            height: { min: 144, ideal: 9999, max: 9999 },
        },
    };

/**
 * @description Captures user's camera and displays output in a video element
 * @param videotrackIndex
 * @param videoElement
 * @param capturePhotoButton
 */
export function capture(
    videotrackIndex: number,
    videoElement: HTMLVideoElement | null,
    capturePhotoButton: SVGSVGElement | null
): void {
    if (videotrackIndex === null || videotrackIndex === undefined) {
        videotrackIndex = 0;
    }

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
            var video: HTMLVideoElement | null = videoElement;
            stream = mediaStream;

            if (video !== null) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    if (video !== null) {
                        video.play();
                    } else {
                        throw new Error("Video element does not exist");
                    }
                };
            } else {
                throw new Error("Video element does not exist");
            }
            const track = stream.getVideoTracks()[videotrackIndex];
            imageCapture = new ImageCapture(track);
            if (!imageCapture) {
                console.log(
                    "This feature (ImageCapture) is not supported on your device or browser."
                );
            }

            //add event listener at runtime in order to have a reference of ImageCapture
            var takePhotoButton = capturePhotoButton;
            if (takePhotoButton !== null) {
                takePhotoButton.addEventListener("click", () => {
                    takePhotoAction(
                        imageCapture,
                        stream.getVideoTracks()[videotrackIndex]
                    );
                });
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
    imageCapture: ImageCapture,
    streamTrack: MediaStreamTrack
) {
    imageCapture
        .takePhoto()
        .then((blob: any) => {
            createImageBitmap(blob).then((imgBitmap) => {
                var canvas: HTMLCanvasElement = document.getElementById(
                    "canvas"
                ) as HTMLCanvasElement;
                if (canvas !== null) {
                    canvas.width = imgBitmap.width;
                    canvas.height = imgBitmap.height;
                    let ratio = Math.min(
                        canvas.width / imgBitmap.width,
                        canvas.height / imgBitmap.height
                    );
                    let x = (canvas.width - imgBitmap.width * ratio) / 2;
                    let y = (canvas.height - imgBitmap.height * ratio) / 2;
                    if (canvas === null) {
                        return;
                    }
                    //@ts-ignore: Object is possibly "null"
                    canvas!
                        .getContext("2d")
                        .clearRect(0, 0, canvas.width, canvas.height);
                    //@ts-ignore: Object is possibly "null"
                    canvas!
                        .getContext("2d")
                        .drawImage(
                            imgBitmap,
                            0,
                            0,
                            imgBitmap.width,
                            imgBitmap.height,
                            x,
                            y,
                            imgBitmap.width * ratio,
                            imgBitmap.height * ratio
                        );
                    scaleCanvas(canvas);
                    var main = document.getElementById("mainCamera");
                    var canvas = document.getElementById(
                        "resultContainer"
                    ) as HTMLCanvasElement;
                    if (main !== null && canvas !== null) {
                        main.style.display = "none";
                        canvas.style.display = "block";
                    }
                    streamTrack.stop();
                }
            });
        })
        .catch((error: Error) => console.error("takePhoto() error:", error));
}

export function switchCamera() {
    stream.getVideoTracks()[0].applyConstraints(constraints.video);

    navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach((device) => {
            if (device.kind === "videoinput") {
                console.log(
                    `${device.kind}  ${device.deviceId}  ${device.groupId}  ${device.label}`
                );
            }
        });
    });
}

export function scaleCanvas(canvasElement: HTMLCanvasElement): void {
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
