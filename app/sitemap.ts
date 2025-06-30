import { MetadataRoute } from 'next'

import { baseUrl } from '@/config/site-config'

import { navigationItems } from '@/lib/navigation'
import { getMDXPages } from '@/db/mdx-content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const navRoutes = navigationItems.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    lastModified: new Date().toISOString().split('T')[0],
    priority: href === '/' ? 1.0 : 0.8,
  }))

  const craftPages = await getMDXPages('craft')
  const craftRoutes = Array.from(craftPages.values()).map((page) => ({
    url: `${baseUrl}/craft/${page.slug}`,
    lastModified: page.metadata.publishedAt,
    priority: 0.6,
  }))

  return [...navRoutes, ...craftRoutes]
}
