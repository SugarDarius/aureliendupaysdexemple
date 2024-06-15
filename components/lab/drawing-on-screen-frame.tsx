import { LiveblocksRoomProvider } from '@/components/lab/liveblocks-room-provider'
import { DrawingOnScreenEditor } from '@/components/lab/drawing-on-screen-editor'

const ROOM_ID =
  'aureliendupaysdexemple-lab-liveblocks-drawing-on-screen-MIGfMA0GCS-qGSIb3DQEBAQ'

export function DrawingOnScreenFrame() {
  return (
    <LiveblocksRoomProvider roomId={ROOM_ID}>
      <DrawingOnScreenEditor />
    </LiveblocksRoomProvider>
  )
}
