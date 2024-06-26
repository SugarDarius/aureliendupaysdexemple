'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  type SVGPoint,
  type SVGPath,
  SVGCanvasPath,
} from '@/components/lab/drawing-canvas/svg-canvas-path'

const SVG_CANVAS_ID = 'drawing-svg-canvas'

const getPointFromEvent = (
  event: React.MouseEvent<HTMLDivElement>,
  containerPosition: [number, number]
): SVGPoint => ({
  x: event.pageX - containerPosition[1] - window.scrollX,
  y: event.pageY - containerPosition[0] - window.scrollY,
})

export function SVGCanvas({
  className,
  isDrawing,
  isLocked,
  width,
  height,
  backgroundColor,
  curveSmoothing,
  pathDisappearingTimeoutMs,
  paths,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onDisappearedPath,
}: {
  className?: string
  isLocked: boolean
  isDrawing: boolean
  width: React.CSSProperties['width']
  height: React.CSSProperties['height']
  backgroundColor: React.CSSProperties['fill']
  curveSmoothing: number
  pathDisappearingTimeoutMs: number | null
  paths: SVGPath[]
  onMouseDown: (point: SVGPoint, viewBox: [number, number]) => void
  onMouseMove: (point: SVGPoint) => void
  onMouseUp: () => void
  onDisappearedPath: (pathId: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewBox, setViewBox] = useState<[number, number]>([0, 0])
  const [containerPosition, setContainerPosition] = useState<[number, number]>([
    0, 0,
  ])

  const handleMouseDown = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!isLocked && e.button === 0) {
        const point = getPointFromEvent(e, containerPosition)
        onMouseDown(point, viewBox)
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

  const handleMouseUp = useEvent(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent): void => {
      if (!isLocked && e.button === 0) {
        onMouseUp()
      }
    }
  )

  useLayoutEffect(() => {
    const handleResize = (): void => {
      if (containerRef.current) {
        const { width, height, top, left } =
          containerRef.current.getBoundingClientRect()

        setViewBox([width, height])
        setContainerPosition([top, left])
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    document.addEventListener('mouseup', handleMouseUp)

    return (): void => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mouseup', handleMouseUp)
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
      <svg
        id={SVG_CANVAS_ID}
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
        className='h-full w-full select-none'
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
            <SVGCanvasPath
              key={path.id}
              {...path}
              curveSmoothing={curveSmoothing}
              pathDisappearingTimeoutMs={pathDisappearingTimeoutMs}
              svgViewBox={viewBox}
              onDisappeared={onDisappearedPath}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
