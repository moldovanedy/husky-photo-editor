import { store } from "../redux/global.store";
import { zoomProject } from "../zoomProject";

let eventCache: PointerEvent[] = [],
    previousDiff = -1;

/**
 * Enables pan and pinch-zoom functionality on a project
 * @param mainElement The element on which to apply the navigation functionality
 * @param isInNavigationMode If this is true, all functionality is enabled, if it is false, only the zoom with Ctrl + mouse wheel and middle mouse button navigation will work (so no navigation on mobile is this is false)
 */
export function navigateInProject(
    mainElement: HTMLElement,
    isInNavigationMode: boolean
): void {
    //remove event listeners
    if (mainElement !== null && !isInNavigationMode) {
        mainElement.onmousedown = () => {};
        mainElement.onpointerdown = () => {};
        mainElement.onpointerup = () => {};
        mainElement.onpointermove = () => {};
        // mainElement.click();
        return;
    }

    if (mainElement !== null) {
        let isPressing = false,
            firstX = 0,
            firstY = 0,
            offsetX = 0,
            offsetY = 0,
            isMiddleMouseButon = false;

        let ctrlPressed = false,
            shiftPressed = false;

        window.onkeydown = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                ctrlPressed = true;
            }
            if (e.shiftKey) {
                shiftPressed = true;
            }
        };

        window.onkeyup = (e: KeyboardEvent) => {
            if (e.key === "Control") {
                ctrlPressed = false;
            }
            if (e.key === "Shift") {
                shiftPressed = false;
            }
        };

        mainElement.onwheel = (e: WheelEvent) => {
            let zoomFactor = store.getState().userInterface.zoomFactor,
                nextScale = 1;

            if (e.deltaY > 0) {
                if (shiftPressed) {
                    nextScale = zoomFactor - 0.01;
                } else {
                    nextScale = zoomFactor - zoomFactor * 0.06;
                }
            } else {
                if (shiftPressed) {
                    nextScale = zoomFactor + 0.01;
                } else {
                    nextScale = zoomFactor + zoomFactor * 0.06;
                }
            }

            if (ctrlPressed) {
                e.preventDefault();
                zoomProject(
                    store.getState().userInterface.activeProject,
                    nextScale,
                    2
                );
            }
        };

        //the cursor changes only sometimes, why...
        mainElement.onmousedown = (e: MouseEvent) => {
            if (e.button === 1) {
                isMiddleMouseButon = true;
            }

            setTimeout(() => {
                mainElement.style.cursor = "move";
            }, 5);
        };

        mainElement.onmouseup = () => {
            setTimeout(() => {
                mainElement.style.cursor = "default";
            }, 5);
        };

        mainElement.onpointerdown = (e: PointerEvent) => {
            isPressing = true;
            eventCache.push(e);
            //@ts-ignore
            let scrollX = mainElement.scrollLeft,
                //@ts-ignore
                scrollY = mainElement.scrollTop;

            if (scrollX !== null && scrollY !== null) {
                offsetX = e.clientX;
                offsetY = e.clientY;
                firstX = scrollX;
                firstY = scrollY;
            } else {
                offsetX = e.clientX;
                offsetY = e.clientY;
                firstX = 0;
                firstY = 0;
            }
        };

        mainElement.onpointerup = (e: PointerEvent) => {
            isPressing = false;
            removeEvent(e);
            if (eventCache.length < 2) {
                previousDiff = -1;
            }
        };

        mainElement.onpointermove = (e: PointerEvent) => {
            if (isPressing && !isMiddleMouseButon) {
                mainElement.style.cursor = "move";
                for (let i = 0; i < eventCache.length; i++) {
                    if (e.pointerId === eventCache[i].pointerId) {
                        eventCache[i] = e;
                        break;
                    }
                }

                // for two-finger zoom (pinch zoom)
                if (eventCache.length === 2) {
                    // Calculate the distance between the two pointers
                    const curDiff = Math.sqrt(
                            Math.pow(
                                eventCache[0].clientX - eventCache[1].clientX,
                                2
                            ) +
                                Math.pow(
                                    eventCache[0].clientY -
                                        eventCache[1].clientY,
                                    2
                                )
                        ),
                        zoomFactor = store.getState().userInterface.zoomFactor;

                    if (previousDiff > 0) {
                        if (curDiff > previousDiff) {
                            // The distance between the two pointers has increased
                            let nextScale = zoomFactor + zoomFactor * 0.03;
                            zoomProject(
                                store.getState().userInterface.activeProject,
                                nextScale,
                                2
                            );
                        }
                        if (curDiff < previousDiff) {
                            // The distance between the two pointers has decreased
                            let nextScale = zoomFactor - zoomFactor * 0.03;
                            zoomProject(
                                store.getState().userInterface.activeProject,
                                nextScale,
                                2
                            );
                        }
                    }

                    // Cache the distance for the next move event
                    previousDiff = curDiff;
                } else {
                    //@ts-ignore
                    mainElement.scroll(
                        -(e.clientX - offsetX) + firstX,
                        -(e.clientY - offsetY) + firstY
                    );
                }
            }
        };
    }
}

/**
 * Removes the event from the target's cache
 * @param e The pointer event to be removed
 */
function removeEvent(e: PointerEvent) {
    for (let i = 0; i < eventCache.length; i++) {
        if (eventCache[i].pointerId === e.pointerId) {
            eventCache.splice(i, 1);
            break;
        }
    }
}
