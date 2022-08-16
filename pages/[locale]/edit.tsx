/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import TopBar from "../../components/Editor/TopBar";
import Tools from "../../components/Editor/Tools";
import ProjectsBar from "../../components/Editor/ProjectsBar";

import styles from "./../../styles/edit.module.scss";
import { State } from "../../src/GlobalSpecialState";
import { RootState, store } from "./../../src/redux/global.store";
import {
    addProjectToState,
    ProjectInState
} from "../../src/redux/projectManagement.redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";

import BuildIcon from "@mui/icons-material/Build";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import PanToolIcon from "@mui/icons-material/PanTool";
import CloseIcon from "@mui/icons-material/Close";
import { zoomProjectByPercent } from "../../src/zoomProject";
import { useSelector } from "react-redux";
import {
    enterNavigationMode,
    exitNavigationMode
} from "../../src/redux/userInterface.redux";
import { navigateInProject } from "../../src/input/navigateInProject";
import { db } from "../../src/storage/db";
import { displayProject } from "../../src/projectInteractions/displayProject";

const getStaticProps = makeStaticProps(["common", "messages"]);
export { getStaticPaths, getStaticProps };

function Edit() {
    let mainElement = useRef<HTMLElement>(null);
    let [open, setOpen] = useState(false);

    function openSpeedDial() {
        setOpen(true);
    }

    function closeSpeedDial() {
        setOpen(false);
    }

    let openedProjects = useSelector(
        (state: RootState) => state.projectManagement
    );
    let zoomFactor = useSelector(
        (state: RootState) => state.userInterface.zoomFactor
    );
    let windowWidth = useSelector(
        (state: RootState) => state.environmentInfo.windowWidth
    );
    let windowHeight = useSelector(
        (state: RootState) => state.environmentInfo.windowHeight
    );
    let activeProject = useSelector(
        (state: RootState) => state.userInterface.activeProject
    );
    let isWorkInProgress = useSelector(
        (state: RootState) => state.userInterface.workInProgress
    );
    let isInNavigationMode = useSelector(
        (state: RootState) => state.userInterface.isInNavigationMode
    );

    const { t } = useTranslation();

    const navButtonStyle = {
        backgroundColor: isInNavigationMode ? "#1976d2" : "none" //blue-700
    } as const;

    useEffect(() => {
        let context = State.getObject("translationContext");
        if (context === null) {
            State.addObject("translationContext", t);
        }

        window.addEventListener("resize", () => {
            if (mainElement.current !== null) {
                mainElement.current.style.height = `${
                    store.getState().environmentInfo.windowHeight -
                    mainElement.current.offsetTop -
                    (store.getState().environmentInfo.windowHeight -
                        State.getObject("toolbar").offsetTop)
                }px`;
            }
        });
    }, [State.getObject("toolbar")]);

    useEffect(() => {
        if (mainElement.current !== null) {
            mainElement.current.style.height = `${
                store.getState().environmentInfo.windowHeight -
                mainElement.current.offsetTop -
                (store.getState().environmentInfo.windowHeight -
                    State.getObject("toolbar").offsetTop)
            }px`;
        }

        db.misc.get("openedProjects").then((data) => {
            if (data !== undefined) {
                //get porjects stored in Redux
                let openedProjectsInRedux = store.getState().projectManagement;
                data.value.forEach((project: string, i: number) => {
                    //if the project is in indexedDB, but not in Redux, add it
                    if (
                        openedProjectsInRedux[i] !== null &&
                        openedProjectsInRedux[i] !== undefined
                    ) {
                        if (project !== openedProjectsInRedux[i].id) {
                            db.projects.get(project).then((proj) => {
                                if (proj !== undefined) {
                                    store.dispatch(
                                        addProjectToState({
                                            id: proj.id,
                                            name: proj.name,
                                            width: proj.width,
                                            height: proj.height,
                                            isLoading: true,
                                            isActive: false
                                        })
                                    );

                                    displayProject(project);
                                }
                            });
                        }
                    } else {
                        db.projects.get(project).then((proj) => {
                            if (proj !== undefined) {
                                store.dispatch(
                                    addProjectToState({
                                        id: proj.id,
                                        name: proj.name,
                                        width: proj.width,
                                        height: proj.height,
                                        isLoading: true,
                                        isActive: false
                                    })
                                );

                                displayProject(project);
                            }
                        });
                    }
                });
            }
        });
    }, []);

    //resize helpers canvas
    useEffect(() => {
        //@ts-ignore
        document.getElementById("helpers").style.width = `${windowWidth}px`; //mainElement has 100% width
        //@ts-ignore
        document.getElementById("helpers").style.height =
            //@ts-ignore
            mainElement.current.style.height;
    }, [windowWidth, windowHeight]);

    return (
        <>
            <Head>
                <title>Edit photo</title>
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app/edit"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <TopBar />
            <ProjectsBar />

            <main
                ref={mainElement}
                onClick={() => {
                    if (mainElement.current !== null) {
                        navigateInProject(
                            mainElement.current,
                            isInNavigationMode
                        );
                    }
                }}
                className={styles.mainScrollElement}
                id="mainElement"
                style={{
                    height:
                        mainElement.current !== null
                            ? `${
                                  store.getState().environmentInfo
                                      .windowHeight -
                                  mainElement.current.offsetTop -
                                  (store.getState().environmentInfo
                                      .windowHeight -
                                      State.getObject("toolbar").offsetTop)
                              }px`
                            : "300px",
                    cursor: isInNavigationMode ? "grab" : "default"
                }}
            >
                {/* helpers canvas is where we display all graphical elements that help the user understand the tool (these are called "Gizmos" in Blender) */}
                <canvas
                    id="helpers"
                    style={{
                        position: "fixed"
                    }}
                ></canvas>
                {isWorkInProgress ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : null}

                {windowWidth <= 768 ? (
                    <SpeedDial
                        open={open}
                        onClose={() => closeSpeedDial()}
                        onOpen={() => openSpeedDial()}
                        ariaLabel="More tools"
                        sx={{ position: "fixed", bottom: 80, right: 16 }}
                        icon={
                            <SpeedDialIcon
                                icon={<BuildIcon />}
                                openIcon={<CloseIcon />}
                            />
                        }
                    >
                        <SpeedDialAction
                            icon={<ZoomInIcon />}
                            tooltipTitle={"Zoom in"}
                            onClick={() => {
                                if (zoomFactor < 0.1) {
                                    zoomProjectByPercent(activeProject, 0.02);
                                } else if (zoomFactor < 0.5) {
                                    zoomProjectByPercent(activeProject, 0.1);
                                } else {
                                    zoomProjectByPercent(activeProject, 0.5);
                                }
                            }}
                        />

                        <SpeedDialAction
                            icon={<ZoomOutIcon />}
                            tooltipTitle={"Zoom out"}
                            onClick={() => {
                                if (zoomFactor > 0.5) {
                                    zoomProjectByPercent(activeProject, -0.5);
                                } else if (zoomFactor > 0.1) {
                                    zoomProjectByPercent(activeProject, -0.1);
                                } else if (zoomFactor > 0.02) {
                                    zoomProjectByPercent(activeProject, -0.02);
                                }
                            }}
                        />

                        <SpeedDialAction
                            icon={<PanToolIcon />}
                            tooltipTitle={"Pan"}
                            sx={navButtonStyle}
                            //closing the speed dial form here will break navigation :(
                            onClick={() => {
                                if (isInNavigationMode) {
                                    store.dispatch(exitNavigationMode());
                                } else {
                                    store.dispatch(enterNavigationMode());
                                }
                            }}
                        />
                    </SpeedDial>
                ) : null}

                {openedProjects.map((project, index: number) => {
                    return (
                        <div
                            className={styles.canvasContainer}
                            id={project.id}
                            key={index}
                        >
                            {/* TODO: make margins grow individually when user tries to scroll beyond 0 or canvas width or height by setting margin-top when user goes up, margin-botom: canvas height + value when user goes down etc. */}
                        </div>
                    );
                })}
            </main>

            <Tools />
        </>
    );
}

export default Edit;
