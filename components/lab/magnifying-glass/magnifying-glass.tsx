'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  AnimatePresence,
  useMotionValue,
  motion,
  MotionValue,
  useTransform,
} from 'framer-motion'
import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

import { cn } from '@/lib/utils'
import { useUserAgent } from '@/hooks/use-user-agent'
import { useMounted } from '@/hooks/use-mounted'

import {
  useMagnifyingGlassStore,
  toggleMagnifyingGlass,
} from '@/components/lab/magnifying-glass/magnifying-glass-store'

const GLASS_SIZE = 120

const Glass = ({
  x,
  y,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
}) => (
  <motion.svg
    className={cn(
      'pointer-events-none fixed inset-0 scale-50 rounded-full border-2 bg-[hsl(210_80%_90%/0.05)]',
      '[border-color:color-mix(in_lch,hsl(var(--foreground)),color-mix(in_lch,hsl(var(--background)),hsl(210_10%_40%)),60%)]',
      'shadow-[0px_4px_16px_rgba(17,17,26,0.1),0px_8px_24px_rgba(17,17,26,0.1),0px_16px_56px_rgba(17,17,26,0.1),0px_4px_16px_rgba(17,17,26,0.1)_inset,0px_8px_24px_rgba(17,17,26,0.1)_inset,0px_16px_56px_rgba(17,17,26,0.1)_inset]',
      '[backdrop-filter:url(#magnify-filter)]'
    )}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 100 100'
    fill='none'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.125, ease: 'linear' }}
    exit={{ opacity: 0 }}
    style={{ x, y, width: `${GLASS_SIZE}px`, height: `${GLASS_SIZE}px` }}
  >
    <path
      d='M12.6758 35.6141C14.5653 30.7128 17.4018 26.2318 21.0231 22.4267C24.6445 18.6216 28.9798 15.5671 33.7816 13.4375'
      stroke='color-mix(in lch, white, transparent 35%)'
      strokeWidth='8'
      strokeLinecap='round'
    />
  </motion.svg>
)

const MagnifyFilter = () => (
  <svg
    className='fixed bottom-full left-full'
    preserveAspectRatio='none'
    xmlns='http://www.w3.org/2000/svg'
    style={{ width: `${GLASS_SIZE}px`, height: `${GLASS_SIZE}px` }}
  >
    <defs>
      <filter
        id='magnify-filter'
        width='100%'
        height='100%'
        x='0'
        y='0'
        colorInterpolationFilters='sRGB'
      >
        <feImage
          x='0'
          y='0'
          width='100%'
          height='100%'
          result='FE_IMG'
          href='data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22displacementmap%22%20id%3D%22absolute-displacementmap%22%20width%3D%22256%22%20height%3D%22256%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20.red-gradient%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20url(%23red-gradient)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.blue-gradient%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20url(%23blue-gradient)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mix-blend-mode%3A%20screen%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22red-gradient%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%220%22%20color-interpolation%3D%22sRGB%22%20gradientUnits%3D%22objectBoundingBox%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23FF0000%22%20stop-opacity%3D%221%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23FF0000%22%20stop-opacity%3D%220%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22blue-gradient%22%20x1%3D%220%22%20x2%3D%220%22%20y1%3D%220%22%20y2%3D%221%22%20color-interpolation%3D%22sRGB%22%20gradientUnits%3D%22objectBoundingBox%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230000FF%22%20stop-opacity%3D%221%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230000FF%22%20stop-opacity%3D%220%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22black%22%20%2F%3E%0A%20%20%20%20%3Crect%20id%3D%22red-gradient-rect%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20x%3D%220%22%20y%3D%220%22%20class%3D%22red-gradient%22%2F%3E%0A%20%20%20%20%3Crect%20id%3D%22blue-gradient-rect%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20x%3D%220%22%20y%3D%220%22%20class%3D%22blue-gradient%22%2F%3E%0A%3C%2Fsvg%3E'
        />
        <feDisplacementMap
          in='SourceGraphic'
          in2='FE_IMG'
          xChannelSelector='R'
          yChannelSelector='B'
          scale='50'
        />
      </filter>
    </defs>
  </svg>
)

const Portal = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted()
  if (!mounted) {
    return null
  }

  return createPortal(
    <div className='pointer-events-none absolute left-0 top-0 !z-[999999] h-screen w-screen'>
      {children}
    </div>,
    document.body
  )
}

export function MagnifyingGlass() {
  const [isMouseMoved, setIsMouseMoved] = useState<boolean>(false)

  const { isSafari, isFirefox } = useUserAgent()
  const isActive = useMagnifyingGlassStore((state) => state.isActive)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useTransform(() => mouseX.get() - GLASS_SIZE / 2)
  const y = useTransform(() => mouseY.get() - GLASS_SIZE / 2)

  const handleMouseMove = useEvent((e: MouseEvent): void => {
    mouseX.set(e.clientX + window.scrollX)
    mouseY.set(e.clientY + window.scrollY)

    setIsMouseMoved(true)
  })

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useHotkeys(
    'm',
    (): void => {
      toggleMagnifyingGlass()
    },
    { enabled: !isSafari && !isFirefox }
  )

  useHotkeys(
    'esc',
    (): void => {
      toggleMagnifyingGlass()
    },
    { enabled: isActive }
  )

  return (
    <Portal>
      <MagnifyFilter />
      <AnimatePresence>
        {isActive && isMouseMoved ? <Glass x={x} y={y} /> : null}
      </AnimatePresence>
    </Portal>
  )
}
