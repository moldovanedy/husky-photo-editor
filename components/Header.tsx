/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/home.module.scss";
import Link from "./Link";
import SettingsIcon from "@mui/icons-material/Settings";

function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <img
                    src="/assets/logo/logo64x64.png"
                    alt={"App logo"}
                    height={50}
                    width={50}
                    style={{ cursor: "pointer" }}
                />
            </Link>

            <Link href="/settings" skipLocaleHandling={false}>
                <SettingsIcon
                    className="themeDependentIcon"
                    fontSize="large"
                    sx={{ margin: "10px", color: "#fff" }}
                />
            </Link>
        </header>
    );
}

export default Header;
