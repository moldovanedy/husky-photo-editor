import type { NextPage } from "next";
import Head from "next/head";
import Link from "./../../components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import styles from "./../../styles/Home.module.scss";
import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import { useEffect, useState } from "react";

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
                <picture>
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
                </picture>
                <Link href="/settings" skipLocaleHandling={false}>
                    <FontAwesomeIcon
                        icon={faGear}
                        size={"2x"}
                        style={{ margin: "10px" }}
                    />
                </Link>
            </header>

            <div className={styles.main}>
                <h2 style={{ fontSize: "24px" }}>Husky Photo Editor</h2>

                <main className={styles.mainPanel}>
                    <div>
                        <Link href="#" skipLocaleHandling={false}>
                            <div
                                className={`centerAlign ${styles.linkMain}`}
                                style={{ justifyContent: "space-between" }}
                            >
                                <picture>
                                    <img
                                        src="/assets/icons/editPhoto.png"
                                        alt="Edit a photo"
                                        height="80"
                                        width="80"
                                    />
                                </picture>
                                <span>{t("index:editImage")}</span>
                            </div>
                        </Link>
                        <br />
                        <Link href="/take-photo" skipLocaleHandling={false}>
                            <div
                                className={`centerAlign ${styles.linkMain}`}
                                style={{ justifyContent: "space-between" }}
                            >
                                <picture>
                                    <img
                                        src="/assets/icons/takePhoto.png"
                                        alt="Take a photo from camera"
                                        height="80"
                                        width="80"
                                    />
                                </picture>
                                <span>{t("index:takePhoto")}</span>
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
                <a href="./privacy-policy.html">{t("index:privacyPolicy")}</a>
            </footer>
        </>
    );
};

export default Home;
