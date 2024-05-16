'use client'

import { clsx } from 'clsx'
import { cn } from '@/lib/utils'

export function Callout({
  icon,
  title,
  className,
  children,
}: {
  icon?: React.ReactNode
  title?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex w-full flex-row items-stretch gap-2 rounded-lg border border-neutral-200 bg-stone-50 px-4 py-3 text-sm text-foreground dark:border-neutral-800 dark:bg-stone-900',
        className
      )}
    >
      {icon ? (
        <div
          className={cn(
            'flex h-full flex-none flex-col items-center',
            clsx({
              'justify-center': title === undefined,
              'justify-start': title !== undefined,
            })
          )}
        >
          {icon}
        </div>
      ) : null}
      <div className='flex flex-auto flex-col justify-center gap-1'>
        {title ? (
          <h5 className='text-base font-bold leading-none tracking-tight'>
            {title}
          </h5>
        ) : null}
        <div className='text-sm [&_p]:m-0 [&_p]:leading-[18px]'>{children}</div>
      </div>
    </div>
  )
}
