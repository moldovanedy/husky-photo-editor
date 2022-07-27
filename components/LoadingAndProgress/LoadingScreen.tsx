import React, { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import SpinningLogo from "./SpinningLogo";

function LoadingScreen() {
    let [show, setShow] = useState(false);

    const handleRouteStart = () => {
        NProgress.start();
        setShow(true);
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
