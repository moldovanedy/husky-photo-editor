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
    ProjectInState,
    setActiveProjectRedux
} from "../../src/redux/projectManagement.redux";

import styles from "./ProjectsBar.module.scss";

import CloseIcon from "@mui/icons-material/Close";
import { deleteProjectDB } from "../../src/storage/projectManagement";
import { createMessage, MessageType } from "../../src/redux/messages.redux";
import { State } from "../../src/GlobalSpecialState";
import { useSelector } from "react-redux";

function ProjectsBar() {
    let projectsBar = useRef<HTMLDivElement>(null);
    let [dialogOpen, setDialogOpen] = useState(false);

    let openedProjects = useSelector(
        (state: RootState) => state.projectManagement
    );

    let i18n = useRef(State.getObject("translationContext"));

    useEffect(() => {
        i18n.current = State.getObject("translationContext");
    }, [State.getObject("translationContext")]);

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

        function saveProject() {}

        function deleteProject() {
            deleteProjectDB(store.getState().userInterface.activeProject).then(
                (success) => {
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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Save project?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Would you like to save the project locally? If you save
                        your project locally, you will be able to access it at
                        any time.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            closeDialog();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            deleteProject();
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            saveProject();
                        }}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ProjectsBar;
