'use client'

import { cn } from '@/lib/utils'

export function CategoryTag({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-row items-center rounded-full border border-neutral-200 bg-stone-50 px-2 py-0.5 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100',
        className
      )}
    >
      {children}
    </div>
  )
}
