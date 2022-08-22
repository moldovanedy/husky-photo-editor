import { store } from "../redux/global.store";
import { setZoomFactor } from "../redux/userInterface.redux";
import { zoomProject } from "../zoomProject";

let eventCache: PointerEvent[] = [],
    previousDiff = -1;

export function navigateInProject(
    mainElement: HTMLElement,
    isInNavigationMode: boolean
) {
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

        mainElement.onmousedown = (e: MouseEvent) => {
            if (e.button === 1) {
                isMiddleMouseButon = true;
            }
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
            mainElement.style.cursor = "grabbing";
        };

        mainElement.onpointerup = (e: PointerEvent) => {
            isPressing = false;
            removeEvent(e);
            if (eventCache.length < 2) {
                previousDiff = -1;
            }
            mainElement.style.cursor = "grab";
        };

        mainElement.onpointermove = (e: PointerEvent) => {
            if (isPressing && !isMiddleMouseButon) {
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
                            store.dispatch(setZoomFactor(nextScale));
                        }
                        if (curDiff < previousDiff) {
                            // The distance between the two pointers has decreased
                            let nextScale = zoomFactor - zoomFactor * 0.03;
                            zoomProject(
                                store.getState().userInterface.activeProject,
                                nextScale,
                                2
                            );
                            store.dispatch(setZoomFactor(nextScale));
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

function removeEvent(e: PointerEvent) {
    // Remove this event from the target's cache
    for (let i = 0; i < eventCache.length; i++) {
        if (eventCache[i].pointerId === e.pointerId) {
            eventCache.splice(i, 1);
            break;
        }
    }
}
