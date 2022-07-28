import React, { useEffect, useState } from "react";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const getStaticProps = makeStaticProps(["common", "settings"]);
export { getStaticPaths, getStaticProps };

import styles from "./../../styles/setttings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Modal from "./../../components/UI/Modal";

function Settings() {
    const { t } = useTranslation();
    let [language, setLanguage] = useState("en"),
        [theme, setTheme] = useState("dark"),
        [usedStorage, setUsedStorage] = useState(0),
        [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
            useState(false),
        [allowedStorage, setAllowedStorage] = useState(0),
        [hasUnsavedSettings, setHasUnsavedSettings] = useState(false);

    useEffect(() => {
        let lang = localStorage.getItem("language"),
            theme = localStorage.getItem("theme");

        if (lang !== null) {
            setLanguage(lang);
        }

        if (theme !== null) {
            setTheme(theme);
        }

        navigator.storage.estimate().then((result) => {
            if (result.usage !== undefined) {
                setUsedStorage(result.usage);
            }
            if (result.quota !== undefined) {
                setAllowedStorage(result.quota);
            }
        });
    }, []);

    function saveSettings() {
        localStorage.setItem("theme", theme);
        localStorage.setItem("language", language);

        // the link element will not update language and theme
        document.location.pathname = "/";
    }

    return (
        <>
            <Head>
                <title>{t("settings:settings")}</title>
            </Head>

            <Modal
                title={"Are you sure?"}
                show={showUnsavedChangesDialog}
                cancelBtnText={"Cancel"}
                button1Event={() => {
                    document.location.pathname = "/";
                }}
                closeEvent={() => {
                    setShowUnsavedChangesDialog(false);
                }}
            >
                <p>
                    There are some unsaved changes to your settings. If you
                    press &quot;OK&quot;, you will lose all your changes. If you
                    want to save your change, please press &quot;Cancel&quot;
                    and then the &quot;Save&quot; button at the bottom of the
                    page.
                </p>
            </Modal>

            <main className={styles.main}>
                <FontAwesomeIcon
                    icon={faTimes}
                    size={"3x"}
                    onClick={() => {
                        if (hasUnsavedSettings) {
                            setShowUnsavedChangesDialog(true);
                        } else {
                            document.location.pathname = "/";
                        }
                    }}
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "5%",
                    }}
                />
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
                    {t("settings:settings")}
                </h1>

                <div>
                    <h2>General</h2>
                    <div>
                        <label htmlFor="langSelector">
                            {t("settings:language")}
                        </label>{" "}
                        <select
                            id="langSelector"
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                setHasUnsavedSettings(true);
                            }}
                        >
                            <option value={"en"}>English</option>
                            <option value={"ro"}>Română</option>
                        </select>
                    </div>

                    <label>{t("settings:theme.themeText")}</label>
                    <div style={{ marginLeft: "40px" }}>
                        <div className={styles.themeInput}>
                            <input
                                type={"radio"}
                                value="dark"
                                id="dark"
                                title={t("settings:theme.darkTheme")}
                                checked={theme === "dark" ? true : false}
                                onChange={(e) => {
                                    setTheme(e.target.value);
                                    setHasUnsavedSettings(true);
                                }}
                            />
                            <label htmlFor="dark">
                                {t("settings:theme.darkTheme")}
                            </label>
                        </div>
                        <div className={styles.themeInput}>
                            <input
                                type={"radio"}
                                value="light"
                                id="light"
                                title={t("settings:theme.lightTheme")}
                                checked={theme === "light" ? true : false}
                                onChange={(e) => {
                                    setTheme(e.target.value);
                                    setHasUnsavedSettings(true);
                                }}
                            />
                            <label htmlFor="light">
                                {t("settings:theme.lightTheme")}
                            </label>
                        </div>
                        <div className={styles.themeInput}>
                            <input
                                type={"radio"}
                                value="system"
                                id="system"
                                title={t("settings:theme.systemTheme")}
                                checked={theme === "system" ? true : false}
                                onChange={(e) => {
                                    setTheme(e.target.value);
                                    setHasUnsavedSettings(true);
                                }}
                            />
                            <label htmlFor="system">
                                {t("settings:theme.systemTheme")}
                            </label>
                        </div>
                    </div>
                </div>
                <hr />

                <div>
                    <h2>Storage</h2>
                    <p>
                        Using {usedStorage} bytes out of {allowedStorage}{" "}
                        available bytes
                    </p>
                </div>
                <hr />

                <div>
                    <h2>Accesibility</h2>
                    <div style={{ marginTop: "30px" }}>
                        <input
                            id="disableLogoSpin"
                            type={"checkbox"}
                            value="disableLogoSpin"
                            title={t("settings:disableLogoSpin")}
                        />
                        <label htmlFor="disableLogoSpin">
                            {t("settings:disableLogoSpin")}
                        </label>
                    </div>
                </div>
            </main>

            <div className={styles.saveButton}>
                <button
                    onClick={() => {
                        saveSettings();
                    }}
                >
                    {t("settings:save")}
                </button>
            </div>
        </>
    );
}

export default Settings;
