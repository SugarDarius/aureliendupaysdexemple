'use client'

import { cn } from '@/lib/utils'

export function VFXBackgroundDot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 top-0 m-auto h-[86%] w-[86%] vfx-bg-dot-black/[0.2] dark:vfx-bg-dot-white/[0.2]',
        className
      )}
    >
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
    </div>
  )
}
