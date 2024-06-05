import { env } from '@/config/env'

import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

const client = createClient({
  publicApiKey: env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
})

// eslint-disable-next-line @typescript-eslint/ban-types
type Presence = {}
// eslint-disable-next-line @typescript-eslint/ban-types
type Storage = {}
// eslint-disable-next-line @typescript-eslint/ban-types
type UserMeta = {}
// eslint-disable-next-line @typescript-eslint/ban-types
type RoomEvent = {}

export const {
  suspense: { RoomProvider },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client)
