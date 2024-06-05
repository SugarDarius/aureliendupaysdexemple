import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

import { env } from '@/config/env'
import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

const client = createClient({
  publicApiKey: env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
})

// eslint-disable-next-line @typescript-eslint/ban-types
type Presence = {}
// eslint-disable-next-line @typescript-eslint/ban-types
type Storage = {}
// eslint-disable-next-line @typescript-eslint/ban-types
type UserMeta = {}

type RoomEvent = {
  type: 'ADD_SVG_PATHS'
  paths: SVGPath[]
}

export const {
  suspense: { RoomProvider, useBroadcastEvent, useEventListener },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client)
