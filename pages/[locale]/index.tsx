/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "./../../components/Link";

import styles from "./../../styles/home.module.scss";
import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import { useEffect, useState } from "react";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { db } from "../../src/storage/db";
import { deleteProjectDB } from "../../src/storage/projectManagement";
import { store } from "../../src/redux/global.store";
import { createMessage, MessageType } from "../../src/redux/messages.redux";

const getStaticProps = makeStaticProps(["common", "index", "messages"]);
export { getStaticPaths, getStaticProps };

interface DisplayedProject {
    id: string;
    name: string;
    sizeInBytes: number;
    thumbnail?: string;
}

function Home() {
    let [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    let [recentProjects, setRecentProjects] = useState<DisplayedProject[]>([]);

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
                        className="themeDependentIcon"
                        fontSize="large"
                        sx={{ color: "#fff" }}
                    />
                </Link>
            </header>

            <div className={styles.main}>
                <h1 className={styles.title}>Husky Photo Editor</h1>
                <h3>v. 0.3.0</h3>
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
                            {recentProjects.map((item, index) => {
                                return (
                                    <div
                                        id={item.id}
                                        key={index}
                                        className={styles.recentProjectElement}
                                    >
                                        <span
                                            title={item.name}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "150px",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {item.name}
                                        </span>

                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0
                                            }}
                                        >
                                            <DeleteIcon
                                                color="error"
                                                sx={{
                                                    fontSize: "40px"
                                                }}
                                                onClick={() => {
                                                    deleteProjectDB(
                                                        item.id,
                                                        true
                                                    ).then((success) => {
                                                        if (success) {
                                                            store.dispatch(
                                                                createMessage({
                                                                    message: t(
                                                                        "messages:success.projectDeleted"
                                                                    ),
                                                                    type: MessageType.Success
                                                                })
                                                            );
                                                        } else {
                                                            store.dispatch(
                                                                createMessage({
                                                                    message: t(
                                                                        "messages:success.projectNotDeleted"
                                                                    ),
                                                                    type: MessageType.Information
                                                                })
                                                            );
                                                        }
                                                        getRecentProjectsData();
                                                    });
                                                }}
                                            />
                                        </span>

                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0
                                            }}
                                        >
                                            ~{" "}
                                            <span>
                                                {item.sizeInBytes <=
                                                Math.pow(2, 20)
                                                    ? `${(
                                                          item.sizeInBytes /
                                                          Math.pow(2, 10)
                                                      ).toFixed(2)} KB`
                                                    : item.sizeInBytes <=
                                                      Math.pow(2, 30)
                                                    ? `${(
                                                          item.sizeInBytes /
                                                          Math.pow(2, 20)
                                                      ).toFixed(2)} MB`
                                                    : `${(
                                                          item.sizeInBytes /
                                                          Math.pow(2, 30)
                                                      ).toFixed(2)} GB`}
                                            </span>{" "}
                                            <InfoIcon
                                                sx={{ fontSize: "28px" }}
                                                color="action"
                                            />
                                        </span>

                                        {item.thumbnail !== undefined ? (
                                            <img
                                                style={{
                                                    position: "absolute",
                                                    top: "36px",
                                                    left: "36px"
                                                }}
                                                src={item.thumbnail}
                                                alt={`Thumbnail for ${item.name}`}
                                                width={128}
                                                height={128}
                                            />
                                        ) : (
                                            <img
                                                style={{
                                                    position: "absolute",
                                                    top: "36px",
                                                    left: "36px"
                                                }}
                                                src="/assets/logo/logo128x128.png"
                                                alt={`No thumbnail for ${item.name}`}
                                                width={128}
                                                height={128}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </main>
            </div>

            {showPrivacyPolicy ? (
                <PrivacyPolicy
                    title={t("index:privacyPolicyDialogTitle")}
                    content={t("index:privacyPolicyDialogContent")}
                />
            ) : null}

            <footer className={styles.footer}>
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
