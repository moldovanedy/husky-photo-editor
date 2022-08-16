import React, { useEffect, useState } from "react";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const getStaticProps = makeStaticProps(["common", "settings"]);
export { getStaticPaths, getStaticProps };

import styles from "./../../styles/setttings.module.scss";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import { db } from "../../src/storage/db";
import StorageEstimation from "../../components/settings/StorageEstimation";

function Settings() {
    const { t } = useTranslation();
    let [language, setLanguage] = useState("en"),
        [theme, setTheme] = useState("dark"),
        [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
            useState(false),
        [hasUnsavedSettings, setHasUnsavedSettings] = useState(false);

    let [settings, setSettings] = useState({
        soundsEnabled: false,
        appLogoSpinDisabled: false
    });

    useEffect(() => {
        let lang = localStorage.getItem("language"),
            theme = localStorage.getItem("theme"),
            settingsLocal = localStorage.getItem("settings");

        if (lang !== null) {
            setLanguage(lang);
        }

        if (theme !== null) {
            setTheme(theme);
        }

        if (settingsLocal !== null) {
            setSettings(JSON.parse(settingsLocal));
        }
    }, []);

    function saveSettings() {
        localStorage.setItem("theme", theme);
        localStorage.setItem("language", language);
        localStorage.setItem("settings", JSON.stringify(settings));

        // the link element will not update language and theme
        document.location.pathname = "/";
    }

    return (
        <>
            <Head>
                <title>{t("settings:settings")}</title>
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app/settings"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <Dialog
                open={showUnsavedChangesDialog}
                onClose={() => {
                    setShowUnsavedChangesDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("common:areYouSure")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("settings:unsavedChangesDialogContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setShowUnsavedChangesDialog(false);
                        }}
                        autoFocus
                    >
                        {t("common:cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            document.location.pathname = "/";
                        }}
                    >
                        {t("common:yes")}
                    </Button>
                </DialogActions>
            </Dialog>

            <main className={styles.main}>
                <CloseIcon
                    className="themeDependentIcon"
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
                            control={
                                <Switch checked={settings.soundsEnabled} />
                            }
                            label={t("settings:enableSounds")}
                            onChange={() => {
                                setSettings((previousValue) => ({
                                    ...previousValue,
                                    soundsEnabled: !settings.soundsEnabled
                                }));
                            }}
                        />
                    </FormGroup>
                </div>
                <hr />

                <div>
                    <StorageEstimation i18n={t} />

                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            db.delete()
                                .then(() => {
                                    console.log(
                                        "Database successfully deleted"
                                    );
                                })
                                .catch(() => {
                                    console.error("Could not delete database");
                                })
                                .finally(() => {
                                    localStorage.clear();
                                });
                        }}
                    >
                        {t("settings:deleteLocalData")}
                    </Button>
                </div>
                <hr />

                <div>
                    <h2>{t("settings:accesibility")}</h2>

                    <FormGroup className={styles.displayBlockLabels}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.appLogoSpinDisabled}
                                />
                            }
                            label={t("settings:disableLogoSpin")}
                            onChange={() => {
                                setSettings((previousValue) => ({
                                    ...previousValue,
                                    appLogoSpinDisabled:
                                        !settings.appLogoSpinDisabled
                                }));
                            }}
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
