import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#ffffff',
    description: siteConfig.description,
    display: 'standalone',
    icons: [
      {
        sizes: 'any',
        src: '/pwa/favicon-pwa.ico',
        type: 'image/x-icon',
      },
    ],
    name: siteConfig.title,
    short_name: siteConfig.title,
    start_url: '/',
    theme_color: '#ffffff',
  }
}
