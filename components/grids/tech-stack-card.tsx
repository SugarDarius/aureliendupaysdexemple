'use client'

import { cn } from '@/lib/utils'

export function TechStackCard({
  name,
  tag,
  className,
  children,
}: {
  name: string
  tag: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative col-span-1 flex aspect-square flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-stone-50 transition-transform duration-150 ease-linear hover:scale-[1.03] dark:border-neutral-800 dark:bg-stone-900',
        className
      )}
    >
      <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center'>
        {children}
      </div>
      <div className='flex h-full w-full flex-col justify-end overflow-hidden p-4 max-md:p-2'>
        <div className='flex w-full flex-row items-center justify-between overflow-hidden'>
          <h1 className='text-md font-bold tracking-tighter'>{name}</h1>
          <span className='flex flex-row items-center rounded-full border border-neutral-200 bg-stone-50 px-2.5 py-1 text-xs leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100'>
            {tag}
          </span>
        </div>
      </div>
    </div>
  )
}
