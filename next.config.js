/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PLATFORMOON_APPS_BASE_URL: process.env.PLATFORMOON_APPS_BASE_URL
    },
}

module.exports = nextConfig
