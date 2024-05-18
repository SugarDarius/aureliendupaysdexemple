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

import { cn, pick } from '@/lib/utils'
import { getRandomUsername } from '@/lib/random-username'

import { useMounted } from '@/hooks/use-mounted'
import { Cursor } from '@/components/ui/cursor'

const CURSOR_COLORS = ['violet-700', 'orange-600', 'sky-600', 'fuchsia-500']

const PresenceCursor = ({
  x,
  y,
  username,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  username: string
}) => {
  const color = pick(CURSOR_COLORS)
  return (
    <motion.div
      className='pointer-events-none absolute left-0 top-0 z-10'
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='flex flex-row gap-1'>
        <Cursor className={cn('size-5', `text-${color}`)} />
        <motion.div
          className={cn(
            '-ml-2.5 mt-3 flex h-7 flex-row items-center gap-1.5 rounded-full pl-1.5 pr-2',
            `bg-${color}`
          )}
          initial={{ opacity: 0, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 10, y: 10 }}
          transition={{ delay: 0.15 }}
        >
          <div className='flex size-4 flex-col items-center justify-center overflow-hidden rounded-full'>
            <Image
              src='/medias/images/aureliendupaysdexemple-logo.webp'
              width={16}
              height={16}
              alt='logo'
              priority
            />
          </div>
          <span className='mt-px text-xs font-semibold leading-3 text-background dark:text-foreground'>
            Hello {username} 👋
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const Portal = ({ children }: { children: React.ReactNode }) => {
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
        'relative flex size-full cursor-none flex-col [border-radius:inherit]',
        className
      )}
    >
      <Portal>
        <AnimatePresence>
          {isCursorInside ? (
            <PresenceCursor key={username} x={x} y={y} username={username} />
          ) : null}
        </AnimatePresence>
      </Portal>
      {children}
    </div>
  )
}
