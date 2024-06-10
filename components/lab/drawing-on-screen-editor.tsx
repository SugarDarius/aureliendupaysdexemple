'use client'

import Image from 'next/image'

import { createPortal } from 'react-dom'
import { useEffect, useMemo, useRef, useState } from 'react'

import useEvent from 'react-use-event-hook'

import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

import {
  useBroadcastEvent,
  useEventListener,
  useSelf,
} from '@/liveblocks.config'
import { cn } from '@/lib/utils'

import { PencilIcon } from '@/components/icons/pencil-icon'
import {
  VideoCallFrame,
  ControlButton,
} from '@/components/lab/video-call-frame'
import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'
import {
  type DrawingCanvasRef,
  type DrawingCanvasOnChangeInfos,
  DrawingCanvas,
} from '@/components/lab/drawing-canvas/drawing-canvas'

const PencilCursor = ({
  x,
  y,
  color,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  color: string
}) => (
  <motion.div
    className='pointer-events-none absolute left-0 top-0'
    style={{ x, y }}
  >
    <PencilIcon
      className='size-7 rotate-90 stroke-neutral-800 dark:stroke-neutral-50'
      style={{ fill: color }}
    />
  </motion.div>
)

const Portal = ({ children }: { children: React.ReactNode }) =>
  createPortal(
    <div className='pointer-events-none absolute left-0 top-0 h-screen w-screen'>
      {children}
    </div>,
    document.body
  )

const STROKE_COLOR = '#48AEFF'
const STROKE_WIDTH = 6

const CONNECTION_ID_PUBLIC_METADATA_KEY = 'liveblocks-connection-id'
const CONNECTION_STROKE_COLOR_PUBLIC_METADATA_KEY =
  'liveblocks-connection-stroke-color'

const STROKE_COLORS = [
  '#E57373',
  '#9575CD',
  '#4FC3F7',
  '#81C784',
  '#FFF176',
  '#FF8A65',
  '#F06292',
  '#7986CB',
]

const injectPublicMetadata = (
  paths: SVGPath[],
  currentUserConnectionId: number,
  strokeColor: string
): SVGPath[] => {
  for (const path of paths) {
    const connectionId =
      path.publicMetadata?.[CONNECTION_ID_PUBLIC_METADATA_KEY]

    if (connectionId === undefined) {
      path.publicMetadata = {
        [CONNECTION_ID_PUBLIC_METADATA_KEY]: currentUserConnectionId,
        [CONNECTION_STROKE_COLOR_PUBLIC_METADATA_KEY]: strokeColor,
      }
    }
  }

  return paths
}

const updatePathsColors = (
  paths: SVGPath[],
  currentUserConnectionId: number,
  defaultStrokeColor: string
): SVGPath[] => {
  for (const path of paths) {
    const connectionId =
      path.publicMetadata?.[CONNECTION_ID_PUBLIC_METADATA_KEY]
    if (connectionId && connectionId !== currentUserConnectionId) {
      const strokeColor =
        path.publicMetadata?.[CONNECTION_STROKE_COLOR_PUBLIC_METADATA_KEY]
      if (strokeColor && typeof strokeColor === 'string') {
        path.strokeColor = strokeColor
      }
    } else {
      path.strokeColor = defaultStrokeColor
    }
  }

  return paths
}

export function DrawingOnScreenEditor({ className }: { className?: string }) {
  const currentUserConnectionId = useSelf((user) => user.connectionId)
  const broadcast = useBroadcastEvent()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const canvasRef = useRef<DrawingCanvasRef>(null)
  const frameRequestIdRef = useRef<number>(0)

  const [isCursorInside, setIsCursorInside] = useState<boolean>(false)

  const currentUserStrokeColor = useMemo(
    (): string => STROKE_COLORS[currentUserConnectionId % STROKE_COLORS.length],
    [currentUserConnectionId]
  )

  const handleMouseEnter = useEvent((): void => {
    setIsCursorInside(true)
  })
  const handleMouseLeave = useEvent((): void => {
    setIsCursorInside(false)
  })

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      x.set(e.clientX + window.scrollX)
      y.set(e.clientY + window.scrollY)
    }
  )

  const handleCanvasChange = useEvent(
    (
      paths: SVGPath[],
      {
        isFromSyncOperation,
        isFromDisappearOperation,
      }: DrawingCanvasOnChangeInfos
    ): void => {
      if (!isFromSyncOperation && !isFromDisappearOperation) {
        broadcast({
          type: 'ADD_SVG_PATHS',
          paths: injectPublicMetadata(
            paths,
            currentUserConnectionId,
            currentUserStrokeColor
          ),
        })
      }
    }
  )

  useEventListener(({ event }): void => {
    if (event.type === 'ADD_SVG_PATHS') {
      const paths = updatePathsColors(
        event.paths,
        currentUserConnectionId,
        STROKE_COLOR
      )

      cancelAnimationFrame(frameRequestIdRef.current)
      frameRequestIdRef.current = requestAnimationFrame((): void => {
        if (canvasRef.current) {
          canvasRef.current.sync(paths)
        }
      })
    }
  })

  useEffect(() => {
    return (): void => {
      cancelAnimationFrame(frameRequestIdRef.current)
    }
  }, [])

  return (
    <div className={cn('relative flex h-full w-full flex-col', className)}>
      <VideoCallFrame
        className='animate-in fade-in'
        additionalControls={
          <ControlButton active>
            <PencilIcon className='size-4 fill-none stroke-[1.5px]' />
          </ControlButton>
        }
      >
        <div
          className='relative flex h-full w-full !cursor-none'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className='relative flex h-full w-full'>
            <Image
              src='/medias/images/share-screen-view.webp'
              fill
              alt='shared screen'
              priority
              sizes='900px'
            />
          </div>
          <div className='absolute left-0 top-0 flex h-full w-full'>
            <DrawingCanvas
              ref={canvasRef}
              backgroundColor='transparent'
              className='absolute left-0 top-0'
              width='100%'
              height='100%'
              strokeColor={STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              onChange={handleCanvasChange}
              pathDisappearingTimeoutMs={10 * 1000}
            />
            <Portal>
              <AnimatePresence>
                {isCursorInside ? (
                  <PencilCursor x={x} y={y} color={STROKE_COLOR} />
                ) : null}
              </AnimatePresence>
            </Portal>
          </div>
        </div>
      </VideoCallFrame>
    </div>
  )
}
