import { MetadataRoute } from 'next'

import { env } from '@/config/env'
import { navigationItems } from '@/lib/navigation'

export const baseUrl = env.NEXT_PUBLIC_PROJECT_BASE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = navigationItems.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
