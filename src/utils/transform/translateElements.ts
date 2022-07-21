import { getTransformValuesOfElement } from "./transformUtility";

/**
 * Moves (translates) the element by an x and y amount (x - horizontal, y - vertical)
 * @param element The element on which the transform property will be applied
 * @param x Number of pixels to move on x axis
 * @param y Number of pixels to move on y axis
 */
export function translate(
    element: HTMLElement,
    x: number | undefined = 0,
    y: number | undefined = 0
): void {
    let initialTransform = element.style.transform;
    console.log(getTransformValuesOfElement(initialTransform));
}
