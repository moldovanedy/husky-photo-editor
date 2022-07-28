import React from "react";
import {
    faBars,
    faInfoCircle,
    faQuestionCircle,
    faRotateLeft,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./TopBar.module.scss";

function TopBar() {
    return (
        <div className={styles.main}>
            <div>
                <FontAwesomeIcon icon={faBars} size={"2x"} />
                <FontAwesomeIcon icon={faRotateLeft} size={"2x"} />
                <FontAwesomeIcon icon={faRotateRight} size={"2x"} />
            </div>

            <div>
                <FontAwesomeIcon icon={faInfoCircle} size={"2x"} />
                <FontAwesomeIcon icon={faQuestionCircle} size={"2x"} />
            </div>
        </div>
    );
}

export default TopBar;
