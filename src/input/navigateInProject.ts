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
        };

        mainElement.onpointermove = (e: PointerEvent) => {
            if (isPressing && !isMiddleMouseButon) {
                //@ts-ignore
                mainElement.scroll(
                    -(e.clientX - offsetX) + firstX,
                    -(e.clientY - offsetY) + firstY
                );
            }
        };
    }
}
