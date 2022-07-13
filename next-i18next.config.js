const path = require("path");

module.exports = {
    i18n: {
        locales: ["en", "ro"],
        defaultLocale: "en",
    },
    localePath: path.resolve("./locale"),
    reloadOnPrerender: true,
    browserLanguageDetection: false,
};
