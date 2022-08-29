import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

let unsupportedFeatures: string[] = [],
    features = "";

function CompatibilityCheck() {
    let [featuresString, setFeaturesString] = useState("");

    useEffect(() => {
        if (!("ImageBitmap" in window)) {
            unsupportedFeatures.push("ImageBitmap");
        }
        if (!("localStorage" in window)) {
            unsupportedFeatures.push("localStorage");
        }
        if (!("indexedDB" in window)) {
            unsupportedFeatures.push("indexedDB");
        }
        if (!("CanvasRenderingContext2D" in window)) {
            unsupportedFeatures.push("CanvasRenderingContext2D");
        }

        unsupportedFeatures.forEach((feature, index) => {
            if (index !== unsupportedFeatures.length - 1) {
                features += `${feature}, `;
            } else {
                features += `${feature}`;
            }
        });
        setFeaturesString(features);
    }, []);

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={featuresString.length >= 1 ? true : false}
                onClose={() => {
                    setFeaturesString("");
                }}
                autoHideDuration={15000}
            >
                <Alert
                    severity={"warning"}
                    sx={{ width: "100%" }}
                    onClose={() => {
                        setFeaturesString("");
                    }}
                >
                    {`The following features are not supported by your browser: ${featuresString}. Some app features might not work properly. Please upgrade your browser or use a different browser.`}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CompatibilityCheck;
