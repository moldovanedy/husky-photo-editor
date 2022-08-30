const path = require("path");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    },
    images: {
        disableStaticImages: true
    }
};

module.exports = nextConfig;
module.exports = withPWA({
    pwa: {
        runtimeCaching,
        dest: "public",
        register: true,
        skipWaiting: true,
        buildExcludes: [/middleware-manifest.json\$/]
    }
});

