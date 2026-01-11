/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com","images.unsplash.com"], // ✅ allow Cloudinary
  },
};

export default nextConfig;
