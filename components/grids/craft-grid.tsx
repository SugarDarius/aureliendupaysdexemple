'use client'

import { cn } from '@/lib/utils'

export function CraftGrid({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-4 gap-4 max-sm:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  )
}
