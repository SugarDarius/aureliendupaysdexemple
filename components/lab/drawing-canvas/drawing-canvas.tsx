'use client'

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
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
  const mergedPaths = new Map<string, SVGPath>()

  existing.forEach((path) => mergedPaths.set(path.id, path))
  incoming.forEach((path) => mergedPaths.set(path.id, path))

  return Array.from(mergedPaths.values())
}

export type DrawingCanvasRef = {
  clear: () => void
  sync: (paths: SVGPath[]) => void
}

export type DrawingCanvasOnChangeInfos = {
  isSync?: boolean
  isRemove?: boolean
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
  onChange?: (paths: SVGPath[], infos?: DrawingCanvasOnChangeInfos) => void
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
    const frameRequestIdRef = useRef<number>(0)

    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [paths, setPaths] = useState<SVGPath[]>([])

    const updatePaths = useEvent(
      (paths: SVGPath[], changeInfos?: DrawingCanvasOnChangeInfos): void => {
        setPaths(paths)
        onChange?.(paths, changeInfos)
      }
    )

    const syncPaths = useEvent((incomingPaths: SVGPath[]): void => {
      cancelAnimationFrame(frameRequestIdRef.current)
      frameRequestIdRef.current = requestAnimationFrame((): void => {
        const mergedPaths = mergePaths(paths, incomingPaths)

        updatePaths(mergedPaths, {
          isSync: true,
        })
      })
    })

    const handleMouseDown = useEvent((point: SVGPoint): void => {
      setIsDrawing(true)

      const id = 'drawing-svg-canvas-path-' + nanoid(10)
      const path: SVGPath = {
        id,
        points: [point],
        strokeColor,
        strokeWidth,
        ended: false,
        publicMetadata: { ...publicMetadata },
      }

      updatePaths([...paths, path])
      onDrawStart?.()
    })

    const handleMouseMove = useEvent((point: SVGPoint): void => {
      if (isDrawing) {
        const currentPath = paths[paths.length - 1]
        const updatedPath = {
          ...currentPath,
          points: [...currentPath.points, point],
        }

        updatePaths([...paths.slice(0, -1), updatedPath])
      }
    })

    const handleMouseUp = useEvent((): void => {
      if (isDrawing) {
        setIsDrawing(false)

        const currentPath = paths[paths.length - 1]
        const updatedPath = {
          ...currentPath,
          ended: true,
        }

        updatePaths([...paths.slice(0, -1), updatedPath])
        onDrawEnd?.()
      }
    })

    const handleDisappearedPath = useEvent((pathId: string): void => {
      const index = paths.findIndex(({ id }) => id === pathId)
      if (index > -1) {
        updatePaths([...paths.slice(0, index), ...paths.slice(index + 1)], {
          isRemove: true,
        })
      }
    })

    useImperativeHandle(
      ref,
      () => ({
        clear: (): void => {
          updatePaths([])
        },
        sync: (paths: SVGPath[]): void => {
          syncPaths(paths)
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )

    useEffect(() => {
      return (): void => {
        cancelAnimationFrame(frameRequestIdRef.current)
      }
    }, [])

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
