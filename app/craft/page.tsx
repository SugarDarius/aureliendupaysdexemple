import type { Metadata } from 'next'

import { PageContent } from '@/components/content/page-content'
import { PageHero } from '@/components/content/page-hero'
import { CraftCard } from '@/components/grids/craft-card'
import { CraftGrid } from '@/components/grids/craft-grid'
import { Separator } from '@/components/ui/separator'
import { getMDXPages } from '@/db/mdx-content'
import { sortPagesByPublicationDate } from '@/lib/mdx-content'

export const metadata: Metadata = {
  description: 'Check my personal work I craft',
  title: 'Craft',
}

export default async function CraftPage() {
  const pages = await getMDXPages('craft')
  const sortedPages = sortPagesByPublicationDate(pages)

  return (
    <PageContent>
      <PageHero
        title='Craft'
        description='A look at my personal craft and contributions '
      />
      <Separator />
      <CraftGrid>
        {sortedPages.map((page) => (
          <CraftCard
            key={page.slug}
            slug={page.slug}
            title={page.metadata.title}
            summary={page.metadata.summary}
            category={page.metadata.category}
            publishedAt={page.metadata.publishedAt}
          />
        ))}
      </CraftGrid>
    </PageContent>
  )
}
