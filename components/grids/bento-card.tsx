'use client'

import { cn } from '@/lib/utils'

export function BentoCard({
  className = '',
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex transform-gpu flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-stone-50 transition-transform duration-150 ease-linear hover:scale-[1.03] dark:border-neutral-800 dark:bg-stone-900',
        className
      )}
    >
      {children}
    </div>
  )
}
