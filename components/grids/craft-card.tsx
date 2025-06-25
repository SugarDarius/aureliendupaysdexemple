'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import {
  ClockIcon,
  BeakerIcon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline'

import { CategoryTag } from '@/components/content/category-tag'
import { BentoCard } from '@/components/grids/bento-card'

export function CraftCard({
  slug,
  title,
  summary,
  category,
  publishedAt,
}: {
  slug: string
  title: string
  summary: string
  category?: string
  publishedAt: string
}) {
  const isLab = category?.includes('Lab')
  const dateTime = new Date(publishedAt)
  const published = format(dateTime, 'MMMM yyyy')

  return (
    <BentoCard className='col-span-2' variant='grid'>
      <Link href={`/craft/${slug}`}>
        <div className='relative flex h-full w-full flex-col gap-4 p-4 max-lg:gap-3'>
          <div className='flex flex-none flex-row items-center gap-4'>
            <div className='flex flex-auto flex-row items-center truncate'>
              <h1 className='truncate text-xl font-semibold tracking-tighter'>
                {title}
              </h1>
            </div>
            <div className='flex flex-none items-center'>
              {isLab ? (
                <BeakerIcon className='size-5 text-muted-foreground' />
              ) : (
                <CodeBracketSquareIcon className='size-5 text-muted-foreground' />
              )}
            </div>
          </div>
          <div className='flex w-full flex-none flex-col gap-4'>
            <p className='line-clamp-2 text-sm font-medium leading-5 text-muted-foreground'>
              {summary}
            </p>
            <div className='flex w-full flex-row items-center justify-between'>
              {category ? <CategoryTag>{category}</CategoryTag> : null}
              <div className='flex items-center gap-1'>
                <ClockIcon className='size-3' />
                <time
                  dateTime={dateTime.toISOString()}
                  className='text-xs font-semibold text-muted-foreground'
                >
                  {published}
                </time>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </BentoCard>
  )
}
