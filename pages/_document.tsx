import Document, { Html, Head, Main, NextScript } from "next/document";
import i18nextConfig from "./../next-i18next.config";

class MyDocument extends Document {
    render() {
        const currentLocale = i18nextConfig.i18n.defaultLocale;
        return (
            <Html lang={currentLocale}>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="apple-touch-icon"
                        href="/assets/logo/logo192x192.png"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
