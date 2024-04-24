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
        'relative flex transform-gpu flex-col overflow-hidden rounded-2xl bg-accent text-popover-foreground transition-transform duration-150 ease-linear hover:scale-[1.03]',
        className
      )}
    >
      {children}
    </div>
  )
}
