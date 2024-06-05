'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { RoomProvider } from '@/liveblocks.config'

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
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<SuspenseFallback />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
