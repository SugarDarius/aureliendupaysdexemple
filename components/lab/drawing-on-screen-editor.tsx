'use client'

import Image from 'next/image'

import { createPortal } from 'react-dom'
import { useMemo, useRef, useState } from 'react'

import useEvent from 'react-use-event-hook'

import { clsx } from 'clsx'
import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'

import {
  useBroadcastEvent,
  useEventListener,
  useLostConnectionListener,
  useSelf,
  useUpdateMyPresence,
  shallow,
  useOthers,
} from '@liveblocks/react/suspense'

import { cn } from '@/lib/utils'

import { PencilIcon } from '@/components/icons/pencil-icon'
import {
  VideoCallFrame,
  Participant,
  ControlButton,
} from '@/components/lab/video-call-frame'
import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'
import {
  type DrawingCanvasRef,
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

const PATH_DISAPPEARING_TIMEOUT_MS = 10 * 1000 // 10s

const CONNECTION_ID_PUBLIC_METADATA_KEY = 'liveblocks-connection-id'
const STROKE_COLOR_PUBLIC_METADATA_KEY = 'liveblocks-stroke-color'
const SENT_FLAG_PUBLIC_METADATA_KEY = 'liveblocks-sent-flag'

const getBooleanMetadata = (
  metadata: SVGPath['publicMetadata'] = {},
  key: string
): boolean => {
  const value = metadata[key]
  if (!(typeof value === 'boolean')) {
    return false
  }

  return value
}

const markPathsAsSent = (paths: SVGPath[]): SVGPath[] => {
  return paths.map((path): SVGPath => {
    const metadata = path.publicMetadata ?? {}
    const markedAsSent = getBooleanMetadata(
      metadata,
      SENT_FLAG_PUBLIC_METADATA_KEY
    )

    if (path.ended && !markedAsSent) {
      metadata[SENT_FLAG_PUBLIC_METADATA_KEY] = true
      path.publicMetadata = { ...metadata }
    }

    return path
  })
}

const getUnsentPaths = (paths: SVGPath[]): SVGPath[] => {
  const unsentPaths: SVGPath[] = []

  for (const path of paths) {
    const metadata = path.publicMetadata ?? {}
    const markedAsSent = getBooleanMetadata(
      metadata,
      SENT_FLAG_PUBLIC_METADATA_KEY
    )

    if (!markedAsSent) {
      unsentPaths.push(path)
    }
  }

  return unsentPaths
}

const updatePathsStrokeColor = (
  paths: SVGPath[],
  currentUserConnectionId: number,
  defaultStrokeColor: string
): SVGPath[] => {
  for (const path of paths) {
    const connectionId =
      path.publicMetadata?.[CONNECTION_ID_PUBLIC_METADATA_KEY]
    if (connectionId && connectionId !== currentUserConnectionId) {
      const strokeColor =
        path.publicMetadata?.[STROKE_COLOR_PUBLIC_METADATA_KEY]
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
  const [
    currentUserConnectionId,
    currentUserIsDrawing,
    currentUserAvatarSrc,
    currentUserStrokeColor,
  ] = useSelf(
    (user) => [
      user.connectionId,
      user.presence.isDrawing,
      user.info.avatarSrc,
      user.info.strokeColor,
    ],
    shallow
  )

  const otherParticipants = useOthers(
    (others): Participant[] =>
      others.map((other) => ({
        id: `participant-${other.connectionId}`,
        isActive: other.presence.isDrawing,
        isCurrentUser: false,
        avatarSrc: other.info.avatarSrc,
        strokeColor: other.info.strokeColor,
      })),
    shallow
  )

  const updateMyPresence = useUpdateMyPresence()

  const broadcast = useBroadcastEvent()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const canvasRef = useRef<DrawingCanvasRef>(null)
  const [isCursorInside, setIsCursorInside] = useState<boolean>(false)

  const [isLocked, setIsLocked] = useState<boolean>(false)

  const participants: Participant[] = useMemo(() => {
    const currentParticipant: Participant = {
      id: `participant-${currentUserConnectionId}`,
      isActive: currentUserIsDrawing,
      isCurrentUser: true,
      avatarSrc: currentUserAvatarSrc,
    }

    return [currentParticipant, ...otherParticipants]
  }, [
    currentUserConnectionId,
    currentUserIsDrawing,
    currentUserAvatarSrc,
    otherParticipants,
  ])

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

  const handleDrawButtonClick = useEvent((): void => {
    setIsLocked(!isLocked)
  })

  const handleCanvasChange = useEvent((paths: SVGPath[]): void => {
    const unsentPaths = getUnsentPaths(paths)
    const svgPaths = markPathsAsSent(unsentPaths)

    broadcast({
      type: 'ADD_SVG_PATHS',
      svgPaths: svgPaths,
    })
  })

  const handleDrawStart = useEvent((): void => {
    updateMyPresence({ isDrawing: true })
  })

  const handleDrawEnd = useEvent((): void => {
    updateMyPresence({ isDrawing: false })
  })

  useEventListener(({ event }): void => {
    if (canvasRef.current && event.type === 'ADD_SVG_PATHS') {
      const paths = updatePathsStrokeColor(
        event.svgPaths,
        currentUserConnectionId,
        STROKE_COLOR
      )

      canvasRef.current.sync(paths)
    }
  })

  useLostConnectionListener((event): void => {
    if (event === 'lost') {
      canvasRef.current?.clear()
    }
  })

  return (
    <div className={cn('relative flex h-full w-full flex-col', className)}>
      <VideoCallFrame
        className='animate-in fade-in'
        additionalControls={
          <ControlButton
            active={!isLocked}
            tooltipContent={
              <>{`${isLocked ? 'Enable' : 'Disable'} drawing mode`}</>
            }
            onClick={handleDrawButtonClick}
          >
            <PencilIcon className='size-4 fill-none stroke-[1.5px]' />
          </ControlButton>
        }
        participants={participants}
      >
        <div
          className={cn(
            'relative flex h-full w-full',
            clsx({
              '!cursor-none': !isLocked,
            })
          )}
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
              isLocked={isLocked}
              backgroundColor='transparent'
              className='absolute left-0 top-0'
              width='100%'
              height='100%'
              strokeColor={STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              onChange={handleCanvasChange}
              onDrawStart={handleDrawStart}
              onDrawEnd={handleDrawEnd}
              pathDisappearingTimeoutMs={PATH_DISAPPEARING_TIMEOUT_MS}
              publicMetadata={{
                [CONNECTION_ID_PUBLIC_METADATA_KEY]: currentUserConnectionId,
                [STROKE_COLOR_PUBLIC_METADATA_KEY]: currentUserStrokeColor,
              }}
            />
            <Portal>
              <AnimatePresence>
                {isCursorInside && !isLocked ? (
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
