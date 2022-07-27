/* eslint-disable @next/next/no-img-element */
import React from "react";

import styles from "./ProgressStyle.module.scss";

function SpinningLogo({ fullScreen, normalLogoSize, maxLogoSizePx, show }) {
    if (normalLogoSize === null || normalLogoSize === undefined) {
        normalLogoSize = 10;
    }
    return (
        <div
            className={`centerAlign ${
                fullScreen ? styles.fullScreenContainer : styles.simpleContainer
            }
                ${show ? styles.active : styles.inactive}
            `}
        >
            <img
                style={{
                    width: `${normalLogoSize}%`,
                    maxWidth: `${maxLogoSizePx}px`,
                }}
                src="/assets/logo/logo.svg"
                alt="Husky Logo"
                className={styles.logo}
            />
        </div>
    );
}

export default SpinningLogo;
