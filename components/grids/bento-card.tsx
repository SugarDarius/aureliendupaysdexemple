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
        'relative flex flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
    >
      {children}
    </div>
  )
}
