import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { appWithTranslation } from "next-i18next";
import Router from "next/router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { store } from "./../src/redux/store";
import { Provider } from "react-redux";

const handleRouteStart = () => NProgress.start();
const handleRouteDone = () => NProgress.done();

Router.events.on("routeChangeStart", handleRouteStart);
Router.events.on("routeChangeComplete", handleRouteDone);
Router.events.on("routeChangeError", handleRouteDone);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark">
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default appWithTranslation(MyApp);
