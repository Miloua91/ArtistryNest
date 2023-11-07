/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mgdkamqbxvrywiscpsvh.supabase.co',
      },
    ],
  },
}


module.exports = nextConfig
