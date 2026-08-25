/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // AVIF primero, WebP como respaldo. next/image negocia por Accept.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
