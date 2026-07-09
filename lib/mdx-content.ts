import type { Pages, Page } from '@/db/mdx-content'

export function sortPagesByPublicationDate(pages: Pages): Page[] {
  const sortedPages = [...pages.values()].toSorted((a, b) => {
    const aDate = new Date(a.metadata.publishedAt)
    const bDate = new Date(b.metadata.publishedAt)

    return aDate > bDate ? -1 : 1
  })

  return sortedPages
}
