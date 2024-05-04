'use client'

import { cn } from '@/lib/utils'
import { useCobeGlobe } from '@/hooks/use-cobe-globe'

export function VFXGlobe({ className }: { className?: string }) {
  const { canvasRef } = useCobeGlobe()
  return (
    <div
      className={cn(
        'absolute inset-0 flex size-full flex-col items-center justify-center',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className='aspect-square w-4/5 opacity-0 transition-opacity'
      />
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
    </div>
  )
}
