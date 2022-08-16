/*---------------------------------------------------------------------------------------------
 * Because i18n does not work with 404 and 500 page, i18n will be done here
 *--------------------------------------------------------------------------------------------*/

import { Button } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Link from "../components/Link";

const en = {
    title: "Page not found",
    message:
        "Oops! This page does not exist. You can return to home page from the button below.",
    mainPage: "Home page"
};

const ro = {
    title: "Pagina nu a fost găsită",
    message:
        "Oops! Această pagină nu există. Vă puteți întoarce la pagina principală de la butonul de mai jos.",
    mainPage: "Pagina principală"
};

function Err404() {
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
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    width={200}
                    height={200}
                    xmlSpace="preserve"
                >
                    <g>
                        <g>
                            <path
                                d="M170.667,320.007V320c0-11.782-9.551-21.333-21.333-21.333C137.552,298.667,128,308.218,128,320v-56.89
			c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333v78.229c-0.001,11.783,9.551,21.334,21.333,21.334H128v42.66
			c0,11.782,9.551,21.333,21.333,21.333s21.333-9.551,21.333-21.333v-42.66c11.782,0,21.333-9.551,21.333-21.333
			C192,329.558,182.449,320.007,170.667,320.007z"
                                fill="#29b6f6"
                            />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M426.667,320.007V320c0-11.782-9.551-21.333-21.333-21.333C393.552,298.667,384,308.218,384,320v-56.89
			c0-11.782-9.551-21.333-21.333-21.333c-11.782,0-21.333,9.551-21.333,21.333v78.229c-0.001,11.783,9.551,21.334,21.333,21.334H384
			v42.66c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333v-42.66c11.782,0,21.333-9.551,21.333-21.333
			C448,329.558,438.449,320.007,426.667,320.007z"
                                fill="#29b6f6"
                            />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                d="M266.667,256c-29.446,0-53.333,23.887-53.333,53.333v64c-0.001,29.446,23.887,53.334,53.333,53.334
			S320,402.78,320,373.334v-64C320,279.887,296.114,256,266.667,256z M277.334,373.333c0,5.882-4.785,10.667-10.667,10.667
			c-5.882,0-10.667-4.785-10.667-10.667v-64c0-5.882,4.785-10.667,10.667-10.667c5.882,0,10.667,4.785,10.667,10.667V373.333z"
                                fill="#29b6f6"
                            />
                        </g>
                    </g>
                </svg>
                {/* END OF SVG */}

                <h2 style={{ textAlign: "center" }}>{i18nObject.message}</h2>
                <Button variant="contained">
                    <Link href="/" style={{ color: "#000" }}>
                        {i18nObject.mainPage}
                    </Link>
                </Button>
            </div>
        </main>
    );
}

export default Err404;
