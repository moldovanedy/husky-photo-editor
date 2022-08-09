import {
    ListItemIcon,
    ListItemText,
    Divider,
    Menu,
    MenuItem
} from "@mui/material";
import React, { useRef } from "react";
import { openFiles } from "../../../src/menu/actions";

import AddIcon from "@mui/icons-material/Add";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function FileMenu(props: {
    anchorElement: Element | ((element: Element) => Element) | null | undefined;
    open: boolean;
    closeEvent;
}) {
    let filePicker = useRef<HTMLInputElement>(null);

    return (
        <Menu
            anchorEl={props.anchorElement}
            open={props.open}
            onClose={props.closeEvent}
        >
            <MenuItem>
                <ListItemIcon>
                    <AddIcon sx={{ fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText>New</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <label htmlFor="openFiles">
                        <FolderOpenIcon sx={{ fontSize: "28px" }} />
                    </label>
                </ListItemIcon>
                <label
                    htmlFor="openFiles"
                    style={{
                        cursor: "pointer",
                        width: "100%"
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
                                return;
                            } else {
                                openFiles(files);
                            }
                        }
                    }}
                    multiple
                />
            </MenuItem>
            <MenuItem>
                <ListItemText>Open recent</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <ExitToAppIcon sx={{ fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText
                    onClick={() => {
                        document.location.pathname = "/";
                    }}
                >
                    Exit editor
                </ListItemText>
            </MenuItem>
        </Menu>
    );
}

export default FileMenu;
