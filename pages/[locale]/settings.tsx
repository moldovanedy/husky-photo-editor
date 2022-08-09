import React, { useEffect, useState } from "react";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const getStaticProps = makeStaticProps(["common", "settings"]);
export { getStaticPaths, getStaticProps };

import styles from "./../../styles/setttings.module.scss";

import Modal from "./../../components/UI/Modal";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Switch
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function Settings() {
    const { t } = useTranslation();
    let [language, setLanguage] = useState("en"),
        [theme, setTheme] = useState("dark"),
        [usedStorage, setUsedStorage] = useState(0),
        [allowedStorage, setAllowedStorage] = useState(0),
        [supportsStorageEstimation, setSupportsStorageEstimation] =
            useState(true),
        [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
            useState(false),
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

        if (!navigator.storage) {
            setSupportsStorageEstimation(false);
            return;
        }

        try {
            navigator.storage.estimate().then((result) => {
                if (result.usage !== undefined) {
                    setUsedStorage(result.usage);
                }
                if (result.quota !== undefined) {
                    setAllowedStorage(result.quota);
                }
            });
        } catch {
            setSupportsStorageEstimation(false);
        }
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
                <CloseIcon
                    sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5%",
                        fontSize: "60px"
                    }}
                    onClick={() => {
                        if (hasUnsavedSettings) {
                            setShowUnsavedChangesDialog(true);
                        } else {
                            document.location.pathname = "/";
                        }
                    }}
                />

                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
                    {t("settings:settings")}
                </h1>

                <div>
                    <h2>General</h2>

                    <FormControl
                        sx={{
                            maxWidth: "90%",
                            minWidth: 80,
                            marginBottom: "30px"
                        }}
                    >
                        <InputLabel id="languageSelector">
                            {t("settings:language")}
                        </InputLabel>
                        <Select
                            labelId="languageSelector"
                            id="demo-simple-select"
                            value={language}
                            label={t("settings:language")}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                setHasUnsavedSettings(true);
                            }}
                        >
                            <MenuItem value={"en"}>English</MenuItem>
                            <MenuItem value={"ro"}>Română</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={styles.displayBlockLabels}>
                        <FormLabel id="demo-radio-buttons-group-label">
                            {t("settings:theme.themeText")}
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={theme}
                            name="radio-buttons-group"
                            onChange={(e) => {
                                setTheme(e.target.value);
                                setHasUnsavedSettings(true);
                            }}
                        >
                            <FormControlLabel
                                value="dark"
                                control={<Radio />}
                                label={t("settings:theme.darkTheme")}
                            />
                            <FormControlLabel
                                value="light"
                                control={<Radio />}
                                label={t("settings:theme.lightTheme")}
                            />
                            <FormControlLabel
                                value="system"
                                control={<Radio />}
                                label={t("settings:theme.systemTheme")}
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormGroup
                        sx={{ marginTop: "20px" }}
                        className={styles.displayBlockLabels}
                    >
                        <FormControlLabel
                            control={<Switch />}
                            label={t("settings:enableSounds")}
                        />
                    </FormGroup>
                </div>
                <hr />

                <div>
                    <h2>Storage</h2>
                    {supportsStorageEstimation ? (
                        <>
                            <meter
                                style={{ width: "85%", height: "40px" }}
                                low={1000 / allowedStorage} // 1 KB
                                optimum={0.4} // 40% of allowed storage
                                high={0.8} // 80% of allowed storage
                                value={usedStorage / allowedStorage}
                            >
                                {usedStorage} / {allowedStorage}
                            </meter>
                            <p>
                                Using {usedStorage} bytes out of{" "}
                                {allowedStorage} available bytes
                            </p>
                        </>
                    ) : (
                        <p>Storage estimation not supported</p>
                    )}
                </div>
                <hr />

                <div>
                    <h2>Accesibility</h2>

                    <FormGroup className={styles.displayBlockLabels}>
                        <FormControlLabel
                            control={<Switch />}
                            label={t("settings:disableLogoSpin")}
                        />
                    </FormGroup>
                </div>
            </main>

            <div className={styles.saveButton}>
                <Button
                    variant="contained"
                    onClick={() => {
                        saveSettings();
                    }}
                >
                    {t("settings:save")}
                </Button>
            </div>
        </>
    );
}

export default Settings;
