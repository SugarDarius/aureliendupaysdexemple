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
      <div className='relative flex h-full w-full flex-col overflow-hidden'>
        <div
          /* eslint-disable-next-line prettier/prettier */
          className='absolute bottom-0 left-0 right-0 top-0 m-auto h-[86%] w-[86%] bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
        </div>
        <div className='relative z-[2] flex h-full w-full flex-col'>
          {children}
        </div>
      </div>
    </div>
  )
}
