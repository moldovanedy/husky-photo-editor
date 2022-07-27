import React from "react";
import Head from "next/head";

import styles from "./../../styles/privacy-policy.module.scss";

function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy policy</title>
            </Head>
            <main className={styles.main}>
                <h2>Privacy policy</h2>
            </main>
        </>
    );
}

export default PrivacyPolicy;
