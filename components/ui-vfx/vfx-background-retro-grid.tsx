'use client'

import { cn } from '@/lib/utils'

export function VFXBackgroundRetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute h-full w-full overflow-hidden opacity-50 perspective-dramatic',
        className
      )}
    >
      <div className='absolute inset-0 transform-[rotateX(45deg)]'>
        <div
          className={cn(
            'inset-[0%_0px] -ml-[50%] h-[300vh] w-[600vw] origin-[100%_0_0] animate-vfx-retro-grid bg-size-[60px_60px] bg-repeat',
            'vfx-bg-retro-grid-light dark:vfx-bg-retro-grid-dark'
          )}
        />
      </div>
      <div className='absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]' />
    </div>
  )
}
