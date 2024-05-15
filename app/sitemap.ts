import { MetadataRoute } from 'next'

import { baseUrl } from '@/config/site-config'
import { navigationItems } from '@/lib/navigation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = navigationItems.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
