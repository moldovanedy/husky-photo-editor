import { ListItemIcon, Divider, Menu, MenuItem } from "@mui/material";
import React from "react";

import InfoIcon from "@mui/icons-material/Info";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PolicyIcon from "@mui/icons-material/Policy";
import { store } from "../../../src/redux/global.store";
import { openHelpMenu } from "../../../src/redux/userInterface.redux";

function HelpMenu(props: {
    anchorElement: Element | ((element: Element) => Element) | null | undefined;
    open: boolean;
    closeEvent: any;
    i18n: any;
}) {
    let i18n = props.i18n;

    return (
        <>
            <Menu
                anchorEl={props.anchorElement}
                open={props.open}
                onClose={props.closeEvent}
            >
                <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                        <LibraryBooksIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.help.manual")}
                </MenuItem>
                <Divider />

                <MenuItem
                    onClick={() => {
                        store.dispatch(openHelpMenu("/privacy-policy"));
                    }}
                >
                    <ListItemIcon>
                        <PolicyIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("common:privacyPolicy")}
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        store.dispatch(openHelpMenu("/terms-of-use"));
                    }}
                >
                    <ListItemIcon>
                        <LibraryBooksIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("common:license")} & {i18n("common:termsOfUse")}
                </MenuItem>
                <Divider />

                <MenuItem
                    onClick={() => {
                        store.dispatch(openHelpMenu("/about"));
                    }}
                >
                    <ListItemIcon>
                        <InfoIcon
                            className="themeDependentIcon"
                            sx={{ fontSize: "28px" }}
                        />
                    </ListItemIcon>
                    {i18n("edit:menu.help.about")}
                </MenuItem>
            </Menu>
        </>
    );
}

export default HelpMenu;
