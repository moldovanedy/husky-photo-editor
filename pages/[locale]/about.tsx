/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Home from "next/head";

import styles from "../../styles/about.module.scss";
import Link from "../../components/Link";
import Header from "../../components/Header";
import PrivacyPolicy from "../../components/PrivacyPolicy";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
const getStaticProps = makeStaticProps(["common", "messages"]);
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
                <title>About</title>
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

            <main></main>
        </>
    );
}

export default About;
