/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "react-pro-sidebar/dist/css/styles.css";
import { appWithTranslation } from "next-i18next";

import LoadingScreen from "./../components/LoadingAndProgress/LoadingScreen";
import ShowMessages from "../components/Messages/ShowMessages";

import ErrorBoundary from "../components/ErrorBoundary";

import { store } from "../src/redux/global.store";
import { Provider } from "react-redux";
import "./../components/LoadingAndProgress/customNprogressStyle.css";

import React, { useEffect, useState } from "react";

import { ThemeProvider as MaterialUI, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
    let [theme, setTheme] = useState("dark");

    useEffect(() => {
        let storedTheme = localStorage.getItem("theme");

        if (storedTheme === null) {
            setTheme("dark");
        } else {
            setTheme(storedTheme);
        }

        let settedLang = localStorage.getItem("language");
        if (settedLang !== null) {
            document.documentElement.setAttribute("lang", settedLang);
        }
    }, []);

    let muiTheme = createTheme({
        palette: {
            //@ts-ignore
            mode: theme
        }
    });

    return (
        <ErrorBoundary>
            <Provider store={store}>
                <ThemeProvider defaultTheme="dark">
                    <MaterialUI theme={muiTheme}>
                        <LoadingScreen />
                        <Component {...pageProps} />
                        <ShowMessages />
                    </MaterialUI>
                </ThemeProvider>
            </Provider>
        </ErrorBoundary>
    );
}

export default appWithTranslation(MyApp);
