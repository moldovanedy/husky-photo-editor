/*---------------------------------------------------------------------------------------------
 * Because i18n does not work with 404 and 500 page, i18n will be done here
 *--------------------------------------------------------------------------------------------*/

import React, { useEffect, useState } from "react";

const en = {
    title: "Page not found",
};

const ro = {
    title: "Pagina nu a fost găsită",
};

function Err404() {
    let [lang, setLang] = useState("en"),
        i18nObject;

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

    return <div>{i18nObject.title}</div>;
}

export default Err404;
