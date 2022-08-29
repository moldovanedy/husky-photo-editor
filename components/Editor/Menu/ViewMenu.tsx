import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ZoomSubMenu from "./ViewSubMenus/ZoomSubMenu";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../src/redux/global.store";
import {
    exitNavigationMode,
    enterNavigationMode
} from "../../../src/redux/userInterface.redux";

function ViewMenu(props: {
    anchorElement: Element | ((element: Element) => Element) | null | undefined;
    open: boolean;
    closeEvent: any;
    i18n: any;
}) {
    let i18n = props.i18n;
    let isInNavigationMode = useSelector(
        (state: RootState) => state.userInterface.isInNavigationMode
    );

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let [zoomSubMenuOpen, setZoomSubMenuOpen] = useState(false);

    function handleZoomSubMenuClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setZoomSubMenuOpen(true);
    }
    function handleZoomSubMenuClose() {
        setAnchorEl(null);
        setZoomSubMenuOpen(false);
    }

    return (
        <>
            <Menu
                anchorEl={props.anchorElement}
                open={props.open}
                onClose={props.closeEvent}
            >
                <MenuItem
                    onClick={(e) => {
                        handleZoomSubMenuClick(e);
                    }}
                >
                    <ListItemIcon>
                        <ZoomInIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.view.zoom")}
                    <ListItemIcon>
                        <ArrowRightIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        if (isInNavigationMode) {
                            store.dispatch(exitNavigationMode());
                        } else {
                            store.dispatch(enterNavigationMode());
                        }
                    }}
                >
                    <ListItemIcon>
                        {isInNavigationMode ? (
                            <CheckBoxIcon
                                className="themeDependentIcon"
                                sx={{ fontSize: "28px" }}
                            />
                        ) : (
                            <CheckBoxOutlineBlankIcon
                                className="themeDependentIcon"
                                sx={{ fontSize: "28px" }}
                            />
                        )}
                    </ListItemIcon>
                    {i18n("edit:menu.view.navigationMode")}
                </MenuItem>

                <ZoomSubMenu
                    anchorElement={anchorEl}
                    open={zoomSubMenuOpen}
                    closeEvent={() => handleZoomSubMenuClose()}
                    i18n={i18n}
                />
            </Menu>
        </>
    );
}

export default ViewMenu;
