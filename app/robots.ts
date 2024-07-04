import type { MetadataRoute } from 'next'
import { baseUrl } from '@/config/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/mdx-renderer/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
