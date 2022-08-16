import { store } from "./redux/global.store";
import { setZoomFactor } from "./redux/userInterface.redux";
import { getTransformValuesOfElement } from "./utils/transform/transformUtility";

export function zoomProject(
    projectId: string,
    zoomFactor: number,
    layerCount?: number
) {
    let numberOfLayers = 10000;
    if (layerCount !== undefined) {
        numberOfLayers = layerCount;
    }

    for (let i = 1; i <= numberOfLayers; i++) {
        let canvas = document.getElementById(`${projectId}_${i}`);
        if (canvas !== null) {
            canvas.style.imageRendering = "pixelated"; //make sure this is pixelated so as to display pixels
            canvas.style.transform = `scale(${zoomFactor})`; //canvas shouldn't have any other transform properties, so we won't use the custom functions for keeping original transform
        }
    }

    store.dispatch(setZoomFactor(zoomFactor));
}

export function zoomProjectByPercent(
    projectId: string,
    percent: number,
    layerCount?: number
) {
    let zoomFactor = 1;
    let canvas = document.getElementById(`${projectId}_1`), // all canvas elements should have the same scale, so the first layer is enough
        currentScale = 1;
    if (canvas !== null) {
        let transformObject = getTransformValuesOfElement(
            canvas.style.transform
        );
        if (transformObject !== null) {
            //@ts-ignore
            if (transformObject.scale !== undefined) {
                //@ts-ignore
                currentScale = parseFloat(transformObject.scale);
                zoomFactor = currentScale + percent;
            } else {
                zoomFactor += percent;
            }
        } else {
            zoomFactor += percent;
        }
    }

    zoomProject(projectId, zoomFactor, layerCount);
}
