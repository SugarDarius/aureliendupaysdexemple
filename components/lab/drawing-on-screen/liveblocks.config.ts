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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Storage = {}

type RoomEvent = {
  type: 'ADD_SVG_PATHS'
  svgPaths: SVGPath[]
}

type Presence = {
  isDrawing: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ThreadMetadata = {}

const client = createClient({
  authEndpoint: '/api/liveblocks-auth-drawing-on-screen',
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
export const { LiveblocksProvider } = createLiveblocksContext(client)
