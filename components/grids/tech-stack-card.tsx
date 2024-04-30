'use client'

import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import { BentoCard } from '@/components/grids/bento-card'

export function TechStackCard({
  name,
  tag,
  href,
  className,
  children,
}: {
  name: string
  tag: string
  href?: string
  className?: string
  children?: React.ReactNode
}) {
  const AnchorComp = href ? 'a' : Fragment
  const anchorProps = href
    ? {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}
  return (
    <BentoCard className='col-span-1' variant='grid'>
      <AnchorComp {...anchorProps}>
        <div className={cn('relative flex aspect-square flex-col ', className)}>
          <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center'>
            {children}
          </div>
          <div className=' flex h-full w-full flex-col justify-end overflow-hidden p-4 max-md:p-2'>
            <div className='flex w-full flex-row items-center justify-between overflow-hidden max-lg:justify-center'>
              <h1 className='text-md font-bold tracking-tighter'>{name}</h1>
              <span className='flex flex-row items-center rounded-full border border-neutral-200 bg-stone-50 px-2.5 py-1 text-xs leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100 max-lg:hidden'>
                {tag}
              </span>
            </div>
          </div>
        </div>
      </AnchorComp>
    </BentoCard>
  )
}
