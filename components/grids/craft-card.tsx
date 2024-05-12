'use client'

import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import { GitHubRepositoryLink } from '@/components/content/github-repository-link'
import { BentoCard } from '@/components/grids/bento-card'

export function CraftCard({
  slug,
  title,
  summary,
  githubURL,
  category,
  children,
}: {
  slug: string
  title: string
  summary: string
  category?: string
  githubURL?: string
  children?: React.ReactNode
}) {
  return (
    <BentoCard className='col-span-2'>
      <div className='relative flex flex-col gap-4 p-4 max-lg:gap-3'>
        <div className='flex flex-none flex-row items-center justify-between'>
          <h1 className='text-xl font-extrabold tracking-tighter max-md:text-lg'>
            {title}
          </h1>
          {githubURL ? <GitHubRepositoryLink href={githubURL} /> : null}
        </div>
        {children ? (
          <div className='flex w-full flex-col'>{children}</div>
        ) : null}
        <div className='flex w-full flex-none flex-col gap-4'>
          <p className='line-clamp-3 text-base font-medium leading-5 text-muted-foreground max-md:text-sm'>
            {summary}
          </p>
          <div className='flex w-full flex-row items-center justify-between'>
            <Link
              href={'/craft/' + slug}
              className='flex h-[30px] cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-1.5 text-xs font-semibold text-neutral-900 transition-colors ease-linear hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 max-md:py-1 max-md:pl-1 max-md:pr-1.5 max-md:text-[10px]'
              aria-label={'see more about ' + title}
            >
              See more
              <ArrowUpRightIcon className='size-3' />
            </Link>
            {category ? (
              <span className='flex flex-row items-center rounded-full border border-neutral-200 bg-stone-50 px-2 py-0.5 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100'>
                {category}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
