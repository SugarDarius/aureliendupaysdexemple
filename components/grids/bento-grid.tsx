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
        'relative grid h-auto w-full max-w-4xl grid-cols-4 gap-6 p-6',
        className
      )}
    >
      {children}
    </div>
  )
}
