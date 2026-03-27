/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance: compress output
  compress: true,
  // Performance: use SWC minify (default in Next 13+)
  swcMinify: true,
  // Disable image optimization for external/base64 images to speed up serving
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
