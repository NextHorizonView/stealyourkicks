// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
      unoptimized: true,
    },
    trailingSlash: true, // optional but helps avoid 404s on GitHub Pages
  };
  
  module.exports = nextConfig;
  