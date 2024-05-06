'use client'

import { cn } from '@/lib/utils'

export function VFXPresenceSurface({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn('relative flex size-full cursor-none flex-col', className)}
    >
      {children}
    </div>
  )
}
