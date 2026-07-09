import type { MetadataRoute } from 'next'

import { baseUrl } from '@/config/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: '/',
        disallow: ['/api/', '/mdx-renderer/'],
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
