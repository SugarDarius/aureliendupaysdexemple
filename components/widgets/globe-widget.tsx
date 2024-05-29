'use client'

import { useRef, useEffect } from 'react'
import useEvent from 'react-use-event-hook'
import { useTheme } from 'next-themes'

import createGlobe from 'cobe'
import { useSpring } from 'framer-motion'

export function GlobeWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { resolvedTheme } = useTheme()
  const r = useSpring(3.9, { mass: 1, stiffness: 280, damping: 40 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRender = useEvent((state: Record<string, any>): void => {
    const isDark = resolvedTheme === 'dark'

    state.dark = isDark ? 0 : 1
    state.glowColor = isDark ? [0.85, 0.85, 0.85] : [0.15, 0.15, 0.15]

    state.phi = r.get()
    r.set(state.phi + 0.06)
  })

  useEffect(() => {
    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: canvasRef.current.offsetWidth * 3,
        height: canvasRef.current.offsetWidth * 3,
        phi: 3.9,
        theta: 0.96,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 3,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.8, 1],
        glowColor: [0.15, 0.15, 0.15],
        markers: [{ location: [48.1744, 6.4512], size: 0.1 }],
        onRender: handleRender,
      })

      return (): void => {
        globe.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center p-4 max-sm:gap-3'>
      <div className='absolute inset-0 flex size-full flex-col items-center justify-center'>
        <canvas ref={canvasRef} className='h-full w-full' />
      </div>
    </div>
  )
}
