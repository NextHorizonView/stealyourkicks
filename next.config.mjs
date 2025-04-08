/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other Next.js configurations (if any)
    output: 'export',
    images: {
        domains: [
            "images.unsplash.com",
            "encrypted-tbn1.gstatic.com",
            "image.goat.com",
            'static.nike.com',
            "assets.adidas.com",
            "sothebys-md.brightspotcdn.com",
            "firebasestorage.googleapis.com"
        ],
        
    },
};

export default nextConfig;
