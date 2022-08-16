import React, { useState } from "react";

import styles from "./MainMenu.module.scss";
import FileMenu from "./FileMenu";

export function MainMenuDesktop() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [fileMenuOpen, setFileMenuOpen] = useState(false);

    function handleFileMenuClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setFileMenuOpen(true);
    }
    function handleFileMenuClose() {
        setAnchorEl(null);
        setFileMenuOpen(false);
    }

    return (
        <nav className={styles.containerDesktop}>
            <div
                onClick={(e) => {
                    handleFileMenuClick(e);
                }}
            >
                File
            </div>
            <div>Help</div>

            <FileMenu
                anchorElement={anchorEl}
                open={fileMenuOpen}
                closeEvent={() => handleFileMenuClose()}
            />
        </nav>
    );
}
