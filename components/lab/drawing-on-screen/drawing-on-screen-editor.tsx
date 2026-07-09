'use client'

import { shallow } from '@liveblocks/react/suspense'
import { clsx } from 'clsx'
import { motion, useMotionValue, AnimatePresence } from 'motion/react'
import type { MotionValue } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useEvent from 'react-use-event-hook'

import { PencilIcon } from '@/components/icons/pencil-icon'
import { DrawingCanvas } from '@/components/lab/drawing-canvas/drawing-canvas'
import type { DrawingCanvasRef } from '@/components/lab/drawing-canvas/drawing-canvas'
import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'
import {
  useBroadcastEvent,
  useEventListener,
  useLostConnectionListener,
  useSelf,
  useUpdateMyPresence,
  useOthers,
  useErrorListener,
} from '@/components/lab/drawing-on-screen/liveblocks.config'
import type { Participant } from '@/components/lab/video-call-frame'
import {
  VideoCallFrame,
  ControlButton,
} from '@/components/lab/video-call-frame'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

const RoomFullAlert = () => {
  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  const handleGoHomeButtonClick = useEvent((): void => {
    router.push('/')
  })

  // oxlint-disable-next-line promise/prefer-await-to-callbacks
  useErrorListener((err): void => {
    if (err.context.code === 4005) {
      setOpen(true)
    }
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Room is full 😔</AlertDialogTitle>
          <AlertDialogDescription>
            The room has reached is maximum number of participants. Please come
            back in a few minutes 🙂
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleGoHomeButtonClick}>
              Go to Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
    document.body,
  )

const STROKE_COLOR = '#48AEFF'
const STROKE_WIDTH = 6

const PATH_DISAPPEARING_TIMEOUT_MS = 5 * 1000 // 5s

const CONNECTION_ID_PUBLIC_METADATA_KEY = 'liveblocks-connection-id'
const STROKE_COLOR_PUBLIC_METADATA_KEY = 'liveblocks-stroke-color'
const SENT_FLAG_PUBLIC_METADATA_KEY = 'liveblocks-sent-flag'

const getBooleanMetadata = (
  key: string,
  metadata: SVGPath['publicMetadata'] = {},
): boolean => {
  const value = metadata[key]
  if (!(typeof value === 'boolean')) {
    return false
  }

  return value
}

const markPathsAsSent = (paths: SVGPath[]): SVGPath[] =>
  paths.map((path): SVGPath => {
    const metadata = path.publicMetadata ?? {}
    const markedAsSent = getBooleanMetadata(
      SENT_FLAG_PUBLIC_METADATA_KEY,
      metadata,
    )

    if (path.ended && !markedAsSent) {
      metadata[SENT_FLAG_PUBLIC_METADATA_KEY] = true
      path.publicMetadata = { ...metadata }
    }

    return path
  })

const getUnsentPaths = (paths: SVGPath[]): SVGPath[] => {
  const unsentPaths: SVGPath[] = []

  for (const path of paths) {
    const metadata = path.publicMetadata ?? {}
    const markedAsSent = getBooleanMetadata(
      SENT_FLAG_PUBLIC_METADATA_KEY,
      metadata,
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
  defaultStrokeColor: string,
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
    (me) => [
      me.connectionId,
      me.presence.isDrawing,
      me.info.avatarSrc,
      me.info.strokeColor,
    ],
    shallow,
  )

  const otherParticipants = useOthers(
    (others): Participant[] =>
      others.map((other) => ({
        avatarSrc: other.info.avatarSrc,
        id: `participant-${other.connectionId}`,
        isActive: other.presence.isDrawing,
        isCurrentUser: false,
        strokeColor: other.info.strokeColor,
        username: other.info.username,
      })),
    shallow,
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
      avatarSrc: currentUserAvatarSrc,
      id: `participant-${currentUserConnectionId}`,
      isActive: currentUserIsDrawing,
      isCurrentUser: true,
      username: 'Me',
    }

    return [currentParticipant, ...otherParticipants]
  }, [
    currentUserConnectionId,
    currentUserIsDrawing,
    currentUserAvatarSrc,
    otherParticipants,
  ])

  const handleMouseEnter = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      setIsCursorInside(true)

      x.set(e.clientX + window.scrollX)
      y.set(e.clientY + window.scrollY)
    },
  )

  const handleMouseLeave = useEvent((): void => {
    setIsCursorInside(false)
  })

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      x.set(e.clientX + window.scrollX)
      y.set(e.clientY + window.scrollY)
    },
  )

  const handleDrawButtonClick = useEvent((): void => {
    setIsLocked(!isLocked)
  })

  const handleCanvasChange = useEvent((paths: SVGPath[]): void => {
    const unsentPaths = getUnsentPaths(paths)
    const svgPaths = markPathsAsSent(unsentPaths)

    broadcast({
      svgPaths,
      type: 'ADD_SVG_PATHS',
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
        STROKE_COLOR,
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
            tooltipContent={`${isLocked ? 'Enable' : 'Disable'} drawing mode`}
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
              'cursor-none!': !isLocked,
            }),
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
      <RoomFullAlert />
    </div>
  )
}
