let image: any;

export function moveLayer(canvas: HTMLCanvasElement, x: number, y: number) {
    if (image === undefined) {
        image = new Image();
        image.src = canvas.toDataURL();
    }

    let ctx = canvas.getContext("2d");
    if (ctx !== null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x, y);
    }
}
