'use client'

import Image from 'next/image'

import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'

import useEvent from 'react-use-event-hook'

import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

import { useBroadcastEvent, useEventListener } from '@/liveblocks.config'
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

export function DrawingOnScreenEditor({ className }: { className?: string }) {
  const broadcast = useBroadcastEvent()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const canvasRef = useRef<DrawingCanvasRef>(null)
  const frameRequestIdRef = useRef<number>(0)

  const [isCursorInside, setIsCursorInside] = useState<boolean>(false)

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
        broadcast({ type: 'ADD_SVG_PATHS', paths })
      }
    }
  )

  useEventListener(({ event }): void => {
    if (event.type === 'ADD_SVG_PATHS') {
      cancelAnimationFrame(frameRequestIdRef.current)
      const paths = event.paths

      // TODO: update colors for incoming paths based on connection ids
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
