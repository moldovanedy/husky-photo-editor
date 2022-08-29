/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { switchActiveProject } from "../../src/projectInteractions/switchActiveProject";
import { RootState, store } from "../../src/redux/global.store";
import {
    deleteProjectRedux,
    ProjectInState,
    setActiveProjectRedux
} from "../../src/redux/projectManagement.redux";

import styles from "./ProjectsBar.module.scss";

import CloseIcon from "@mui/icons-material/Close";
import { deleteProjectDB } from "../../src/storage/projectManagement";
import { createMessage, MessageType } from "../../src/redux/messages.redux";
import { useSelector } from "react-redux";
import { displayProject } from "../../src/projectInteractions/displayProject";
import { db } from "../../src/storage/db";
import { addOrModifyMiscDataDB } from "../../src/storage/miscDataManager";

function ProjectsBar(props: { i18n: any }) {
    let projectsBar = useRef<HTMLDivElement>(null);
    let [dialogOpen, setDialogOpen] = useState(false);

    let openedProjects = useSelector(
        (state: RootState) => state.projectManagement
    );

    let i18n = props.i18n;

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
                            store.dispatch(
                                setActiveProjectRedux(item.id.toString())
                            );
                        }}
                    >
                        <img
                            src="/assets/logo/logo64x64.png"
                            alt={item.id}
                            height={48}
                        />
                        <CloseIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                            onClick={() => {
                                setDialogOpen(true);
                            }}
                        />
                        {item.isLoading ? (
                            <Box
                                sx={{
                                    height: "5px",
                                    position: "absolute",
                                    bottom: "0px",
                                    left: "2px",
                                    width: "86px"
                                }}
                            >
                                <LinearProgress />
                            </Box>
                        ) : null}
                    </div>
                );
            })}

            <SaveProjectDialog />
        </div>
    );

    function SaveProjectDialog() {
        function closeDialog() {
            setDialogOpen(false);
        }

        function saveProject() {
            db.misc.get("openedProjects").then((projects) => {
                store.dispatch(
                    deleteProjectRedux(
                        store.getState().userInterface.activeProject
                    )
                );
                if (projects !== undefined) {
                    let index = -1;
                    for (let i = 0; i < projects.value.length; i++) {
                        if (
                            projects.value[i] ===
                            store.getState().userInterface.activeProject
                        ) {
                            index = i;
                        }
                    }

                    if (index !== -1) {
                        projects.value.splice(index, 1);
                    }

                    setTimeout(() => {
                        projects.value.forEach((item) => {
                            displayProject(item);
                        });
                    }, 200);

                    addOrModifyMiscDataDB("openedProjects", {
                        key: projects.key,
                        value: projects.value
                    });

                    closeDialog();
                }
            });
        }

        function deleteProject() {
            deleteProjectDB(store.getState().userInterface.activeProject).then(
                (success) => {
                    if (success) {
                        store.dispatch(
                            createMessage({
                                message: i18n(
                                    "messages:success.projectDeleted"
                                ),
                                type: MessageType.Success
                            })
                        );
                    } else {
                        store.dispatch(
                            createMessage({
                                message: i18n(
                                    "messages:information.projectNotDeleted"
                                ),
                                type: MessageType.Information
                            })
                        );
                    }
                }
            );
            closeDialog();
        }

        return (
            <Dialog
                open={dialogOpen}
                onClose={() => {
                    closeDialog();
                }}
            >
                <DialogTitle>
                    {i18n("edit:projectManagement.saveProjectText")}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {i18n(
                            "edit:projectManagement.saveProjectDialogContent"
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={() => {
                            closeDialog();
                        }}
                    >
                        {i18n("common:cancel")}
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => {
                            deleteProject();
                        }}
                    >
                        {i18n("common:no")}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            saveProject();
                        }}
                    >
                        {i18n("common:yes")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ProjectsBar;
