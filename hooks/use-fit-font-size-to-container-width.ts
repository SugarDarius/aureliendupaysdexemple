import { useLayoutEffect, useRef, useState } from 'react'
import { computeFontSizeToFitContainerWidth } from '@/lib/font'

type UseFitFontSizeToContainerWidthReturnType = {
  containerRef: React.RefObject<HTMLDivElement>
  fontSize: number
}

export function useFitFontSizeToContainerWidth(
  text: string
): UseFitFontSizeToContainerWidthReturnType {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState<number>(0)

  useLayoutEffect(() => {
    const handleResize = (): void => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        const fontSize = computeFontSizeToFitContainerWidth(width, text, {
          baseSize: 16,
        })

        setFontSize(Math.round(fontSize))
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  }, [text])

  return { containerRef, fontSize } as const
}
