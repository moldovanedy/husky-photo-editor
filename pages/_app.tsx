import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-pro-sidebar/dist/css/styles.css";
config.autoAddCss = false;
import { appWithTranslation } from "next-i18next";

import LoadingScreen from "./../components/LoadingAndProgress/LoadingScreen";
import ShowMessages from "../components/Messages/ShowMessages";

import { store } from "../src/redux/global.store";
import { Provider } from "react-redux";
import "./../components/LoadingAndProgress/customNprogressStyle.css";

import { getStaticPaths, makeStaticProps } from "./../lib/getStatic";
import { useTranslation } from "next-i18next";
const getStaticProps = makeStaticProps(["common", "messages"]);
export { getStaticPaths, getStaticProps };
import { State } from "./../src/GlobalSpecialState";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    const { t } = useTranslation();
    useEffect(() => {
        let context = State.getObject("translationContext");
        if (context === null) {
            State.addObject("translationContext", t);
        }
    }, [t]);

    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark">
                <LoadingScreen />
                <Component {...pageProps} />
                <ShowMessages />
            </ThemeProvider>
        </Provider>
    );
}

export default appWithTranslation(MyApp);
