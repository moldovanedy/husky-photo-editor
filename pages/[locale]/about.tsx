/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Home from "next/head";

import styles from "../../styles/about.module.scss";
import Link from "../../components/Link";
import Header from "../../components/Header";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
const getStaticProps = makeStaticProps(["common", "messages", "about"]);
export { getStaticPaths, getStaticProps };

function About() {
    let [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const { t } = useTranslation();

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

    return (
        <>
            <Home>
                <title>{t("common:about")}</title>
                <meta
                    property="og:url"
                    content="https://huskyphotoeditor.netlify.app/about"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Home>

            <Header />

            {showPrivacyPolicy ? (
                <PrivacyPolicy
                    title={t("common:initial.privacyPolicyDialogTitle")}
                    content={t("common:initial.privacyPolicyDialogContent")}
                />
            ) : null}

            <main
                style={{
                    width: "100%"
                }}
            >
                <div
                    style={{
                        margin: "auto",
                        width: "90%",
                        maxWidth: "1200px"
                    }}
                >
                    <Link href={"/"}>
                        <ArrowBackIcon
                            className="themeDependentIcon"
                            sx={{
                                fontSize: "50px",
                                marginTop: "70px",
                                color: "#fff"
                            }}
                        />
                    </Link>

                    <h1 style={{ marginTop: "0px" }}>Husky Photo Editor</h1>
                    <p>{t("about:description")}</p>
                    <p>{t("about:previewStatement")}</p>
                    <p>
                        {t("about:bugs")}{" "}
                        <a
                            href="https://github.com/moldovanedy/husky-photo-editor/issues"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                        .
                    </p>

                    <h3>{t("about:sourceCode")}</h3>
                    <p>
                        {t("about:sourceCodeText")}
                        <a
                            href="https://github.com/moldovanedy/husky-photo-editor"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {" "}
                            GitHub
                        </a>
                        . {t("about:sourceCodeContribution")}
                    </p>

                    <h3>{t("common:initial.privacyPolicyDialogTitle")}</h3>
                    <p>
                        {t("about:privacyText1")}{" "}
                        <Link href="/privacy-policy">
                            {t("common:privacyPolicy")}
                        </Link>
                        ,{" "}
                        <Link href="/terms-of-use">
                            {t("common:termsOfUse")}
                        </Link>{" "}
                        {t("about:privacyText2")}
                    </p>
                </div>
            </main>
        </>
    );
}

export default About;
