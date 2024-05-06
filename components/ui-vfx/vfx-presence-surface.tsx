'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

import { cn } from '@/lib/utils'
import { Cursor } from '@/components/ui/cursor'

const PresenceCursor = ({
  x,
  y,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
}) => {
  return (
    <motion.div
      className='pointer-events-none absolute left-0 top-0 z-10'
      style={{ x, y }}
      transition={{
        type: 'spring',
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      <div className='flex flex-col'>
        <Cursor className='text-purple-500 dark:text-purple-400' />
      </div>
    </motion.div>
  )
}

export function VFXPresenceSurface({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const surfaceRef = useRef<HTMLDivElement>(null)

  const [isCursorInside, setIsCursorInside] = useState<boolean>(false)
  const [surfaceRect, setSurfaceRect] = useState<DOMRect | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const getSurfaceBoundingClientRect = useEvent(() => {
    if (surfaceRef.current) {
      const surfaceRect = surfaceRef.current.getBoundingClientRect()
      setSurfaceRect(surfaceRect)
    }
  })

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (surfaceRect) {
        const scrollX = window.scrollX
        const scrollY = window.scrollY

        x.set(e.clientX - surfaceRect.left + scrollX)
        y.set(e.clientY - surfaceRect.top + scrollY)
      }
    }
  )

  const handleMouseEnter = useEvent((): void => {
    setIsCursorInside(true)
  })

  const handleMouseLeave = useEvent((): void => {
    setIsCursorInside(false)
  })

  const handleResize = useEvent((): void => {
    getSurfaceBoundingClientRect()
  })

  useLayoutEffect(
    () => {
      getSurfaceBoundingClientRect()
      window.addEventListener('resize', handleResize)

      return (): void => {
        window.removeEventListener('resize', handleResize)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div
      ref={surfaceRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        'rounded-inherit relative flex size-full cursor-none flex-col',
        className
      )}
    >
      <AnimatePresence>
        {isCursorInside ? <PresenceCursor x={x} y={y} /> : null}
      </AnimatePresence>
      {children}
    </div>
  )
}
