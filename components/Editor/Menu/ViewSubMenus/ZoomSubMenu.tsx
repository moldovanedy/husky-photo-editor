import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { zoomProjectByPercent } from "../../../../src/zoomProject";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/redux/global.store";

function ZoomSubMenu(props: {
    anchorElement: Element | ((element: Element) => Element) | null | undefined;
    open: boolean;
    closeEvent: any;
    i18n: any;
}) {
    let i18n = props.i18n,
        zoomFactor = useSelector(
            (state: RootState) => state.userInterface.zoomFactor
        ),
        activeProject = useSelector(
            (state: RootState) => state.userInterface.activeProject
        );

    return (
        <>
            <Menu
                anchorEl={props.anchorElement}
                open={props.open}
                onClose={props.closeEvent}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <MenuItem
                    onClick={() => {
                        if (zoomFactor < 0.1) {
                            zoomProjectByPercent(activeProject, 0.02);
                        } else if (zoomFactor < 0.5) {
                            zoomProjectByPercent(activeProject, 0.1);
                        } else {
                            zoomProjectByPercent(activeProject, 0.5);
                        }
                    }}
                >
                    <ListItemIcon>
                        <ZoomInIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.view.zoomIn")}
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        if (zoomFactor > 0.5) {
                            zoomProjectByPercent(activeProject, -0.5);
                        } else if (zoomFactor > 0.1) {
                            zoomProjectByPercent(activeProject, -0.1);
                        } else if (zoomFactor > 0.02) {
                            zoomProjectByPercent(activeProject, -0.02);
                        }
                    }}
                >
                    <ListItemIcon>
                        <ZoomOutIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.view.zoomOut")}
                </MenuItem>
            </Menu>
        </>
    );
}

export default ZoomSubMenu;
