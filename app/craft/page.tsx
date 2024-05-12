import type { Metadata } from 'next'
import Image from 'next/image'

import { getMDXPages } from '@/db/mdx-content'
import { sortPagesByPublicationDate } from '@/lib/mdx-content'

import { PageHero } from '@/components/content/page-hero'
import { Separator } from '@/components/ui/separator'
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
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 py-24 max-sm:px-4 min-[1025px]:px-0'>
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
                <div className='flex h-full w-full flex-col pt-8 max-lg:pt-4'>
                  <Image
                    alt={page.metadata.title + ' image'}
                    src={page.metadata.image}
                    width={240}
                    height={80}
                    priority
                  />
                </div>
              ) : null}
            </CraftCard>
          ))}
        </CraftGrid>
      </div>
    </div>
  )
}
