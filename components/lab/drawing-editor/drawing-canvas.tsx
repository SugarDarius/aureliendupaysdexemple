'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { nanoid } from 'nanoid'

import type {
  SVGPoint,
  SVGPath,
} from '@/components/lab/drawing-editor/svg-canvas-path'
import { SVGCanvas } from '@/components/lab/drawing-editor/svg-canvas'

export type DrawingCanvasRef = {
  clear: () => void
}

type DrawingCanvasProps = {
  className?: string
  isLocked?: boolean
  width: React.CSSProperties['width']
  height: React.CSSProperties['height']
  backgroundColor: React.CSSProperties['fill']
  strokeColor: string
  strokeWidth: number
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  (
    {
      className,
      isLocked = false,
      width,
      height,
      backgroundColor,
      strokeColor,
      strokeWidth,
    },
    ref
  ) => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [paths, setPaths] = useState<SVGPath[]>([])

    const handleMouseDown = useEvent((point: SVGPoint): void => {
      setIsDrawing(true)
      setPaths((paths) => {
        const id = 'drawing-svg-canvas-path' + nanoid(10)
        const path: SVGPath = {
          id,
          points: [point],
          strokeColor,
          strokeWidth,
          opacity: 1,
        }

        return [...paths, path]
      })
    })

    const handleMouseMove = useEvent((point: SVGPoint): void => {
      if (isDrawing) {
        setPaths((paths) => {
          const path = paths[paths.length - 1]
          path.points = [...path.points, point]

          return [...paths.slice(0, -1), path]
        })
      }
    })

    const handleMouseUp = useEvent((): void => {
      if (isDrawing) {
        setIsDrawing(false)
      }
    })

    useImperativeHandle(ref, () => ({
      clear: (): void => {
        setPaths([])
      },
    }))

    return (
      <SVGCanvas
        className={className}
        isDrawing={isDrawing}
        isLocked={isLocked}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        paths={paths}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    )
  }
)
DrawingCanvas.displayName = 'DrawingCanvas'
