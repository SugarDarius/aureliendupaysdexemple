import Image from 'next/image'

import { LiveblocksRoomProvider } from '@/components/lab/liveblocks-room-provider'
import { VideoCallFrame } from '@/components/lab/video-call-frame'

const ROOM_ID =
  'aureliendupaysdexemple-lab-liveblocks-drawing-on-screenMIGfMA0GCS-qGSIb3DQEBAQ'

export function DrawingOnScreenFrame() {
  return (
    <LiveblocksRoomProvider roomId={ROOM_ID}>
      <VideoCallFrame className='animate-in fade-in'>
        <div className='relative flex h-full w-full'>
          <Image
            src='/medias/images/share-screen-view.webp'
            fill
            alt='shared screen'
            priority
            sizes='900px'
          />
        </div>
      </VideoCallFrame>
    </LiveblocksRoomProvider>
  )
}
