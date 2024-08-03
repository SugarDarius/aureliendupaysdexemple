import { SparklesIcon } from '@/components/icons/sparkles-icon'
import {
  LabPage,
  LabPageContent,
  LabPageHeader,
} from '@/components/content/lab-page'
import { PageHero } from '@/components/content/page-hero'

import { WindowFrame } from '@/components/lab/window-frame'
import { DrawingOnScreenFrame } from '@/components/lab/drawing-on-screen/drawing-on-screen-frame'

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
              <DrawingOnScreenFrame />
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
