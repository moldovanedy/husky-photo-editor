/**
 * Converts a file to an ImageData object
 * @param file The file that needs to be converted
 * @returns A Promise which resolves to the created ImageData object or null if the operation fails
 */
export function fileToImageData(file: File): Promise<ImageData> | null {
    try {
        //@ts-ignore Object is possibly "null"
        let url = URL.createObjectURL(file);
        let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = url;
            //@ts-ignore
        }).then((img: HTMLImageElement) => {
            img.src = url;
            canvas.width = img.width;
            canvas.height = img.height;
            //@ts-ignore Object is possibly "null"
            canvas.getContext("2d").drawImage(img, 0, 0);
            //@ts-ignore Object is possibly "null"
            let imgData = ctx.getImageData(0, 0, img.width, img.height);
            URL.revokeObjectURL(url); // in order to free memory
            return imgData;
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}
