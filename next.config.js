/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      formats: ['image/webp'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
            port: '',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '',
            pathname: '/**',
         },
      ],
   },
};

module.exports = nextConfig;
