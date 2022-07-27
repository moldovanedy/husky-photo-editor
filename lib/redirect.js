/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";
import languageDetector from "./languageDetector";

export const useRedirect = (to) => {
    const router = useRouter(),
        supportedLanguages = ["en", "ro"];
    to = to || router.asPath;

    // language detection
    useEffect(() => {
        const detectedLng = languageDetector.detect();
        if (to.startsWith("/" + detectedLng) && router.route === "/404") {
            // prevent endless loop
            router.replace("/" + detectedLng + router.route);
            return;
        }

        const preferredLang = localStorage.getItem("language");

        // if language is not set, it is unsupported or it is invalid...
        if (
            preferredLang === null ||
            !supportedLanguages.includes(preferredLang)
        ) {
            localStorage.setItem("language", detectedLng);
            preferredLang = detectedLng;
        }

        if (to.startsWith("/" + preferredLang)) {
            router.replace(to);
            return;
        }

        for (let i = 0; i < supportedLanguages.length; i++) {
            if (to.startsWith("/" + supportedLanguages[i])) {
                router.replace("/" + to);
                break;
            }
        }

        languageDetector.cache(detectedLng);
        router.replace("/" + preferredLang + to);
    }, []);

    return <></>;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to) => () => {
    useRedirect(to);
    return <></>;
};
