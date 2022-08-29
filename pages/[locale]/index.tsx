/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "./../../components/Link";

import styles from "../../styles/Home.module.scss";
import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import { useEffect, useState } from "react";

import SettingsIcon from "@mui/icons-material/Settings";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { db } from "../../src/storage/db";
import { LinearProgress } from "@mui/material";
import Header from "../../components/Header";
import RecentProject from "../../components/RecentProject";

const getStaticProps = makeStaticProps(["common", "index", "messages"]);
export { getStaticPaths, getStaticProps };

export interface DisplayedProject {
    id: string;
    name: string;
    sizeInBytes: number;
    thumbnail?: string;
}

function Home() {
    let [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    let [recentProjects, setRecentProjects] = useState<DisplayedProject[]>([]),
        [projectsLoading, setProjectsLoading] = useState(true);

    function getRecentProjectsData() {
        let projects: DisplayedProject[] = [];
        db.projects.toArray().then((proj) => {
            proj.forEach((item) => {
                let size = 0;
                item.currentData.forEach((layer) => {
                    size += layer.data.length;
                });

                projects.push({
                    id: item.id,
                    name: item.name,
                    sizeInBytes: size,
                    thumbnail: item.thumbnailPNG
                });
            });
            setRecentProjects(projects);
            setProjectsLoading(false);
        });
    }

    useEffect(() => {
        let hasAcceptedLegalTerms = localStorage.getItem(
            "hasAcceptedLegalTerms"
        );

        getRecentProjectsData();

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
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <Header />

            {showPrivacyPolicy ? (
                <PrivacyPolicy
                    title={t("common:initial.privacyPolicyDialogTitle")}
                    content={t("common:initial.privacyPolicyDialogContent")}
                />
            ) : null}

            <div className={styles.main}>
                <h1 className={styles.title}>Husky Photo Editor</h1>
                <h3>v. 0.4.0</h3>
                <h3 style={{ color: "#f00", fontWeight: "bolder" }}>
                    EXPERIMENTAL!!!
                </h3>

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
                                    className="themeDependentIcon"
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
                        <div className={styles.recentProjectsGrid}>
                            {!projectsLoading ? (
                                recentProjects.map((item, index) => {
                                    return (
                                        <RecentProject
                                            key={index}
                                            item={item}
                                            t={t}
                                            recreateFunction={
                                                getRecentProjectsData
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <aside
                                    className="centerAlign"
                                    style={{
                                        width: "100%",
                                        flexDirection: "column"
                                    }}
                                >
                                    <p>{t("common:loading")}...</p>
                                    <aside
                                        style={{
                                            width: "95%",
                                            maxWidth: "450px"
                                        }}
                                    >
                                        <LinearProgress />
                                    </aside>
                                </aside>
                            )}
                        </div>
                    </aside>
                </main>
            </div>

            <footer className={styles.footer}>
                <Link href="/about">{t("common:about")}</Link>
                <Link href="/privacy-policy">{t("index:privacyPolicy")}</Link>
                <Link href="/terms-of-use">{t("common:termsOfUse")}</Link>
                <Link href="/third-party-notices">
                    {t("common:thirdPartyNotices.text")}
                </Link>
            </footer>
        </>
    );
}

export default Home;
