import type { Metadata } from 'next'
import Image from 'next/image'

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
            githubURL={page.metadata.githubURL}
          >
            {page.metadata.image ? (
              <div className='flex h-full w-full flex-col items-start justify-end overflow-hidden pt-8'>
                <Image
                  alt={page.metadata.title + ' image'}
                  src={page.metadata.image}
                  priority
                  width={240}
                  height={38}
                  style={{ width: 240, height: 38 }}
                />
              </div>
            ) : null}
          </CraftCard>
        ))}
      </CraftGrid>
    </PageContent>
  )
}
