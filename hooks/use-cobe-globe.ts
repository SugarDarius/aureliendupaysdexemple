import { useEffect, useRef } from 'react'
import useEvent from 'react-use-event-hook'

import createGlobe from 'cobe'
import { useSpring } from 'framer-motion'

type UseCobeGlobeReturnType = {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function useCobeGlobe(): UseCobeGlobeReturnType {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const r = useSpring(0, { mass: 1, stiffness: 280, damping: 40 })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRender = useEvent((state: Record<string, any>): void => {
    state.phi = r.get()
    r.set(state.phi + 0.06)
  })

  useEffect(() => {
    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: canvasRef.current.offsetWidth * 2,
        height: canvasRef.current.offsetWidth * 2,
        phi: 0,
        theta: 0.7,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [{ location: [48.1744, 6.4512], size: 0.1 }],
        onRender: handleRender,
      })

      return (): void => {
        globe.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { canvasRef } as const
}
