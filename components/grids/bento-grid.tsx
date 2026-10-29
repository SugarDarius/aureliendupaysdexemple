'use client'

import { cn } from '@/lib/utils'

export function BentoGrid({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative grid h-auto w-full grid-cols-4 gap-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3',
        className,
      )}
    >
      {children}
    </div>
  )
}
