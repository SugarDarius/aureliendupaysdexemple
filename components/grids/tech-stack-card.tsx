'use client'

import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import { BentoCard } from '@/components/grids/bento-card'

export type TechStackCardProps = {
  name: string
  tag: string
  href?: string
  className?: string
  children?: React.ReactNode
}

export function TechStackCard({
  name,
  tag,
  href,
  className,
  children,
}: TechStackCardProps) {
  const AnchorComp = href ? 'a' : Fragment
  const anchorProps = href
    ? {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': name,
      }
    : {}
  return (
    <BentoCard className='col-span-1' variant='grid'>
      <AnchorComp {...anchorProps}>
        <div className={cn('relative flex aspect-square flex-col', className)}>
          <div className='absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center'>
            {children}
          </div>
          <div className='flex h-full w-full flex-col justify-end overflow-hidden p-4 max-md:p-2'>
            <div className='flex w-full flex-row items-center justify-between overflow-hidden max-lg:justify-center'>
              <h1 className='font-bold tracking-tighter max-lg:text-sm'>
                {name}
              </h1>
              <span className='flex flex-row items-center rounded-full border border-neutral-200 bg-stone-50 px-2.5 py-1 font-mono text-xs leading-4 text-neutral-900 no-underline max-lg:hidden dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100'>
                {tag}
              </span>
            </div>
          </div>
        </div>
      </AnchorComp>
    </BentoCard>
  )
}
