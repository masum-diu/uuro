/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disables Next.js Image Optimization API
  },
}

module.exports = nextConfig
