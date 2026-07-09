import type { MetadataRoute } from 'next'

import { baseUrl } from '@/config/site-config'
import { getMDXPages } from '@/db/mdx-content'
import { navigationItems } from '@/lib/navigation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const navRoutes = navigationItems.map(({ href }) => ({
    lastModified: new Date().toISOString().split('T')[0],
    // oxlint-disable-next-line unicorn/no-zero-fractions
    priority: href === '/' ? 1.0 : 0.8,
    url: `${baseUrl}${href}`,
  }))

  const craftPages = await getMDXPages('craft')
  const craftRoutes = [...craftPages.values()].map((page) => ({
    lastModified: page.metadata.publishedAt,
    priority: 0.6,
    url: `${baseUrl}/craft/${page.slug}`,
  }))

  return [...navRoutes, ...craftRoutes]
}
