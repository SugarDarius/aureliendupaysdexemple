/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
