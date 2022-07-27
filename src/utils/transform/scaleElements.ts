import {
    getTransformValuesOfElement,
    convertTransformObjectToString,
} from "./transformUtility";

export enum MeasuringSystem {
    Relative,
    Absolute,
}

/**
 * Scales the element to the new x and y
 * @param element The element on which the transform property will be applied
 * @param x Number of pixels to move on x axis
 * @param y Number of pixels to move on y axis
 * @param system Absolute
 */
export function scale(
    element: HTMLElement,
    x: number,
    y?: number,
    system?: MeasuringSystem.Absolute
): void;

/**
 * Scales the element by an x and y amount
 * @param x Number of pixels to move on x axis
 * @param y Number of pixels to move on y axis
 * @param system Relative
 */
export function scale(
    element: HTMLElement,
    x: number,
    y?: number,
    system?: MeasuringSystem.Relative
): void;

export function scale(
    element: HTMLElement,
    x: number,
    y?: number,
    system?: MeasuringSystem
): void {
    let initialTransform = element.style.transform,
        transformObject = getTransformValuesOfElement(initialTransform),
        previousTransformString = convertTransformObjectToString(
            transformObject,
            ["scale"]
        );
    if (previousTransformString !== undefined) {
        if (y !== undefined) {
            element.style.transform =
                previousTransformString + `scale(${x}, ${y})`;
        } else {
            element.style.transform = previousTransformString + `scale(${x})`;
        }
    } else {
        if (y !== undefined) {
            element.style.transform = `scale(${x}, ${y})`;
        } else {
            element.style.transform = `scale(${x})`;
        }
    }
}
