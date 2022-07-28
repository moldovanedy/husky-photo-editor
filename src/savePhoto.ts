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
    let mimeType: string = "image/png";
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
        throw new ReferenceError("Canvas element is null or undefined");
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
    } catch (e) {}
}
