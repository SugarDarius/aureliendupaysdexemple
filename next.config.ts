import type { NextConfig } from 'next'

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  media-src 'self';
  font-src 'self' data:;
  object-src 'self';
  connect-src *;
  frame-src 'self' data:;
  frame-ancestors 'none';
  form-action 'self';
  upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            // reduce to one year
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
}

export default nextConfig
