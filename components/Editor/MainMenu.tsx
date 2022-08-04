/* eslint-disable @next/next/no-img-element */
import {
    faArrowRightFromBracket,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./MainMenu.module.scss";

import { useDispatch } from "react-redux";
import { closeMainMenu } from "../../src/redux/userInterface.redux";
import { store } from "../../src/redux/global.store";
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SubMenu
} from "react-pro-sidebar";

// import { db, Storage } from "../../src/storage/db";
// import { v1 as uuid } from "uuid";

export function MainMenuMobile(props: { show: boolean }) {
    const dispatch = useDispatch();

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
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => {
                                dispatch(closeMainMenu());
                            }}
                            size={"3x"}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                zIndex: "8001"
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
                    <SidebarFooter className={styles.sidebarFooter}>
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            size={"2x"}
                        />{" "}
                        Exit editor
                    </SidebarFooter>
                </ProSidebar>
            </section>
        </div>
    );
}

export function MainMenuDesktop() {
    return (
        <nav className={styles.containerDesktop}>
            <div>File</div>
            <div>Edit</div>
            <div>View</div>
            <div>Layers</div>
            <div>Help</div>
        </nav>
    );
}
