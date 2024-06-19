'use client'

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { nanoid } from 'nanoid'

import type {
  SVGPoint,
  SVGPath,
} from '@/components/lab/drawing-canvas/svg-canvas-path'
import { SVGCanvas } from '@/components/lab/drawing-canvas/svg-canvas'

const DEFAULT_CURVE_SMOOTHING = 0.4
const DEFAULT_PATH_DISAPPEARING_TIMEOUT_MS = 5000

const mergePaths = (existing: SVGPath[], incoming: SVGPath[]): SVGPath[] => {
  const allPaths = [...existing, ...incoming]
  const mergedPaths = new Map<string, SVGPath>()

  allPaths.forEach((path) => {
    mergedPaths.set(path.id, path)
  })

  return Array.from(mergedPaths.values())
}

export type DrawingCanvasRef = {
  clear: () => void
  sync: (paths: SVGPath[]) => void
}

type DrawingCanvasProps = {
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
    ref
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
      setPaths((paths) => {
        const mergedPaths = mergePaths(paths, incomingPaths)
        return mergedPaths
      })
      setShouldNotifyChanges(false)
    })

    const notifyChanges = useEvent((paths: SVGPath[]): void => {
      onChange?.(paths)
    })

    const handleMouseDown = useEvent(
      (point: SVGPoint, originViewBox: [number, number]): void => {
        setIsDrawing(true)
        onDrawStart?.()

        const id = 'drawing-svg-canvas-path-' + nanoid(10)
        const path: SVGPath = {
          id,
          points: [point],
          strokeColor,
          strokeWidth,
          ended: false,
          originViewBox,
          publicMetadata: { ...publicMetadata },
        }

        setCurrentPathId(id)
        setShouldNotifyChanges(true)
        setPaths((paths) => [...paths, path])
      }
    )

    const handleMouseMove = useEvent((point: SVGPoint): void => {
      if (isDrawing && currentPathId !== null) {
        setShouldNotifyChanges(true)
        setPaths((paths) => {
          const currentPathIndex = paths.findIndex(
            (path) => path.id === currentPathId
          )
          if (currentPathIndex >= 0) {
            const currentPath = paths[currentPathIndex]
            const updatedPath = {
              ...currentPath,
              points: [...currentPath.points, point],
            }

            return [
              ...paths.slice(0, currentPathIndex),
              updatedPath,
              ...paths.slice(currentPathIndex + 1),
            ]
          }

          return paths
        })
      }
    })

    const handleMouseUp = useEvent((): void => {
      if (isDrawing && currentPathId !== null) {
        setIsDrawing(false)
        onDrawEnd?.()

        setShouldNotifyChanges(true)
        setPaths((paths) => {
          const currentPathIndex = paths.findIndex(
            (path) => path.id === currentPathId
          )
          if (currentPathIndex >= 0) {
            const currentPath = paths[currentPathIndex]
            const updatedPath = {
              ...currentPath,
              ended: true,
            }

            return [
              ...paths.slice(0, currentPathIndex),
              updatedPath,
              ...paths.slice(currentPathIndex + 1),
            ]
          }

          return paths
        })
        setCurrentPathId(null)
      }
    })

    const handleDisappearedPath = useEvent((pathId: string): void => {
      setShouldNotifyChanges(false)
      setPaths((paths) => {
        const index = paths.findIndex(({ id }) => id === pathId)
        if (index > -1) {
          return [...paths.slice(0, index), ...paths.slice(index + 1)]
        }

        return paths
      })
    })

    useImperativeHandle(
      ref,
      () => ({
        clear: (): void => {
          clearPaths()
        },
        sync: (paths: SVGPath[]): void => {
          syncPaths(paths)
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
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
  }
)
DrawingCanvas.displayName = 'DrawingCanvas'
