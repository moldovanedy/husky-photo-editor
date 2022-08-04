import {
    faRotateLeft,
    faRotateRight,
    faBars,
    faQuestionCircle,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import type { RootState } from "./../../src/redux/global.store";

import styles from "./TopBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openMainMenu } from "../../src/redux/userInterface.redux";
import { MainMenuDesktop, MainMenuMobile } from "./MainMenu";

function TopBar() {
    const dispatch = useDispatch();
    let mainMenuOpen = useSelector(
            (state: RootState) => state.userInterface.mainMenuOpen
        ),
        windowWidth = useSelector(
            (state: RootState) => state.environmentInfo.windowWidth
        );

    return (
        <div
            className={styles.main}
            style={{ marginTop: windowWidth <= 768 ? "0px" : "20px" }}
        >
            {windowWidth <= 768 ? (
                <MainMenuMobile show={mainMenuOpen} />
            ) : (
                <MainMenuDesktop />
            )}

            <div>
                {windowWidth <= 768 ? (
                    <FontAwesomeIcon
                        icon={faBars}
                        size="2x"
                        onClick={() => {
                            dispatch(openMainMenu());
                        }}
                    />
                ) : null}
                <FontAwesomeIcon icon={faRotateLeft} size="2x" />
                <FontAwesomeIcon icon={faRotateRight} size="2x" />
            </div>

            <div>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
            </div>
        </div>
    );
}

export default TopBar;
