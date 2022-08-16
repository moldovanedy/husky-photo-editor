const path = require("path");
const withPWA = require("next-pwa");

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
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: true
    }
});

