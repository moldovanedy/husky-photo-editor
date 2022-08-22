/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import styles from "./MainMenu.module.scss";

import { useDispatch } from "react-redux";
import { closeMainMenu } from "../../../src/redux/userInterface.redux";
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
import { SaveDialog } from "./Dialogs/FileMenuDialogs";
import { db } from "../../../src/storage/db";

export function MainMenuMobile(props: { show: boolean }) {
    const dispatch = useDispatch();
    let filePicker = useRef<HTMLInputElement>(null);
    let [saveDialogOpen, setSaveDialogOpen] = useState(false);

    return (
        <>
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
                                className="themeDependentIcon"
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
                                <SubMenu title="File">
                                    <MenuItem
                                        icon={
                                            <FolderOpenIcon
                                                className="themeDependentIcon"
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
                                            Open
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
                                                className="themeDependentIcon"
                                                sx={{ fontSize: "28px" }}
                                            />
                                        }
                                    >
                                        Save
                                    </MenuItem>
                                </SubMenu>

                                <SubMenu title="Help">
                                    <MenuItem>About</MenuItem>
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
                            Exit editor
                        </SidebarFooter>
                    </ProSidebar>
                </section>
            </div>
        </>
    );
}
