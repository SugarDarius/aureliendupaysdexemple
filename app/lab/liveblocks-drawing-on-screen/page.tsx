import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { WindowFrame } from '@/components/lab/window-frame'
import {
  LabPage,
  LabPageContent,
  LabPageHeader,
} from '@/components/content/lab-page'
import { VideoCallFrame } from '@/components/lab/video-call-frame'
import { PageHero } from '@/components/content/page-hero'

export default function LiveblocksDrawingOnScreenPage() {
  return (
    <LabPage>
      <LabPageContent>
        <LabPageHeader className='flex-none'>
          <PageHero
            title='Liveblocks drawing on screen'
            description='A lab experiment to draw on screen using liveblocks.io'
          />
        </LabPageHeader>
        <div className='flex w-full flex-auto flex-col items-center'>
          <WindowFrame
            title='Drawing on screen'
            className='h-full w-full max-w-5xl'
          >
            <div className='flex h-full w-full flex-col overflow-hidden'>
              <VideoCallFrame></VideoCallFrame>
            </div>
          </WindowFrame>
        </div>
        <div className='flex w-full flex-none flex-row items-center justify-center gap-2'>
          <SparklesIcon className='size-4 stroke-[1.5px]' />
          <span className='text-sm'>
            Open this url in another window on the side to see the magic
          </span>
        </div>
      </LabPageContent>
    </LabPage>
  )
}
