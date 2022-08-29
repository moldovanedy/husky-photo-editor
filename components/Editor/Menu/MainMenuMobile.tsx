/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";

import styles from "./MainMenu.module.scss";

import { useDispatch } from "react-redux";
import {
    closeMainMenu,
    openHelpMenu
} from "../../../src/redux/userInterface.redux";
import { store } from "../../../src/redux/global.store";
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SubMenu
} from "react-pro-sidebar";

import { openFiles } from "../../../src/menu/actions";

import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PolicyIcon from "@mui/icons-material/Policy";

import { SaveDialog } from "./Dialogs/FileMenuDialogs";
import { db } from "../../../src/storage/db";

export function MainMenuMobile(props: { show: boolean; i18n: any }) {
    const dispatch = useDispatch();
    let filePicker = useRef<HTMLInputElement>(null);
    let [saveDialogOpen, setSaveDialogOpen] = useState(false);
    let i18n = props.i18n;

    return (
        <>
            {/* dialogs */}
            {saveDialogOpen ? (
                <SaveDialog
                    closeEvent={() => {
                        setSaveDialogOpen(false);
                    }}
                />
            ) : null}

            <div
                className={`${styles.container} ${
                    props.show ? styles.active : styles.inactive
                }`}
            >
                <section
                    className={styles.main}
                    style={
                        props.show
                            ? {
                                  width: store.getState().environmentInfo
                                      .windowWidth
                              }
                            : { width: "0px" }
                    }
                >
                    <ProSidebar width={"100%"}>
                        <SidebarHeader className={styles.sidebarThemeSwitch}>
                            <div
                                style={{ width: "100%" }}
                                className="centerAlign"
                            >
                                <img
                                    src="/assets/logo/logo128x128.png"
                                    height={"80px"}
                                    alt="Husky logo"
                                />
                            </div>
                            <CloseIcon
                                sx={{
                                    fontSize: "60px",
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    zIndex: "8001"
                                }}
                                onClick={() => {
                                    dispatch(closeMainMenu());
                                }}
                            />
                        </SidebarHeader>

                        <SidebarContent className={styles.sidebarThemeSwitch}>
                            <Menu
                                iconShape="square"
                                popperArrow={true}
                                className={styles.sidebarThemeSwitch}
                            >
                                {/* file menu */}
                                <SubMenu
                                    icon={<InsertDriveFileIcon />}
                                    title={i18n("edit:menu.file.fileText")}
                                >
                                    <MenuItem
                                        icon={
                                            <FolderOpenIcon
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        <label
                                            htmlFor="openFiles"
                                            style={{
                                                cursor: "pointer"
                                            }}
                                        >
                                            {i18n("edit:menu.file.open")}
                                        </label>
                                        <input
                                            style={{
                                                opacity: 0,
                                                position: "absolute",
                                                zIndex: "-1"
                                            }}
                                            type={"file"}
                                            accept={"image/*"}
                                            id={"openFiles"}
                                            ref={filePicker}
                                            onChange={(e) => {
                                                if (
                                                    filePicker.current === null
                                                ) {
                                                    return;
                                                } else {
                                                    let files = e.target.files;
                                                    if (files === null) {
                                                        console.log("ERR");
                                                    } else {
                                                        openFiles(files);
                                                    }
                                                }
                                            }}
                                            multiple
                                        />
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            setSaveDialogOpen(true);
                                            dispatch(closeMainMenu());
                                        }}
                                        icon={
                                            <SaveIcon
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        {i18n("edit:menu.file.save")}
                                    </MenuItem>
                                </SubMenu>

                                {/* help menu */}
                                <SubMenu
                                    icon={<HelpIcon />}
                                    title={i18n("edit:menu.help.helpText")}
                                >
                                    <MenuItem
                                        icon={
                                            <LibraryBooksIcon
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        {i18n("edit:menu.help.manual")}
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            dispatch(
                                                openHelpMenu("/privacy-policy")
                                            );
                                            dispatch(closeMainMenu());
                                        }}
                                        icon={
                                            <PolicyIcon
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        {i18n("common:privacyPolicy")}
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            dispatch(
                                                openHelpMenu("/terms-of-use")
                                            );
                                            dispatch(closeMainMenu());
                                        }}
                                        icon={
                                            <LibraryBooksIcon
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        {i18n("common:license")} &{" "}
                                        {i18n("common:termsOfUse")}
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            dispatch(openHelpMenu("/about"));
                                            dispatch(closeMainMenu());
                                        }}
                                        icon={
                                            <InfoIcon
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        {i18n("edit:menu.help.about")}
                                    </MenuItem>
                                </SubMenu>
                                <div style={{ paddingTop: "50px" }}></div>
                                {/* in order to leave elements visible because the footer covers the last 50px */}
                            </Menu>
                        </SidebarContent>

                        <SidebarFooter
                            className={styles.sidebarFooter}
                            onClick={() => {
                                db.misc.delete("openedProjects").then(() => {
                                    document.location.pathname = "/";
                                });
                            }}
                        >
                            <ExitToAppIcon sx={{ fontSize: "36px" }} />
                            {i18n("edit:menu.exitEditor")}
                        </SidebarFooter>
                    </ProSidebar>
                </section>
            </div>
        </>
    );
}
