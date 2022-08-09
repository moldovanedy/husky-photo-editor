import React, { useState } from "react";

import styles from "./MainMenu.module.scss";
import FileMenu from "./FileMenu";

export function MainMenuDesktop() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <nav className={styles.containerDesktop}>
            <div
                onClick={(e) => {
                    handleClick(e);
                }}
            >
                File
            </div>
            <div>Edit</div>
            <div>View</div>
            <div>Layers</div>
            <div
                onClick={(e) => {
                    handleClick(e);
                }}
            >
                Help
            </div>

            <FileMenu
                anchorElement={anchorEl}
                open={open}
                closeEvent={handleClose}
            />
        </nav>
    );
}
