/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { switchActiveProject } from "../../src/projectInteractions/switchActiveProject";
import { store } from "../../src/redux/global.store";
import {
    ProjectInState,
    setActiveProjectRedux
} from "../../src/redux/projectManagement.redux";

import styles from "./ProjectsBar.module.scss";

import CloseIcon from "@mui/icons-material/Close";
import { deleteProjectDB } from "../../src/storage/projectManagement";
import { createMessage, MessageType } from "../../src/redux/messages.redux";
import { State } from "../../src/GlobalSpecialState";

function ProjectsBar() {
    let projectsBar = useRef<HTMLDivElement>(null);
    let [openedProjects, setOpenedProjects] = useState<ProjectInState[]>([]);
    let i18n = useRef(State.getObject("translationContext"));

    useEffect(() => {
        i18n.current = State.getObject("translationContext");
        console.log(State.getObject("translationContext"));
    }, [State.getObject("translationContext")]);

    store.subscribe(() => {
        setOpenedProjects(store.getState().projectManagement);
    });

    return (
        <div
            ref={projectsBar}
            className={styles.main}
            onWheel={(event) => {
                if (projectsBar.current !== null) {
                    projectsBar.current.scrollBy(
                        Math.round(event.deltaY / 4),
                        0
                    );
                }
            }}
        >
            {openedProjects.map((item, index) => {
                return (
                    <div
                        className={styles.card}
                        key={index}
                        style={
                            item.isActive
                                ? {
                                      backgroundColor: "#3949ab",
                                      boxShadow:
                                          "inset rgb(40 183 68) -1px 1px 4px 4px"
                                  } //indigo-600
                                : { backgroundColor: "#90a4ae" } //blue-grey-300
                        }
                        onClick={() => {
                            switchActiveProject(item.id);
                            store.dispatch(setActiveProjectRedux(item.id));
                        }}
                    >
                        <img
                            src="/assets/logo/logo64x64.png"
                            alt={item.id}
                            height={48}
                        />
                        <CloseIcon
                            sx={{ fontSize: "28px" }}
                            onClick={() => {
                                deleteProjectDB(item.id).then((success) => {
                                    if (success) {
                                        store.dispatch(
                                            createMessage({
                                                message: i18n.current(
                                                    "messages:success.projectDeleted"
                                                ),
                                                type: MessageType.Success
                                            })
                                        );
                                    } else {
                                        store.dispatch(
                                            createMessage({
                                                message: i18n.current(
                                                    "messages:information.projectNotDeleted"
                                                ),
                                                type: MessageType.Information
                                            })
                                        );
                                    }
                                });
                            }}
                        />
                        {item.isLoading ? (
                            <Box
                                sx={{
                                    height: "5px",
                                    position: "absolute",
                                    bottom: "0px",
                                    left: "0px",
                                    width: "90px"
                                }}
                            >
                                <LinearProgress />
                            </Box>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}

export default ProjectsBar;
