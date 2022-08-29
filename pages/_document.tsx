import Document, { Html, Head, Main, NextScript } from "next/document";

class HuskyDocument extends Document {
    render() {
        let hideAllIfJsIsDisabled = `
        #__next{display: none;}

        body{overflow: hidden;}

        svg{width: 35%; height: 35%;}

        div{width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #222;
                color: #fff;
            }
        }`; // in order to prevent unstyled and broken content if JS is disabled (if it is, the app will not run anyway :) )
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
                    <meta
                        name="description"
                        content="The free and open-source web photo editor"
                    />
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <meta
                        property="og:url"
                        content="https://huskyphotoeditor.netlify.app"
                    />

                    <meta property="og:title" content="Husky Photo Editor" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:description"
                        content="The free and open-source web photo editor."
                    />
                    <meta
                        property="og:site_name"
                        content="https://huskyphotoeditor.netlify.app"
                    />

                    <meta
                        property="og:image"
                        content="https://huskyphotoeditor.netlify.app/assets/logo/logo512x512.png"
                    />
                    <meta property="og:image:type" content="image/png" />
                    <meta property="og:image:width" content="512" />
                    <meta property="og:image:height" content="512" />
                    <meta
                        property="og:image:alt"
                        content="Husky Photo Editor logo"
                    />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:title" content="Husky Photo Editor" />
                    <meta
                        name="twitter:description"
                        content="The free and open-source web photo editor."
                    />
                    <meta
                        name="twitter:image"
                        content="https://huskyphotoeditor.netlify.app/assets/logo/logo512x512.png"
                    />
                </Head>
                <body>
                    <noscript>
                        <style type="text/css">{hideAllIfJsIsDisabled}</style>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 630 630"
                            >
                                <rect width="630" height="630" fill="#f7df1e" />
                                <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
                            </svg>
                            <h2 style={{ textAlign: "center" }}>
                                Please enable JavaScript to use this app
                            </h2>
                        </div>
                    </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default HuskyDocument;
