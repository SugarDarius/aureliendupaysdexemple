import { createClient } from '@liveblocks/client'
import { createLiveblocksContext, createRoomContext } from '@liveblocks/react'

import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

export type UserMeta = {
  id: string
  info: {
    username: string
    avatarSrc: string
    strokeColor: string
  }
}

type Storage = Record<string, never>

type RoomEvent = {
  type: 'ADD_SVG_PATHS'
  svgPaths: SVGPath[]
}

type Presence = {
  isDrawing: boolean
}

type ThreadMetadata = Record<string, never>

const client = createClient({
  authEndpoint: '/api/liveblocks-auth-drawing-on-screen',
  throttle: 16, // 60fps
})

export const {
  suspense: {
    RoomProvider,
    useBroadcastEvent,
    useEventListener,
    useLostConnectionListener,
    useSelf,
    useUpdateMyPresence,
    useOthers,
    useErrorListener,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
)
export const {
  suspense: { LiveblocksProvider },
} = createLiveblocksContext(client)
