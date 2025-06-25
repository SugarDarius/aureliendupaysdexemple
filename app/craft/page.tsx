import type { Metadata } from 'next'

import { getMDXPages } from '@/db/mdx-content'
import { sortPagesByPublicationDate } from '@/lib/mdx-content'

import { Separator } from '@/components/ui/separator'
import { PageHero } from '@/components/content/page-hero'
import { PageContent } from '@/components/content/page-content'
import { CraftGrid } from '@/components/grids/craft-grid'
import { CraftCard } from '@/components/grids/craft-card'

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Check my personal work I craft',
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
