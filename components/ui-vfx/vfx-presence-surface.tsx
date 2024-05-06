'use client'

import Image from 'next/image'

import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import useEvent from 'react-use-event-hook'

import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

import { cn } from '@/lib/utils'
import { getRandomUsername } from '@/lib/random-username'

import { useMounted } from '@/hooks/use-mounted'
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
        <Cursor className='size-5 text-purple-400' />
        <div className='-ml-2.5 mt-3 flex flex-row items-center gap-1 rounded-full bg-purple-400 py-1 pl-1 pr-1.5'>
          <div className='flex size-4 flex-col items-center justify-center overflow-hidden rounded-full'>
            <Image
              src='/medias/images/aureliendupaysdexemple-logo.png'
              width={16}
              height={16}
              alt='logo'
              priority
            />
          </div>
          <span className='text-xs font-semibold dark:text-background'>
            Hello {username} 👋
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const VFXPresenceSurfacePortal = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const mounted = useMounted()
  if (!mounted) {
    return null
  }

  return createPortal(
    <div className='pointer-events-none absolute left-0 top-0 h-screen w-screen'>
      {children}
    </div>,
    document.body
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

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      x.set(e.clientX + window.scrollX)
      y.set(e.clientY + window.scrollY)
    }
  )

  const handleMouseEnter = useEvent((): void => {
    setIsCursorInside(true)
  })

  const handleMouseLeave = useEvent((): void => {
    setIsCursorInside(false)
  })

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
      <VFXPresenceSurfacePortal>
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
      </VFXPresenceSurfacePortal>
      {children}
    </div>
  )
}
