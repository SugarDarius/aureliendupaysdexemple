'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

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

  const handleClick = useEvent((index: number): void => {
    onClick(index)
  })

  return (
    <div className='z-10 flex min-h-[40%] flex-col justify-center gap-1.5 rounded-full p-1.5 px-1 py-1.5 opacity-25 backdrop-blur-sm transition-opacity ease-linear group-hover:opacity-100'>
      {dots.map((dot, index) => (
        <div
          key={dot}
          className='0 size-[10px] cursor-pointer rounded-full border border-neutral-700 bg-neutral-50 transition-colors ease-linear hover:bg-neutral-700 data-[selected=true]:bg-neutral-700 dark:border-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-200 dark:data-[selected=true]:bg-neutral-200'
          onClick={(): void => {
            handleClick(index)
          }}
          data-selected={index === selectedIndex}
        />
      ))}
    </div>
  )
}

type Custom = { direction: number; height: number }

const variants = {
  enter: ({ direction, height }: Custom) => ({
    zIndex: 0,
    y: direction > 0 ? height + 100 : (height + 100) * -1,
    scale: 0.85,
  }),
  visible: {
    zIndex: 4,
    y: 0,
    scale: 1,
  },
  exit: ({ direction, height }: Custom) => ({
    zIndex: 0,
    y: direction < 0 ? height + 100 : (height + 100) * -1,
    scale: 0.85,
  }),
}

const Item = ({
  direction,
  size,
  children,
}: {
  direction: number
  size: [number, number]
  children: React.ReactNode
}) => (
  <motion.div
    className='absolute left-0 top-0 flex flex-col'
    style={{ width: size[0], height: size[1] }}
    custom={{ direction, height: size[1] }}
    variants={variants}
    initial='enter'
    animate='visible'
    exit='exit'
    transition={{
      y: { duration: 0.6 },
      scale: { duration: 0.6 },
    }}
  >
    {children}
  </motion.div>
)

export function SmartStack({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const items = React.Children.toArray(children)
  const count = items.length

  const mounted = useMounted()

  const containerRef = useRef<HTMLDivElement>(null)

  const [index, setIndex] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)

  const [containerSize, setContainerSize] = useState<[number, number]>([0, 0])

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
      <div className='absolute left-0 top-0 h-full w-full overflow-hidden !bg-transparent'>
        <div className='absolute left-0 top-0 h-full w-full overflow-hidden rounded-[18px] bg-neutral-800'>
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
        </div>
        <div className='absolute left-0 top-0 h-full w-full overflow-hidden rounded-[16px]'>
          {mounted ? (
            <AnimatePresence initial={false} custom={custom}>
              <Item
                key={'smart-stack-item-' + index}
                direction={direction}
                size={containerSize}
              >
                {items[index] ?? null}
              </Item>
            </AnimatePresence>
          ) : null}
        </div>
        {/* <div className='absolute left-0 top-0 h-full w-full rounded-2xl border bg-cyan-400'></div> */}
      </div>
      {count > 1 ? (
        <div className='absolute right-2 top-0 flex h-full flex-col justify-center'>
          <DotsNavigation
            count={count}
            selectedIndex={index}
            onClick={handleDotClick}
          />
        </div>
      ) : null}
    </div>
  )
}
