import { labsConfig } from '@/config/labs-config'

import { LiveblocksRoomProvider } from '@/components/lab/liveblocks-room-provider'
import { DrawingOnScreenEditor } from '@/components/lab/drawing-on-screen-editor'

export function DrawingOnScreenFrame() {
  return (
    <LiveblocksRoomProvider
      roomId={labsConfig.liveblocksDrawingOnScreen.roomId}
    >
      <DrawingOnScreenEditor />
    </LiveblocksRoomProvider>
  )
}
