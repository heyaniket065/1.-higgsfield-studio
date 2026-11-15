/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['studio'],
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};

export default nextConfig;
