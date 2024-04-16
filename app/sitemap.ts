import { MetadataRoute } from 'next'

export const baseUrl = 'https://aureliendupaysdexemple.com/'

const PATHNAMES = ['/']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = PATHNAMES.map((pathname) => ({
    url: `${baseUrl}${pathname}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
