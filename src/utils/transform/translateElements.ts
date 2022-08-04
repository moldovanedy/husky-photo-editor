import {
    getTransformValuesOfElement,
    convertTransformObjectToString
} from "./transformUtility";

export enum MeasuringSystem {
    Relative,
    Absolute
}

/**
 * Moves (translates) the element to the new x and y
 * @param element The element on which the transform property will be applied
 * @param x Number of pixels to move on x axis
 * @param y Number of pixels to move on y axis
 * @param system Absolute
 */
export function translate(
    element: HTMLElement,
    x: number,
    y: number,
    system: MeasuringSystem.Absolute
): void;

/**
 * Moves (translates) the element by an x and y amount
 * @param x Number of pixels to move on x axis
 * @param y Number of pixels to move on y axis
 * @param system Relative
 */
export function translate(
    element: HTMLElement,
    x: number,
    y: number,
    system: MeasuringSystem.Relative
): void;

export function translate(
    element: HTMLElement,
    x: number,
    y: number,
    system: MeasuringSystem
): void {
    let initialTransform = element.style.transform,
        transformObject = getTransformValuesOfElement(initialTransform),
        previousTransformString = convertTransformObjectToString(
            transformObject,
            ["translate"]
        );
    if (previousTransformString !== undefined) {
        element.style.transform =
            `translate(${x}px, ${y}px)` + previousTransformString;
    } else {
        element.style.transform = `translate(${x}px, ${y}px)`;
    }
}
