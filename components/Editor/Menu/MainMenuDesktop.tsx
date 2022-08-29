import React, { useState } from "react";

import styles from "./MainMenu.module.scss";
import FileMenu from "./FileMenu";
import HelpMenu from "./HelpMenu";
import ViewMenu from "./ViewMenu";

export function MainMenuDesktop(props: { i18n: any }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [fileMenuOpen, setFileMenuOpen] = useState(false),
        [viewMenuOpen, setViewMenuOpen] = useState(false),
        [helpMenuOpen, setHelpMenuOpen] = useState(false);
    let i18n = props.i18n;

    function handleFileMenuClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setFileMenuOpen(true);
    }
    function handleFileMenuClose() {
        setAnchorEl(null);
        setFileMenuOpen(false);
    }

    function handleHelpMenuClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setHelpMenuOpen(true);
    }
    function handleHelpMenuClose() {
        setAnchorEl(null);
        setHelpMenuOpen(false);
    }

    function handleViewMenuClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setViewMenuOpen(true);
    }
    function handleViewMenuClose() {
        setAnchorEl(null);
        setViewMenuOpen(false);
    }

    return (
        <nav className={styles.containerDesktop}>
            <div
                onClick={(e) => {
                    handleFileMenuClick(e);
                }}
            >
                {i18n("edit:menu.file.fileText")}
            </div>

            <div
                onClick={(e) => {
                    handleViewMenuClick(e);
                }}
            >
                {i18n("edit:menu.view.viewText")}
            </div>

            <div
                onClick={(e) => {
                    handleHelpMenuClick(e);
                }}
            >
                {i18n("edit:menu.help.helpText")}
            </div>

            <FileMenu
                anchorElement={anchorEl}
                open={fileMenuOpen}
                closeEvent={() => handleFileMenuClose()}
                i18n={i18n}
            />

            <ViewMenu
                anchorElement={anchorEl}
                open={viewMenuOpen}
                closeEvent={() => handleViewMenuClose()}
                i18n={i18n}
            />

            <HelpMenu
                anchorElement={anchorEl}
                open={helpMenuOpen}
                closeEvent={() => handleHelpMenuClose()}
                i18n={i18n}
            />
        </nav>
    );
}
