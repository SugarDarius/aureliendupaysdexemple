'use client'

import { cn } from '@/lib/utils'

export function TechStackGrid({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('flex w-full flex-col gap-8', className)}>
      <h1 className='text-4xl font-bold tracking-tight text-muted-foreground'>
        {title}
      </h1>
      <div className='grid w-full grid-cols-3 gap-4 max-sm:grid-cols-2'>
        {children}
      </div>
    </div>
  )
}
