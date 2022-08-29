import {
    ListItemIcon,
    ListItemText,
    Divider,
    Menu,
    MenuItem
} from "@mui/material";
import React, { useRef, useState } from "react";
import { openFiles } from "../../../src/menu/actions";
import { SaveDialog } from "./Dialogs/FileMenuDialogs";

import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { db } from "../../../src/storage/db";

function FileMenu(props: {
    anchorElement: Element | ((element: Element) => Element) | null | undefined;
    open: boolean;
    closeEvent: any;
    i18n: any;
}) {
    let filePicker = useRef<HTMLInputElement>(null);
    let [saveDialogOpen, setSaveDialogOpen] = useState(false);
    let i18n = props.i18n;

    return (
        <>
            {saveDialogOpen ? (
                <SaveDialog
                    closeEvent={() => {
                        setSaveDialogOpen(false);
                    }}
                />
            ) : null}

            <Menu
                anchorEl={props.anchorElement}
                open={props.open}
                onClose={props.closeEvent}
            >
                <MenuItem
                    onClick={() => {
                        if (filePicker.current !== null) {
                            filePicker.current.click();
                        }
                    }}
                >
                    <ListItemIcon>
                        <FolderOpenIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.file.open")}
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
                                    return;
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
                    }}
                >
                    <ListItemIcon>
                        <SaveIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.file.save")}
                </MenuItem>
                <Divider />

                <MenuItem
                    onClick={() => {
                        db.misc.delete("openedProjects").then(() => {
                            document.location.pathname = "/";
                        });
                    }}
                >
                    <ListItemIcon>
                        <ExitToAppIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    <ListItemText>{i18n("edit:menu.exitEditor")}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

export default FileMenu;
