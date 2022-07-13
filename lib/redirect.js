/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";
import languageDetector from "./languageDetector";

export const useRedirect = (to) => {
    const router = useRouter();
    to = to || router.asPath;

    // language detection
    useEffect(() => {
        const detectedLng = languageDetector.detect();
        if (to.startsWith("/" + detectedLng) && router.route === "/404") {
            // prevent endless loop
            router.replace("/" + detectedLng + router.route);
            alert("In if statement");
            return;
        }

        if (to.startsWith("/ro") || to.startsWith("/en")) {
            return;
        }

        alert("Outside if statement " + detectedLng);
        languageDetector.cache(detectedLng);
        router.replace("/" + detectedLng + to);
        alert("After all");
    }, []);

    return <></>;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to) => () => {
    useRedirect(to);
    return <></>;
};
