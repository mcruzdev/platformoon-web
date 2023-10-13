/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PLATFORMOON_APPS_BASE_URL: process.env.PLATFORMOON_APPS_BASE_URL || "http://0.0.0.0:8080"
    },
}

module.exports = nextConfig
