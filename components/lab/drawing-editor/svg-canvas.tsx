'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { useMounted } from '@/hooks/use-mounted'

import {
  type SVGPoint,
  type SVGPath,
  SVGCanvasPath,
} from '@/components/lab/drawing-editor/svg-canvas-path'

const SVG_CANVAS_ID = 'drawing-svg-canvas'

const getPointFromEvent = (
  event: React.MouseEvent<HTMLDivElement>,
  containerPosition: [number, number]
): SVGPoint => ({
  x: event.pageX - containerPosition[0] - window.scrollX,
  y: event.pageX - containerPosition[1] - window.scrollY,
})

export function SVGCanvas({
  className,
  isDrawing,
  isLocked,
  width,
  height,
  backgroundColor,
  paths,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: {
  className?: string
  isLocked: boolean
  isDrawing: boolean
  width: React.CSSProperties['width']
  height: React.CSSProperties['height']
  backgroundColor: React.CSSProperties['fill']
  paths: SVGPath[]
  onMouseDown: (point: SVGPoint) => void
  onMouseMove: (point: SVGPoint) => void
  onMouseUp: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState<[number, number]>([0, 0])
  const [containerPosition, setContainerPosition] = useState<[number, number]>([
    0, 0,
  ])

  const mounted = useMounted()

  const handleMouseDown = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!isLocked) {
        const point = getPointFromEvent(e, containerPosition)
        onMouseDown(point)
      }
    }
  )

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!isLocked && isDrawing) {
        const point = getPointFromEvent(e, containerPosition)
        onMouseMove(point)
      }
    }
  )

  const handleMouseUp = useEvent((): void => {
    if (!isLocked) {
      onMouseUp()
    }
  })

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { width, height, top, left } =
        containerRef.current.getBoundingClientRect()
      setContainerSize([width, height])
      setContainerPosition([top, left])

      document.addEventListener('mouseup', handleMouseUp)

      return (): void => {
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {mounted ? (
        <svg
          id={SVG_CANVAS_ID}
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`0 0 ${containerSize[0]} ${containerSize[1]}`}
        >
          <g id={`${SVG_CANVAS_ID}-background-group`}>
            <rect
              id={`${SVG_CANVAS_ID}-background-rect`}
              x='0'
              y='0'
              width='100%'
              height='100%'
              fill={backgroundColor}
            />
          </g>
          <g id={`${SVG_CANVAS_ID}-paths-group`}>
            {paths.map((path: SVGPath) => (
              <SVGCanvasPath key={path.id} {...path} />
            ))}
          </g>
        </svg>
      ) : null}
    </div>
  )
}
