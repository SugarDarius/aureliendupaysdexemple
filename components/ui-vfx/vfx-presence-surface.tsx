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
} from 'motion/react'

import { cn, pick } from '@/lib/utils'
import { getRandomUsername } from '@/lib/random-username'

import { useMounted } from '@/hooks/use-mounted'
import { Cursor } from '@/components/ui/cursor'

const CURSOR_COLORS = [
  {
    key: 'violet-700',
    textClass: 'text-violet-700',
    backgroundClass: 'bg-violet-700',
  },
  {
    key: 'orange-600',
    textClass: 'text-orange-600',
    backgroundClass: 'bg-orange-600',
  },
  {
    key: 'sky-600',
    textClass: 'text-sky-600',
    backgroundClass: 'bg-sky-600',
  },
  {
    key: 'fuchsia-500',
    textClass: 'text-fuchsia-500',
    backgroundClass: 'bg-fuchsia-500',
  },
] as const

type CursorColor = (typeof CURSOR_COLORS)[number]

const getRandomCursorColor = (
  previousCursorColor: CursorColor | null
): CursorColor => {
  const cursorColor = pick(CURSOR_COLORS)
  if (
    previousCursorColor === null ||
    previousCursorColor.key !== cursorColor.key
  ) {
    return cursorColor
  }

  return getRandomCursorColor(previousCursorColor)
}

const PresenceCursor = ({
  x,
  y,
  username,
  color,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  username: string
  color: CursorColor
}) => {
  return (
    <motion.div
      className='pointer-events-none absolute left-0 top-0 z-10'
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='flex flex-row gap-1'>
        <Cursor className={cn('size-5', color.textClass)} />
        <motion.div
          className={cn(
            '-ml-2.5 mt-3 flex h-7 flex-row items-center gap-1.5 rounded-full pl-1.5 pr-2',
            color.backgroundClass
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
  disabled,
  children,
}: {
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}) {
  const surfaceRef = useRef<HTMLDivElement>(null)
  const previousCursorColorRef = useRef<CursorColor | null>(null)

  const [isCursorInside, setIsCursorInside] = useState<boolean>(false)
  const [cursorColor, setCursorColor] = useState<CursorColor | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!disabled) {
        x.set(e.clientX + window.scrollX)
        y.set(e.clientY + window.scrollY)
      }
    }
  )

  const handleMouseEnter = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!disabled) {
        const nextCursorColor = getRandomCursorColor(
          previousCursorColorRef.current
        )
        previousCursorColorRef.current = nextCursorColor

        setIsCursorInside(true)
        setCursorColor(nextCursorColor)

        x.set(e.clientX + window.scrollX)
        y.set(e.clientY + window.scrollY)
      }
    }
  )

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
        'relative flex size-full cursor-none flex-col rounded-[inherit]',
        className
      )}
    >
      <Portal>
        <AnimatePresence>
          {isCursorInside && cursorColor ? (
            <PresenceCursor
              key={username}
              x={x}
              y={y}
              username={username}
              color={cursorColor}
            />
          ) : null}
        </AnimatePresence>
      </Portal>
      {children}
    </div>
  )
}
