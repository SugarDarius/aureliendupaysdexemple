'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  motion,
  AnimatePresence,
  type PanInfo,
  type Variants,
  type Transition,
} from 'motion/react'

import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

const DotNavigationItem = ({
  dot,
  selectedIndex,
  onClick,
}: {
  dot: string
  selectedIndex: number
  onClick: (index: number) => void
}) => {
  const index = parseInt(dot.split('-').pop() ?? '-1')
  const handleClick = useEvent((): void => {
    onClick(index)
  })

  const selected = index === selectedIndex

  return (
    <div
      className='0 size-[10px] cursor-pointer rounded-full border border-neutral-700 bg-neutral-50 transition-colors ease-linear hover:bg-neutral-600 data-[selected=true]:bg-neutral-700 dark:border-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-100 dark:data-[selected=true]:bg-neutral-200'
      onClick={handleClick}
      data-selected={selected}
    />
  )
}

const DotsNavigation = ({
  count,
  selectedIndex,
  onClick,
}: {
  count: number
  selectedIndex: number
  onClick: (index: number) => void
}) => {
  const dots = Array.from(
    { length: count },
    (_, i) => 'dot-navigation-item-' + i
  )

  return (
    <div className='absolute right-2 top-0 flex h-full flex-col justify-center'>
      <div className='z-10 flex flex-col justify-center gap-1.5 rounded-full p-1 opacity-25 backdrop-blur-sm transition-opacity ease-linear group-hover:opacity-100'>
        {dots.map((dot) => (
          <DotNavigationItem
            key={dot}
            dot={dot}
            selectedIndex={selectedIndex}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  )
}

type Custom = { direction: number; height: number }

const variants: Variants = {
  enter: ({ direction, height }: Custom) => ({
    zIndex: 0,
    y: direction > 0 ? height + 100 : (height + 100) * -1,
    scale: 0.65,
    rotateX: direction > 0 ? -45 : 45,
  }),
  visible: {
    zIndex: 4,
    y: 0,
    scale: 1,
    rotateX: 0,
  },
  exit: ({ direction, height }: Custom) => ({
    zIndex: 0,
    y: direction < 0 ? height + 100 : (height + 100) * -1,
    scale: 0.65,
    rotateX: direction < 0 ? -45 : 45,
  }),
}

const transition: Transition = {
  y: { duration: 0.6 },
  scale: { duration: 0.6 },
}

type ItemProps = {
  direction: number
  size: [number, number]
  children: React.ReactNode
  onClickCapture: (e: React.MouseEvent<HTMLDivElement>) => void
  onDragStart: () => void
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      direction,
      size,
      children,
      onDragStart,
      onDragEnd,
      onClickCapture,
    }: ItemProps,
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className='absolute left-0 top-0 flex flex-col'
        style={{
          width: size[0],
          height: size[1],
        }}
        custom={{ direction, height: size[1] }}
        variants={variants}
        initial='enter'
        animate='visible'
        exit='exit'
        transition={transition}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClickCapture={onClickCapture}
      >
        <div className='flex h-full w-full flex-col'>{children}</div>
      </motion.div>
    )
  }
)

Item.displayName = 'SmartStackItem'

const SWIPE_DISTANCE_THRESHOLD = 600
const getSwipeDistance = (offset: number, velocity: number): number =>
  Math.abs(offset) * velocity

const getNextIndex = (
  direction: number,
  index: number,
  maxIndex: number
): number => {
  let nextIndex = 0

  if (direction < 0) {
    nextIndex = index - 1
    return nextIndex < 0 ? maxIndex : nextIndex
  } else if (direction > 0) {
    nextIndex = index + 1
    return nextIndex > maxIndex ? 0 : nextIndex
  }

  return nextIndex
}

export function SmartStack({
  className,
  roundedValuePx = 0,
  children,
}: {
  className?: string
  roundedValuePx?: number
  children: React.ReactNode
}) {
  const items = React.Children.toArray(children)
  const count = items.length

  const mounted = useMounted()

  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)

  const [index, setIndex] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)

  const [containerSize, setContainerSize] = useState<[number, number]>([0, 0])

  const handleDragStart = useEvent((): void => {
    isDraggingRef.current = true
  })

  const handleDragEnd = useEvent(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      const { offset, velocity } = info

      const maxIndex = count - 1
      const distance = getSwipeDistance(offset.y, velocity.y)

      if (distance < -SWIPE_DISTANCE_THRESHOLD) {
        const nextIndex = getNextIndex(1, index, maxIndex)
        setIndex(nextIndex)
        setDirection(1)
      } else if (distance > SWIPE_DISTANCE_THRESHOLD) {
        const nextIndex = getNextIndex(-1, index, maxIndex)
        setIndex(nextIndex)
        setDirection(-1)
      }

      isDraggingRef.current = false
    }
  )

  const handleCaptureClick = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (isDraggingRef.current) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  )

  const handleDotClick = useEvent((nextIndex: number): void => {
    if (index !== nextIndex) {
      if (nextIndex < index) {
        setDirection(-1)
      } else if (nextIndex > index) {
        setDirection(1)
      }
      setIndex(nextIndex)
    }
  })

  useLayoutEffect(() => {
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
  }, [])

  const custom = { direction, height: containerSize[1] }

  return (
    <div
      ref={containerRef}
      className={cn('group relative flex flex-col', className)}
    >
      <div
        className='absolute left-0 top-0 h-full w-full overflow-hidden bg-transparent!'
        style={{ borderRadius: roundedValuePx }}
      >
        <div
          className='absolute left-0 top-0 h-full w-full overflow-hidden bg-neutral-700 dark:bg-neutral-800'
          style={{ borderRadius: roundedValuePx > 0 ? roundedValuePx + 2 : 0 }}
        >
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-900 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]' />
        </div>
        <div
          className='absolute left-0 top-0 h-full w-full overflow-hidden'
          style={{ borderRadius: roundedValuePx }}
        >
          {mounted ? (
            <div className='absolute left-0 top-0 h-full w-full animate-in fade-in [&_a]:user-drag-none [&_img]:user-drag-none'>
              <AnimatePresence initial={false} custom={custom} mode='popLayout'>
                <Item
                  key={'smart-stack-item-' + index}
                  direction={direction}
                  size={containerSize}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClickCapture={handleCaptureClick}
                >
                  {items[index] ?? null}
                </Item>
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>
      {count > 1 ? (
        <DotsNavigation
          count={count}
          selectedIndex={index}
          onClick={handleDotClick}
        />
      ) : null}
    </div>
  )
}
