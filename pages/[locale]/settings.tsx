import React, { useEffect, useState } from "react";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const getStaticProps = makeStaticProps(["common", "settingsPage", "messages"]);
export { getStaticPaths, getStaticProps };

import PrivacyPolicy from "../../components/PrivacyPolicy";

import styles from "./../../styles/setttings.module.scss";

import {
    Box,
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
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Slider,
    Switch,
    Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { db } from "../../src/storage/db";
import StorageEstimation from "../../components/StorageEstimation";
import { store } from "../../src/redux/global.store";
import { createMessage, MessageType } from "../../src/redux/messages.redux";

function Settings() {
    const { t } = useTranslation();
    let [language, setLanguage] = useState("en"),
        [theme, setTheme] = useState("dark"),
        [showUnsavedChangesDialog, setShowUnsavedChangesDialog] =
            useState(false),
        [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
            useState(false),
        [hasUnsavedSettings, setHasUnsavedSettings] = useState(false),
        [audioValue, setAudioValue] = useState(30);

    let [sondsHelperActive, setSoundsHelperActive] = useState(false),
        [logoSpinHelperActive, setLogoSpinHelperActive] = useState(false);

    let [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    const handleAudioSliderChange = (
        event: Event,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) {
            setAudioValue(newValue[0]);
        } else {
            setAudioValue(newValue);
        }
        setHasUnsavedSettings(true);
    };

    const handleAudioInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAudioValue(
            event.target.value === "" ? 0 : Number(event.target.value)
        );
        setHasUnsavedSettings(true);
    };

    const handleAudioBlur = () => {
        if (audioValue < 0) {
            setAudioValue(0);
        } else if (audioValue > 100) {
            setAudioValue(100);
        }
        setHasUnsavedSettings(true);
    };

    let [settings, setSettings] = useState({
        soundsEnabled: false,
        appLogoSpinDisabled: false,
        appVolume: 30
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
            setAudioValue(
                settings.appVolume !== null ? settings.appVolume : 30
            );
        }
    }, [settings.appVolume]);

    useEffect(() => {
        let hasAcceptedLegalTerms = localStorage.getItem(
            "hasAcceptedLegalTerms"
        );

        if (
            hasAcceptedLegalTerms === null ||
            hasAcceptedLegalTerms === undefined
        ) {
            setShowPrivacyPolicy(true);
        }
    }, []);

    function saveSettings() {
        localStorage.setItem("theme", theme);
        localStorage.setItem("language", language);
        settings.appVolume = audioValue;
        localStorage.setItem("settings", JSON.stringify(settings));

        // the link element will not update language and theme
        document.location.pathname = "/";
    }

    return (
        <>
            <Head>
                <title>{t("settingsPage:settings")}</title>
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app/settings"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            {showPrivacyPolicy ? (
                <PrivacyPolicy
                    title={t("common:initial.privacyPolicyDialogTitle")}
                    content={t("common:initial.privacyPolicyDialogContent")}
                />
            ) : null}

            {/* unsaved changes dialog */}
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
                        {t("settingsPage:unsavedChangesDialogContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={() => {
                            setShowUnsavedChangesDialog(false);
                        }}
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

            {/* delete confirmation dialog */}
            <Dialog
                open={showDeleteConfirmationDialog}
                onClose={() => {
                    setShowDeleteConfirmationDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("common:areYouSure")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("settingsPage:deleteLocalDataConfirmationContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={() => {
                            setShowDeleteConfirmationDialog(false);
                        }}
                    >
                        {t("common:cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            db.delete()
                                .then(() => {
                                    store.dispatch(
                                        createMessage({
                                            message: t(
                                                "messages:success.dataDeleted"
                                            ),
                                            type: MessageType.Success
                                        })
                                    );
                                })
                                .catch(() => {
                                    store.dispatch(
                                        createMessage({
                                            message: t(
                                                "messages:information.dataNotDeleted"
                                            ),
                                            type: MessageType.Information
                                        })
                                    );
                                })
                                .finally(() => {
                                    localStorage.clear();
                                    setShowDeleteConfirmationDialog(false);
                                });
                        }}
                    >
                        {t("common:yes")}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* sound helper dialog */}
            <Dialog
                open={sondsHelperActive}
                onClose={() => {
                    setSoundsHelperActive(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("settingsPage:helpers.soundsTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("settingsPage:helpers.soundsContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSoundsHelperActive(false);
                        }}
                    >
                        {t("common:ok")}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* logo spin helper dialog */}
            <Dialog
                open={logoSpinHelperActive}
                onClose={() => {
                    setLogoSpinHelperActive(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("settingsPage:helpers.logoSpinTitle")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("settingsPage:helpers.logoSpinContent")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setLogoSpinHelperActive(false);
                        }}
                    >
                        {t("common:ok")}
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
                    {t("settingsPage:settings")}
                </h1>

                <div>
                    <h2>General</h2>

                    {/* language */}
                    <FormControl
                        sx={{
                            maxWidth: "90%",
                            minWidth: 80,
                            marginBottom: "30px"
                        }}
                    >
                        <InputLabel id="languageSelector">
                            {t("settingsPage:language")}
                        </InputLabel>
                        <Select
                            labelId="languageSelector"
                            value={language}
                            label={t("settingsPage:language")}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                setHasUnsavedSettings(true);
                            }}
                        >
                            <MenuItem value={"en"}>English</MenuItem>
                            <MenuItem value={"ro"}>Română</MenuItem>
                        </Select>
                    </FormControl>

                    {/* theme */}
                    <FormControl className={styles.displayBlockLabels}>
                        <FormLabel>
                            {t("settingsPage:theme.themeText")}
                        </FormLabel>
                        <RadioGroup
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
                                label={t("settingsPage:theme.darkTheme")}
                            />
                            <FormControlLabel
                                value="light"
                                control={<Radio />}
                                label={t("settingsPage:theme.lightTheme")}
                            />
                            <FormControlLabel
                                value="system"
                                control={<Radio />}
                                label={t("settingsPage:theme.systemTheme")}
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* sounds */}
                    <FormGroup
                        sx={{ marginTop: "20px" }}
                        className={styles.displayBlockLabels}
                    >
                        <FormControlLabel
                            control={
                                <Switch checked={settings.soundsEnabled} />
                            }
                            label={
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    {t("settingsPage:enableSounds")}
                                    <InfoIcon
                                        onClick={() => {
                                            setSettings((previousValue) => ({
                                                ...previousValue,
                                                soundsEnabled:
                                                    !settings.soundsEnabled
                                            }));
                                            setSoundsHelperActive(true);
                                        }}
                                    />
                                </div>
                            }
                            onChange={() => {
                                setSettings((previousValue) => ({
                                    ...previousValue,
                                    soundsEnabled: !settings.soundsEnabled
                                }));
                                setHasUnsavedSettings(true);
                            }}
                        />

                        {settings.soundsEnabled ? (
                            <Box sx={{ width: 250 }}>
                                <Typography id="input-slider" gutterBottom>
                                    {t("settings:volume")}
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {/* override custom stylesheet */}
                                    <Grid item>
                                        <VolumeUpIcon />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            sx={{
                                                width: "130px",
                                                marginLeft: "10px"
                                            }}
                                            value={
                                                typeof audioValue === "number"
                                                    ? audioValue
                                                    : 0
                                            }
                                            onChange={handleAudioSliderChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input
                                            value={audioValue}
                                            size="small"
                                            onChange={handleAudioInputChange}
                                            onBlur={handleAudioBlur}
                                            inputProps={{
                                                step: 1,
                                                min: 0,
                                                max: 100,
                                                type: "number",
                                                "aria-labelledby":
                                                    "input-slider"
                                            }}
                                        />
                                    </Grid>
                                </div>
                            </Box>
                        ) : null}
                    </FormGroup>
                </div>
                <hr />

                <div>
                    <StorageEstimation i18n={t} />

                    {/* delete local data */}
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            setShowDeleteConfirmationDialog(true);
                        }}
                    >
                        {t("settingsPage:deleteLocalData")}
                    </Button>
                </div>
                <hr />

                <div>
                    <h2>{t("settingsPage:accesibility")}</h2>

                    {/* logo spin */}
                    <FormGroup className={styles.displayBlockLabels}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.appLogoSpinDisabled}
                                />
                            }
                            label={
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    {t("settingsPage:disableLogoSpin")}
                                    <InfoIcon
                                        onClick={() => {
                                            setSettings((previousValue) => ({
                                                ...previousValue,
                                                appLogoSpinDisabled:
                                                    !settings.appLogoSpinDisabled
                                            }));
                                            setLogoSpinHelperActive(true);
                                        }}
                                    />
                                </div>
                            }
                            onChange={() => {
                                setSettings((previousValue) => ({
                                    ...previousValue,
                                    appLogoSpinDisabled:
                                        !settings.appLogoSpinDisabled
                                }));
                                setHasUnsavedSettings(true);
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
                    {t("settingsPage:save")}
                </Button>
            </div>
        </>
    );
}

export default Settings;
