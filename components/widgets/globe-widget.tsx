'use client'

import { useRef, useEffect } from 'react'
import useEvent from 'react-use-event-hook'

import useSWR, { type Fetcher } from 'swr'

import createGlobe, { type Marker } from 'cobe'
import { useSpring } from 'motion/react'

import { useSwitchColorMode } from '@/hooks/use-switch-color-mode'

const BASE_MARKERS: Marker[] = [{ location: [48.1744, 6.4512], size: 0.1 }]

type Geolocation = { latitude: number; longitude: number }
type GlobeRenderState = Record<string, number | [number, number, number]> & {
  phi: number
  glowColor: [number, number, number]
  dark: number
}
const fetcher: Fetcher<Geolocation, string> = (url: string) =>
  fetch(url).then((res) => res.json())

export function GlobeWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { resolvedTheme } = useSwitchColorMode()
  const { data: geolocationData } = useSWR<Geolocation>(
    '/api/geolocation',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const r = useSpring(3.9, { mass: 1, stiffness: 280, damping: 40 })

  const handleRender = useEvent((state: Record<string, any>): void => {
    const globeState = state as GlobeRenderState
    const isDark = resolvedTheme === 'dark'

    globeState.dark = isDark ? 0 : 1
    globeState.glowColor = isDark ? [0.85, 0.85, 0.85] : [0.15, 0.15, 0.15]

    globeState.phi = r.get()
    r.set(globeState.phi + 0.06)
  })

  useEffect(() => {
    if (canvasRef.current) {
      const markers: Marker[] = BASE_MARKERS
      if (geolocationData) {
        markers.push({
          location: [geolocationData.latitude, geolocationData.longitude],
          size: 0.1,
        })
      }
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
        markers: BASE_MARKERS,
        onRender: handleRender,
      })

      return (): void => {
        globe.destroy()
      }
    }
  }, [geolocationData, handleRender])

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center p-4 max-sm:gap-3'>
      <div className='absolute inset-0 flex size-full flex-col items-center justify-center'>
        <canvas ref={canvasRef} className='h-full w-full' />
      </div>
    </div>
  )
}
