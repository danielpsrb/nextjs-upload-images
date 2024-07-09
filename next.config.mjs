/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "2n57rx43bzyb76dy.public.blob.vercel-storage.com",
        },
        ],
    },
};

export default nextConfig;
