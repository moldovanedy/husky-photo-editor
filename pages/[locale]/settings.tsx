import React from "react";

import { getStaticPaths, makeStaticProps } from "./../../lib/getStatic";
import { useTranslation } from "next-i18next";
import Head from "next/head";
const getStaticProps = makeStaticProps(["common", "settings"]);
export { getStaticPaths, getStaticProps };

function Settings() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t("settings:settings")}</title>
            </Head>
            <div>
                <h2>{t("settings:settings")}</h2>
                <select>
                    <option>English</option>
                    <option>Română</option>
                </select>
            </div>
        </>
    );
}

export default Settings;
