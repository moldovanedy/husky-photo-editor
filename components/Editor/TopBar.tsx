import React from "react";
import { RootState } from "./../../src/redux/global.store";

import styles from "./TopBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openMainMenu } from "../../src/redux/userInterface.redux";
import { MainMenuMobile } from "./Menu/MainMenuMobile";
import { MainMenuDesktop } from "./Menu/MainMenuDesktop";

import MenuIcon from "@mui/icons-material/Menu";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import { IconButton } from "@mui/material";
import { deactivateToolOptions } from "../../src/redux/toolOptions.redux";

function TopBar(props: { i18n: any }) {
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
                <MainMenuMobile i18n={props.i18n} show={mainMenuOpen} />
            ) : (
                <MainMenuDesktop i18n={props.i18n} />
            )}

            <div>
                {windowWidth <= 768 ? (
                    <IconButton
                        onClick={() => {
                            dispatch(openMainMenu());
                            dispatch(deactivateToolOptions());
                        }}
                        size="small"
                    >
                        <MenuIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "40px" }}
                        />
                    </IconButton>
                ) : null}

                {/* <IconButton size="small">
                    <UndoIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "40px" }}
                    />
                </IconButton> */}

                {/* <IconButton size="small">
                    <RedoIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "40px" }}
                    />
                </IconButton> */}
            </div>

            <div>
                {/* <IconButton size="small">
                    <InfoIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "40px" }}
                    />
                </IconButton> */}

                {/* <IconButton size="small">
                    <HelpIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "40px" }}
                    />
                </IconButton> */}
            </div>
        </div>
    );
}

export default TopBar;
