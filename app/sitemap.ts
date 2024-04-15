export const baseUrl = 'https://aureliendupaysdexemple.com/'

const PATHNAMES = ['/']

type SitemapItem = { url: string; lastModified: string }

export default async function sitemap(): Promise<SitemapItem[]> {
  const routes = PATHNAMES.map((pathname) => ({
    url: `${baseUrl}${pathname}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
