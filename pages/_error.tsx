/*---------------------------------------------------------------------------------------------
 * Because i18n does not work with 404 and 500 page, i18n will be done here
 *--------------------------------------------------------------------------------------------*/

import Head from "next/head";
import React, { useEffect, useState } from "react";

const en = {
    title: "Server error",
    message:
        "Oops! Something went very wrong at the server! Please try again later."
};

const ro = {
    title: "Eroare la server",
    message:
        "Oops! Ceva a mers foarte prost la server! Vă rugăm încercați mai târziu."
};

function Err500() {
    let [lang, setLang] = useState("en"),
        i18nObject: any;

    useEffect(() => {
        let language = localStorage.getItem("language");
        if (language !== null) {
            setLang(language);
        }
    }, []);

    switch (lang) {
        default:
        case "en":
            i18nObject = en;
            break;
        case "ro":
            i18nObject = ro;
            break;
    }

    return (
        <main>
            <Head>
                <title>{i18nObject.title}</title>
            </Head>
            <div className="centerAlign err404">
                {/* SVG */}
                <svg
                    width="400"
                    height="200"
                    version="1.1"
                    viewBox="0 0 400 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeWidth="16"
                    >
                        <path
                            d="m97.935 24.484-61.387-0.35484s-6.7419-1.0645-6.7419 4.9677v21.645s-0.70968 7.8065 3.1935 7.8065h40.097s25.194 0.70968 25.548 24.484c0.35484 23.774-14.548 28.032-24.839 28.387s-44 4.2581-44.355-11"
                            strokeLinejoin="round"
                        />
                        <path d="m174.58 115.68s-41.871 3.5484-41.871-26.968v-44.71s9.5806-22.71 39.032-22.71c29.452 0 41.871 16.677 41.871 19.871v52.161s-4.9677 22.71-39.387 22.355" />
                        <path d="m284.23 114.54s-41.871 3.5484-41.871-26.968v-44.71s9.5806-22.71 39.032-22.71c29.452 0 41.871 16.677 41.871 19.871v52.161s-4.9677 22.71-39.387 22.355" />
                    </g>
                </svg>
                {/* END OF SVG */}

                <h2 style={{ textAlign: "center" }}>{i18nObject.message}</h2>
            </div>
        </main>
    );
}

export default Err500;
