import { useEffect, useRef } from 'react'
import useEvent from 'react-use-event-hook'

import createGlobe from 'cobe'
import { useSpring } from 'framer-motion'

import { useTheme } from 'next-themes'

type UseCobeGlobeReturnType = {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function useCobeGlobe(): UseCobeGlobeReturnType {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const size = useRef<number>(0)

  const { resolvedTheme } = useTheme()
  const r = useSpring(0, { mass: 1, stiffness: 280, damping: 40 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRender = useEvent((state: Record<string, any>): void => {
    state.phi = r.get()
    r.set(state.phi + 0.06)

    state.width = size.current
    state.height = size.current
    state.dark = resolvedTheme === 'dark' ? 1 : 0
  })

  const handleResize = useEvent((): void => {
    if (canvasRef.current) {
      size.current = canvasRef.current.offsetWidth * 2
    }
  })

  useEffect(() => {
    if (canvasRef.current) {
      size.current = canvasRef.current.offsetWidth * 2
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: size.current,
        height: size.current,
        phi: 0,
        theta: 0.7,
        dark: resolvedTheme === 'dark' ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [{ location: [48.1744, 6.4512], size: 0.1 }],
        onRender: handleRender,
      })

      window.addEventListener('resize', handleResize)
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = '1'
        }
      })

      return (): void => {
        globe.destroy()
        window.removeEventListener('resize', handleResize)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { canvasRef } as const
}
