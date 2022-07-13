import React, { useRef } from "react";

import styles from "./PrivacyPolicy.module.scss";

// @ts-ignore
function PrivacyPolicy({ title, content }) {
    let privacyPolicyDialog = useRef(null);

    function legalTermsAccepted() {
        localStorage.setItem("hasAcceptedLegalTerms", "true");
        if (privacyPolicyDialog !== null) {
            // @ts-ignore
            privacyPolicyDialog.current.style.opacity = 0;
            // @ts-ignore
            privacyPolicyDialog.current.style.pointerEvents = "none";
        }
    }

    return (
        <aside ref={privacyPolicyDialog} className={styles.privacyPolicyDialog}>
            <h2 style={{ color: "var(--main-app-color)" }}>{title}</h2>
            <p style={{ color: "var(--main-app-color)" }}>{content}</p>
            <div className={styles.acceptButton}>
                <button
                    onClick={() => {
                        legalTermsAccepted();
                    }}
                >
                    Accept
                </button>
            </div>
        </aside>
    );
}

export default PrivacyPolicy;
