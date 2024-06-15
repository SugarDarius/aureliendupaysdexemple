'use client'

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'

import { env } from '@/config/env'

const SuspenseFallback = () => (
  <div className='flex h-full w-full flex-col items-center justify-center'>
    <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-current' />
  </div>
)

export function LiveblocksRoomProvider({
  roomId,
  children,
}: {
  roomId: string
  children?: React.ReactNode
}) {
  return (
    <LiveblocksProvider publicApiKey={env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY}>
      <RoomProvider id={roomId} initialPresence={{ isDrawing: false }}>
        <ClientSideSuspense fallback={<SuspenseFallback />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
