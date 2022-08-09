/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import TopBar from "../../components/Editor/TopBar";
import Tools from "../../components/Editor/Tools";
import ProjectsBar from "../../components/Editor/ProjectsBar";

import styles from "./../../styles/edit.module.scss";
import { State } from "../../src/GlobalSpecialState";
import { store } from "./../../src/redux/global.store";
import { ProjectInState } from "../../src/redux/projectManagement.redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function Edit() {
    let mainElement = useRef<HTMLElement>(null);
    let [openedProjects, setOpenedProjects] = useState<ProjectInState[]>([]);

    store.subscribe(() => {
        setOpenedProjects(store.getState().projectManagement);
    });

    useEffect(() => {
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
    }, []);

    return (
        <>
            <Head>
                <title>Edit photo</title>
            </Head>

            <TopBar />
            <ProjectsBar />

            <main
                ref={mainElement}
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
                            : "300px"
                }}
            >
                {store.getState().userInterface.workInProgress ? (
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
