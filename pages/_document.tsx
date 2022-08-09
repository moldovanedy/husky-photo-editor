import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        let hideAllIfJsIsDisabled = `#__next {display: none;} div{width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center}`; // in order to prevent unstyled and broken content if JS is disabled (if it is, the app will not run anyway :) )
        return (
            <Html lang={"en"}>
                {" "}
                {/* will be changed by another script */}
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="apple-touch-icon"
                        href="/assets/logo/logo192x192.png"
                    />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#3326a7" />
                </Head>
                <body>
                    <noscript>
                        <style type="text/css">{hideAllIfJsIsDisabled}</style>
                        <div>
                            <p>Please enable JavaScript to use this app.</p>
                        </div>
                    </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
