import React, { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";

import SpinningLogo from "./SpinningLogo";

function LoadingScreen() {
    let [show, setShow] = useState(false);

    const handleRouteStart = () => {
        NProgress.start();
        setShow(true);
        document.body.style.overflow =
            "auto"; /* in order to let user scroll through other pages
            because overflow is hidden after you take a photo;
            because of that, pressing the back button from browser/OS
            will keep overflow hidden, thus making scrolling impossible
            on other pages until reload */
    };
    const handleRouteDone = () => {
        NProgress.done();
        setShow(false);
    };

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return (
        <>
            <SpinningLogo
                fullScreen={true}
                normalLogoSize={60}
                maxLogoSizePx={500}
                show={show}
            />
        </>
    );
}

export default LoadingScreen;
