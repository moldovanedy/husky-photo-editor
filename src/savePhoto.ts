import { State } from "./GlobalSpecialState";
import { store } from "./redux/global.store";
import { createMessage, MessageType } from "./redux/messages.redux";

/**
 * Downloads a photo from a canvas
 * @param quality The quality parameter (1-100) applied to photo (only if file format is JPG or WebP)
 * @param format The file format (PNG, JPG, WebP etc.)
 * @param imageName The name of the stored file
 * @param link The link element to download from
 * @param canvas The canvas element whose visual representation (the photo) is downloaded
 */
export function downloadPhoto(
    quality: number | null,
    format: string | null,
    imageName: string | null,
    link: HTMLAnchorElement,
    canvas: HTMLCanvasElement
): void {
    let mimeType: string = "image/png",
        i18n = State.getObject("translationContext");
    if (quality === null || quality === undefined) {
        quality = 100;
    }

    if (quality > 100) {
        quality = 100;
    }
    if (quality < 1) {
        quality = 1;
    }

    if (format === null || format === undefined) {
        format = "PNG";
    }

    if (imageName === null || imageName === undefined) {
        imageName = "download";
    }

    if (canvas === null || canvas === undefined) {
        store.dispatch(
            createMessage({
                message: i18n("messages:errors.unknownError"),
                type: MessageType.Error
            })
        );
    }

    if (typeof quality !== "number") {
        quality = parseInt(quality);
    }

    switch (format) {
        default:
        case "JPG":
            mimeType = "image/jpeg";
            break;
        case "PNG":
            mimeType = "image/png";
            break;
        case "WEBP":
            mimeType = "image/webp";
    }

    try {
        var base64img = canvas.toDataURL(mimeType, quality / 100);
        link.setAttribute("download", imageName);
        link.setAttribute("href", base64img);
    } catch (e) {
        store.dispatch(
            createMessage({
                message: i18n("messages:errors.unknownError"),
                type: MessageType.Error
            })
        );
    }
}

/**
 * Downloads a photo given an ImageData argument
 * @param imageData The ImageData which will be drawn to the canvas
 * @param quality The quality parameter (1-100) applied to photo (only if file format is JPG or WebP)
 * @param format The file format (PNG, JPG, WebP etc.)
 * @param imageName The name of the stored file
 * @param link The link element to download from
 */
export function downloadPhotoFromImageData(
    imageData: ImageData,
    quality: number | null,
    format: string | null,
    imageName: string | null,
    link: HTMLAnchorElement
) {
    let mimeType: string = "image/png",
        i18n = State.getObject("translationContext");
    if (quality === null || quality === undefined) {
        quality = 100;
    }

    if (quality > 100) {
        quality = 100;
    }
    if (quality < 1) {
        quality = 1;
    }

    if (format === null || format === undefined) {
        format = "PNG";
    }

    if (imageName === null || imageName === undefined) {
        imageName = "download";
    }

    if (imageData === null || imageData === undefined) {
        store.dispatch(
            createMessage({
                message: i18n("messages:errors.unknownError"),
                type: MessageType.Error
            })
        );
    }

    if (typeof quality !== "number") {
        quality = parseInt(quality);
    }

    switch (format) {
        default:
        case "JPG":
            mimeType = "image/jpeg";
            break;
        case "PNG":
            mimeType = "image/png";
            break;
        case "WEBP":
            mimeType = "image/webp";
    }

    try {
        let canvas = document.createElement("canvas");
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        let ctx = canvas.getContext("2d");
        if (ctx !== null) {
            ctx.putImageData(imageData, 0, 0);
            var base64img = canvas.toDataURL(mimeType, quality / 100);
            link.setAttribute("download", imageName);
            link.setAttribute("href", base64img);
        } else {
            throw new Error();
        }
    } catch (e) {
        store.dispatch(
            createMessage({
                message: i18n("messages:errors.unknownError"),
                type: MessageType.Error
            })
        );
    }
}
