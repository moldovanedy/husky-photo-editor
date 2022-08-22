import React from "react";
import { RootState, store } from "./../../src/redux/global.store";

import styles from "./TopBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    enterNavigationMode,
    exitNavigationMode,
    openMainMenu
} from "../../src/redux/userInterface.redux";
import { MainMenuMobile } from "./Menu/MainMenuMobile";
import { MainMenuDesktop } from "./Menu/MainMenuDesktop";
import { zoomProjectByPercent } from "../../src/zoomProject";

import MenuIcon from "@mui/icons-material/Menu";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import PanToolIcon from "@mui/icons-material/PanTool";
import { IconButton } from "@mui/material";

function TopBar() {
    const dispatch = useDispatch();
    let mainMenuOpen = useSelector(
            (state: RootState) => state.userInterface.mainMenuOpen
        ),
        windowWidth = useSelector(
            (state: RootState) => state.environmentInfo.windowWidth
        ),
        zoomFactor = useSelector(
            (state: RootState) => state.userInterface.zoomFactor
        ),
        activeProject = useSelector(
            (state: RootState) => state.userInterface.activeProject
        ),
        isInNavigationMode = useSelector(
            (state: RootState) => state.userInterface.isInNavigationMode
        );

    const navButtonStyle = {
        backgroundColor: isInNavigationMode ? "#1976d2" : "none",
        fontSize: "40px"
    } as const;

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
                    <IconButton
                        onClick={() => {
                            dispatch(openMainMenu());
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

                {windowWidth > 768 ? (
                    <>
                        <IconButton
                            onClick={() => {
                                if (zoomFactor < 0.1) {
                                    zoomProjectByPercent(activeProject, 0.02);
                                } else if (zoomFactor < 0.5) {
                                    zoomProjectByPercent(activeProject, 0.1);
                                } else {
                                    zoomProjectByPercent(activeProject, 0.5);
                                }
                            }}
                            size="small"
                        >
                            <ZoomInIcon
                                className="themeDependentIcon"
                                sx={{ fontSize: "40px" }}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() => {
                                if (zoomFactor > 0.5) {
                                    zoomProjectByPercent(activeProject, -0.5);
                                } else if (zoomFactor > 0.1) {
                                    zoomProjectByPercent(activeProject, -0.1);
                                } else if (zoomFactor > 0.02) {
                                    zoomProjectByPercent(activeProject, -0.02);
                                }
                            }}
                            size="small"
                        >
                            <ZoomOutIcon
                                className="themeDependentIcon"
                                sx={{ fontSize: "40px" }}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() => {
                                if (isInNavigationMode) {
                                    store.dispatch(exitNavigationMode());
                                } else {
                                    store.dispatch(enterNavigationMode());
                                }
                            }}
                            sx={navButtonStyle}
                            size="small"
                        >
                            <PanToolIcon
                                sx={{ fontSize: "40px" }}
                                className="themeDependentIcon"
                            />
                        </IconButton>
                    </>
                ) : null}
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
