/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";

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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export function MainMenuMobile(props: { show: boolean }) {
    const dispatch = useDispatch();
    let filePicker = useRef<HTMLInputElement>(null);

    return (
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
                        <div style={{ width: "100%" }} className="centerAlign">
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
                            <SubMenu title="File">
                                <MenuItem>New</MenuItem>
                                <MenuItem>
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
                                            if (filePicker.current === null) {
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
                                <SubMenu title={"Open recent"}>
                                    <MenuItem>New</MenuItem>
                                </SubMenu>
                            </SubMenu>

                            <SubMenu title="Edit">
                                <MenuItem>Undo</MenuItem>
                                <MenuItem>Redo</MenuItem>
                            </SubMenu>

                            <SubMenu title="View">
                                <MenuItem>Ruler</MenuItem>
                            </SubMenu>

                            <SubMenu title="Layers">
                                <MenuItem>Add</MenuItem>
                                <MenuItem>Delete</MenuItem>
                            </SubMenu>

                            <SubMenu title="Help">
                                <MenuItem>About Husky Photo Editor</MenuItem>
                                <MenuItem>Manual</MenuItem>
                            </SubMenu>
                            <div style={{ paddingTop: "50px" }}></div>
                            {/* in order to leave elements visible because the footer covers the last 50px */}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter
                        className={styles.sidebarFooter}
                        onClick={() => {
                            document.location.pathname = "/";
                        }}
                    >
                        <ExitToAppIcon sx={{ fontSize: "36px" }} />
                        Exit editor
                    </SidebarFooter>
                </ProSidebar>
            </section>
        </div>
    );
}
