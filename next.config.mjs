/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
