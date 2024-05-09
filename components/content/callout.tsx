'use client'

import clsx from 'clsx'
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
        'flex w-full flex-row items-stretch gap-2 rounded-lg border bg-background px-4 py-3 text-sm text-foreground',
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
      <div className='flex flex-auto flex-col gap-1'>
        {title ? (
          <h5 className='text-base font-bold leading-none tracking-tight'>
            {title}
          </h5>
        ) : null}
        <div className='text-sm'>{children}</div>
      </div>
    </div>
  )
}
