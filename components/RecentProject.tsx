/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

import { deleteProjectDB } from "../src/storage/projectManagement";
import { addOrModifyMiscDataDB } from "../src/storage/miscDataManager";
import { store } from "../src/redux/global.store";
import { createMessage, MessageType } from "../src/redux/messages.redux";
import { DisplayedProject } from "../pages/[locale]";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

function RecentProject(props: {
    item: DisplayedProject;
    t: any;
    recreateFunction: Function;
}) {
    let [helpMenuActive, setHelpMenuActive] = useState(false);
    let [deleteConfirmationActive, setDeleteConfirmationActive] =
        useState(false);

    return (
        <div
            id={props.item.id}
            onClick={() => {
                addOrModifyMiscDataDB("openedProjects", [props.item.id]).then(
                    () => {
                        document.location.pathname = "/edit";
                    }
                );
            }}
        >
            {/* help dialog */}
            <Dialog
                open={helpMenuActive}
                onClose={(e) => {
                    //@ts-ignore
                    e.stopPropagation();
                    setHelpMenuActive(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.t("index:sizeEstimationInfoTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.t("index:sizeEstimationInfoContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.stopPropagation();
                            setHelpMenuActive(false);
                        }}
                    >
                        {props.t("common:ok")}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* delete confirmation dialog */}
            <Dialog
                open={deleteConfirmationActive}
                onClose={(e) => {
                    //@ts-ignore
                    e.stopPropagation();
                    setDeleteConfirmationActive(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.t("common:areYouSure")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.t("index:deleteConfirmationContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmationActive(false);
                        }}
                    >
                        {props.t("common:no")}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProjectDB(props.item.id, true).then(
                                (success) => {
                                    if (success) {
                                        store.dispatch(
                                            createMessage({
                                                message: props.t(
                                                    "messages:success.projectDeleted"
                                                ),
                                                type: MessageType.Success
                                            })
                                        );
                                    } else {
                                        store.dispatch(
                                            createMessage({
                                                message: props.t(
                                                    "messages:success.projectNotDeleted"
                                                ),
                                                type: MessageType.Information
                                            })
                                        );
                                    }
                                    props.recreateFunction();
                                }
                            );
                            setDeleteConfirmationActive(false);
                        }}
                    >
                        {props.t("common:yes")}
                    </Button>
                </DialogActions>
            </Dialog>

            <span
                title={props.item.name}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "150px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                }}
            >
                {props.item.name}
            </span>

            <span
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0
                }}
            >
                <DeleteIcon
                    color="error"
                    sx={{
                        fontSize: "40px"
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmationActive(true);
                    }}
                />
            </span>

            <span
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
            >
                ~{" "}
                <span>
                    {/* we use the standard MB, GB etc. insetad MiB, GiB etc. because browsers interpret storage like this */}
                    {props.item.sizeInBytes <= Math.pow(10, 6)
                        ? `${(props.item.sizeInBytes / Math.pow(10, 3)).toFixed(
                              2
                          )} KB`
                        : props.item.sizeInBytes <= Math.pow(10, 9)
                        ? `${(props.item.sizeInBytes / Math.pow(10, 6)).toFixed(
                              2
                          )} MB`
                        : `${(props.item.sizeInBytes / Math.pow(10, 9)).toFixed(
                              2
                          )} GB`}
                </span>{" "}
                <InfoIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        setHelpMenuActive(true);
                    }}
                    sx={{ fontSize: "28px" }}
                    color="action"
                />
            </span>

            {props.item.thumbnail !== undefined ? (
                <img
                    style={{
                        position: "absolute",
                        top: "36px",
                        left: "36px"
                    }}
                    src={props.item.thumbnail}
                    alt={`Thumbnail for ${props.item.name}`}
                    width={128}
                    height={128}
                />
            ) : (
                <img
                    style={{
                        position: "absolute",
                        top: "36px",
                        left: "36px"
                    }}
                    src="/assets/logo/logo128x128.png"
                    alt={`No thumbnail for ${props.item.name}`}
                    width={128}
                    height={128}
                />
            )}
        </div>
    );
}

export default RecentProject;
