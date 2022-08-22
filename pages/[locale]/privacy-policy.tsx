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
import Header from "../../components/Header";

function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t("privacyPolicy:privacyPolicy")}</title>
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app/privacy-policy"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <Header />

            <Link href={"/"}>
                <ArrowBackIcon
                    className="themeDependentIcon"
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
