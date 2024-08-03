import { LiveblocksRoomProvider } from '@/components/lab/drawing-on-screen/liveblocks-room-provider'
import { DrawingOnScreenEditor } from '@/components/lab//drawing-on-screen/drawing-on-screen-editor'

export function DrawingOnScreenFrame() {
  return (
    <LiveblocksRoomProvider>
      <DrawingOnScreenEditor />
    </LiveblocksRoomProvider>
  )
}
