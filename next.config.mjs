/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs separately in CI; skip during next build to avoid false failures
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
