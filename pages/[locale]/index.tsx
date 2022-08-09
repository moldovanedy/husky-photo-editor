/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Link from "./../../components/Link";

import styles from "./../../styles/home.module.scss";
import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import { useEffect, useState } from "react";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SettingsIcon from "@mui/icons-material/Settings";

const getStaticProps = makeStaticProps(["common", "index"]);
export { getStaticPaths, getStaticProps };

const Home: NextPage = () => {
    let [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

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

    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>Husky Photo Editor</title>
                <meta name="description" content="The free web photo editor" />
                <link rel="icon" href="/favicon.ico" />
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
                    <SettingsIcon fontSize="large" sx={{ color: "#fff" }} />
                </Link>
            </header>

            <div className={styles.main}>
                <h1 className={styles.title}>Husky Photo Editor</h1>
                <h3>v 0.3.0</h3>

                <main className={styles.mainPanel}>
                    <div>
                        <Link href="/edit" skipLocaleHandling={false}>
                            <div
                                className={`centerAlign ${styles.linkMain}`}
                                style={{ justifyContent: "space-between" }}
                            >
                                <img
                                    src="/assets/img/editPhoto.png"
                                    alt={t("index:editImage")}
                                    height="80"
                                    width="80"
                                />
                                <span
                                    style={{ color: "var(--main-text-color)" }}
                                >
                                    {t("index:editImage")}
                                </span>
                            </div>
                        </Link>
                        <br />
                        <Link href="/take-photo" skipLocaleHandling={false}>
                            <div
                                className={`centerAlign ${styles.linkMain}`}
                                style={{ justifyContent: "space-between" }}
                            >
                                <CameraAltIcon
                                    sx={{ color: "#fff", fontSize: "82px" }}
                                />
                                <span
                                    style={{ color: "var(--main-text-color)" }}
                                >
                                    {t("index:takePhoto")}
                                </span>
                            </div>
                        </Link>
                    </div>

                    <aside className={styles.recentProjects}>
                        <h3>{t("index:recentProjects")}</h3>
                    </aside>
                </main>
            </div>

            {showPrivacyPolicy ? (
                <PrivacyPolicy
                    title={t("index:privacyPolicyDialogTitle")}
                    content={t("index:privacyPolicyDialogContent")}
                />
            ) : null}

            <footer style={{ backgroundColor: `var(--secondary-app-color)` }}>
                <Link href="/privacy-policy">{t("index:privacyPolicy")}</Link>
            </footer>
        </>
    );
};

export default Home;
