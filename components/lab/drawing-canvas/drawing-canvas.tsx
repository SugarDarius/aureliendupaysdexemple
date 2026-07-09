'use client'

import { nanoid } from 'nanoid'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { SVGCanvas } from '@/components/lab/drawing-canvas/svg-canvas'
import type {
  SVGPoint,
  SVGPath,
} from '@/components/lab/drawing-canvas/svg-canvas-path'

const DEFAULT_CURVE_SMOOTHING = 0.4
const DEFAULT_PATH_DISAPPEARING_TIMEOUT_MS = 5000

const mergePaths = (existing: SVGPath[], incoming: SVGPath[]): SVGPath[] => {
  const allPaths = [...existing, ...incoming]
  const mergedPaths = new Map<string, SVGPath>()

  for (const path of allPaths) {
    mergedPaths.set(path.id, path)
  }

  return [...mergedPaths.values()]
}

export interface DrawingCanvasRef {
  clear: () => void
  sync: (paths: SVGPath[]) => void
}

interface DrawingCanvasProps {
  className?: string
  isLocked?: boolean
  width: React.CSSProperties['width']
  height: React.CSSProperties['height']
  backgroundColor: React.CSSProperties['fill']
  strokeColor: string
  strokeWidth: number
  curveSmoothing?: number
  pathDisappearingTimeoutMs?: number | null
  publicMetadata?: SVGPath['publicMetadata']
  onChange?: (paths: SVGPath[]) => void
  onDrawStart?: () => void
  onDrawEnd?: () => void
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
      curveSmoothing = DEFAULT_CURVE_SMOOTHING,
      pathDisappearingTimeoutMs = DEFAULT_PATH_DISAPPEARING_TIMEOUT_MS,
      publicMetadata,
      onChange,
      onDrawStart,
      onDrawEnd,
    },
    ref,
  ) => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false)

    const [currentPathId, setCurrentPathId] = useState<string | null>(null)
    const [paths, setPaths] = useState<SVGPath[]>([])

    const [shouldNotifyChanges, setShouldNotifyChanges] =
      useState<boolean>(false)

    const clearPaths = useEvent((): void => {
      setPaths([])
      setShouldNotifyChanges(false)
    })

    const syncPaths = useEvent((incomingPaths: SVGPath[]): void => {
      setPaths((previousPaths) => {
        const mergedPaths = mergePaths(previousPaths, incomingPaths)
        return mergedPaths
      })
      setShouldNotifyChanges(false)
    })

    const notifyChanges = useEvent((updatedPaths: SVGPath[]): void => {
      onChange?.(updatedPaths)
    })

    const handleMouseDown = useEvent(
      (point: SVGPoint, originViewBox: [number, number]): void => {
        setIsDrawing(true)
        onDrawStart?.()

        const id = `drawing-svg-canvas-path-${nanoid(10)}`
        const path: SVGPath = {
          ended: false,
          id,
          originViewBox,
          points: [point],
          publicMetadata: { ...publicMetadata },
          strokeColor,
          strokeWidth,
        }

        setCurrentPathId(id)
        setShouldNotifyChanges(true)
        setPaths((previousPaths) => [...previousPaths, path])
      },
    )

    const handleMouseMove = useEvent((point: SVGPoint): void => {
      if (isDrawing && currentPathId !== null) {
        setShouldNotifyChanges(true)
        setPaths((previousPaths) => {
          const currentPathIndex = previousPaths.findIndex(
            (path) => path.id === currentPathId,
          )
          if (currentPathIndex !== -1) {
            const currentPath = previousPaths[currentPathIndex]
            const updatedPath = {
              ...currentPath,
              points: [...currentPath.points, point],
            }

            return [
              ...previousPaths.slice(0, currentPathIndex),
              updatedPath,
              ...previousPaths.slice(currentPathIndex + 1),
            ]
          }

          return previousPaths
        })
      }
    })

    const handleMouseUp = useEvent((): void => {
      if (isDrawing && currentPathId !== null) {
        setIsDrawing(false)
        onDrawEnd?.()

        setShouldNotifyChanges(true)
        setPaths((previousPaths) => {
          const currentPathIndex = paths.findIndex(
            (path) => path.id === currentPathId,
          )
          if (currentPathIndex !== -1) {
            const currentPath = previousPaths[currentPathIndex]
            const updatedPath = {
              ...currentPath,
              ended: true,
            }

            return [
              ...previousPaths.slice(0, currentPathIndex),
              updatedPath,
              ...previousPaths.slice(currentPathIndex + 1),
            ]
          }

          return previousPaths
        })
        setCurrentPathId(null)
      }
    })

    const handleDisappearedPath = useEvent((pathId: string): void => {
      setShouldNotifyChanges(false)
      setPaths((previousPaths) => {
        const index = previousPaths.findIndex(({ id }) => id === pathId)
        if (index !== -1) {
          return [
            ...previousPaths.slice(0, index),
            ...previousPaths.slice(index + 1),
          ]
        }

        return previousPaths
      })
    })

    useImperativeHandle(
      ref,
      () => ({
        clear: (): void => {
          clearPaths()
        },
        sync: (previousPaths: SVGPath[]): void => {
          syncPaths(previousPaths)
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    useEffect(() => {
      if (shouldNotifyChanges) {
        notifyChanges(paths)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paths, shouldNotifyChanges])

    return (
      <SVGCanvas
        className={className}
        isDrawing={isDrawing}
        isLocked={isLocked}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        curveSmoothing={curveSmoothing}
        pathDisappearingTimeoutMs={pathDisappearingTimeoutMs}
        paths={paths}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDisappearedPath={handleDisappearedPath}
      />
    )
  },
)
DrawingCanvas.displayName = 'DrawingCanvas'
