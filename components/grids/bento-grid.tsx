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
        'relative grid h-auto w-full max-w-6xl grid-cols-4 gap-4 p-10',
        className
      )}
    >
      {children}
    </div>
  )
}
