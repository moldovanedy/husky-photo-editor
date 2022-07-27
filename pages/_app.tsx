import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { appWithTranslation } from "next-i18next";

import LoadingScreen from "./../components/LoadingAndProgress/LoadingScreen";
import ShowMessages from "../components/Messages/ShowMessages";

import { store } from "../src/redux/global.store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
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
