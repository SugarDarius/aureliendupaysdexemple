'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

import { cn } from '@/lib/utils'
import { getRandomUsername } from '@/lib/random-username'
import { Cursor } from '@/components/ui/cursor'

const PresenceCursor = ({
  x,
  y,
  username,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  username: string
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
      <div className='flex flex-row gap-1'>
        <Cursor className='size-5 text-purple-500 dark:text-purple-400' />
        <div className='-ml-2.5 mt-3 flex flex-row items-center gap-1 rounded-full bg-purple-500 py-1 pl-1 pr-1.5 dark:bg-purple-400'>
          <div className='flex size-4 items-center justify-center overflow-hidden rounded-full bg-slate-600'>
            <Image
              src='/medias/images/memoji-avatar.png'
              width={16}
              height={16}
              alt='memoji avatar bubble cursor'
              priority
            />
          </div>
          <span className='text-xs font-semibold'>Hello {username} 👋</span>
        </div>
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

  const username = getRandomUsername()

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
        {isCursorInside ? (
          <PresenceCursor
            key='presenceCursor'
            x={x}
            y={y}
            username={username}
          />
        ) : null}
      </AnimatePresence>
      {children}
    </div>
  )
}
