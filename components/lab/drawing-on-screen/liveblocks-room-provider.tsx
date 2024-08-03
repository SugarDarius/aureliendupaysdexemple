'use client'

import { ClientSideSuspense } from '@liveblocks/react/suspense'

import { labsConfig } from '@/config/labs-config'
import {
  LiveblocksProvider,
  RoomProvider,
} from '@/components/lab/drawing-on-screen/liveblocks.config'

const useRoomId = (): string => {
  return labsConfig.liveblocksDrawingOnScreen.roomId
}

const SuspenseFallback = () => (
  <div className='flex h-full w-full flex-col items-center justify-center'>
    <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-current' />
  </div>
)

export function LiveblocksRoomProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const roomId = useRoomId()
  return (
    <LiveblocksProvider>
      <RoomProvider id={roomId} initialPresence={{ isDrawing: false }}>
        <ClientSideSuspense fallback={<SuspenseFallback />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
