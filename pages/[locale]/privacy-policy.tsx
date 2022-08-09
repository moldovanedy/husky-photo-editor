/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";

import styles from "./../../styles/privacy-policy.module.scss";
import Link from "../../components/Link";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
const getStaticProps = makeStaticProps(["common", "privacyPolicy"]);
export { getStaticPaths, getStaticProps };

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";

function PrivacyPolicy() {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t("privacyPolicy:privacyPolicy")}</title>
            </Head>

            <header className={styles.header}>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt={"App logo"}
                    height={50}
                    width={50}
                    style={{ cursor: "pointer" }}
                    // in order to have a way to refresh app when using the PWA
                    onClick={() => {
                        document.location.pathname = "/";
                    }}
                />

                <Link href="/settings" skipLocaleHandling={false}>
                    <SettingsIcon
                        fontSize="large"
                        sx={{ margin: "10px", color: "#fff" }}
                    />
                </Link>
            </header>

            <Link href={"/"}>
                <ArrowBackIcon
                    sx={{
                        fontSize: "50px",
                        margin: "10px",
                        marginTop: "60px",
                        marginLeft: "10px",
                        color: "#fff"
                    }}
                />
            </Link>

            <main className={styles.main}>
                <h2>{t("privacyPolicy:privacyPolicy")}</h2>
                <h3>{t("privacyPolicy:title1_privacy")}</h3>
                <p>{t("privacyPolicy:content1_privacy")}</p>
                <h3>{t("privacyPolicy:title2_dataStored")}</h3>
                <p>{t("privacyPolicy:content2_dataStored")}</p>
                <h3>{t("privacyPolicy:title3_deletingData")}</h3>
                <p>{t("privacyPolicy:content3_deletingData")}</p>
            </main>
        </>
    );
}

export default PrivacyPolicy;
