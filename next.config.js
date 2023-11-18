/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      formats: ['image/webp'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/**',
         },
      ],
   },
};

module.exports = nextConfig;
