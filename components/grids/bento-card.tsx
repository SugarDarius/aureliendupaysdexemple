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
        'relative flex transform-gpu flex-col overflow-hidden rounded-2xl border bg-accent text-popover-foreground transition-transform duration-150 ease-in-out hover:scale-105',
        className
      )}
    >
      {children}
    </div>
  )
}
