'use client'

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'

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
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
      <RoomProvider id={roomId} initialPresence={{ isDrawing: false }}>
        <ClientSideSuspense fallback={<SuspenseFallback />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
