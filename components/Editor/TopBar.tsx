import React from "react";
import type { RootState } from "./../../src/redux/global.store";

import styles from "./TopBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openMainMenu } from "../../src/redux/userInterface.redux";
import { MainMenuMobile } from "./Menu/MainMenuMobile";
import { MainMenuDesktop } from "./Menu/MainMenuDesktop";

import MenuIcon from "@mui/icons-material/Menu";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
                    <MenuIcon
                        sx={{ fontSize: "40px" }}
                        onClick={() => {
                            dispatch(openMainMenu());
                        }}
                    />
                ) : null}
                <UndoIcon sx={{ fontSize: "40px" }} />
                <RedoIcon sx={{ fontSize: "40px" }} />
            </div>

            <div>
                <InfoIcon sx={{ fontSize: "40px" }} />
                <HelpOutlineIcon sx={{ fontSize: "40px" }} />
            </div>
        </div>
    );
}

export default TopBar;
