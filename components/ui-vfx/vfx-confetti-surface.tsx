'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import useEvent from 'react-use-event-hook'
import ReactCanvasConfetti from 'react-canvas-confetti'
import type { TCanvasConfettiInstance } from 'react-canvas-confetti/dist/types'

import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

import { setVFXConfettiSurfaceInstance } from '@/components/ui-vfx/vfx-confetti-surface-store'

export function VFXConfettiSurface({ className }: { className?: string }) {
  const mounted = useMounted()

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState<[number, number]>([0, 0])

  const handleCanvasInit = useEvent(
    ({ confetti }: { confetti: TCanvasConfettiInstance }): void => {
      setVFXConfettiSurfaceInstance(confetti)
    }
  )

  useLayoutEffect(() => {
    if (mounted) {
      const handleResize = (): void => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect()
          setContainerSize([width, height])
        }
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return (): void => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  return createPortal(
    <div
      ref={containerRef}
      className={cn(
        '!pointer-events-none absolute left-0 top-0 !z-[999999] h-screen w-screen',
        className
      )}
    >
      <ReactCanvasConfetti
        width={containerSize[0]}
        height={containerSize[1]}
        className='!pointer-events-none absolute left-0 top-0'
        onInit={handleCanvasInit}
      />
    </div>,
    document.body
  )
}
