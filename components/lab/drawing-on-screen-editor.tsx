'use client'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { VideoCallFrame } from '@/components/lab/video-call-frame'

export function DrawingOnScreenEditor({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex h-full w-full flex-col', className)}>
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
    </div>
  )
}
