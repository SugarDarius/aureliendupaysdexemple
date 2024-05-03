import Image from 'next/image'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

import { siteConfig } from '@/config/site-config'

import { VFXBorderBeam } from '@/components/ui-vfx/vfx-border-beam'
import { BentoCard } from '@/components/grids/bento-card'
import { TwitterSquareIcon } from '@/components/icons/twitter-square-icon'
import { TwitterPostWidget } from '@/components/widgets/twitter-post-widget'

export function TwitterBentoItem() {
  return (
    <BentoCard className='col-span-1 row-span-1' variant='grid'>
      <a
        href={siteConfig.socialLinks.twitter.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='relative flex aspect-square flex-col'>
          <div className='flex size-full flex-col gap-1 p-4 max-md:p-3'>
            <div className='flex flex-none flex-row items-center justify-between'>
              <div className='gap flex flex-row items-center gap-1.5'>
                <div className='flex h-auto w-auto flex-col max-sm:hidden'>
                  <Image
                    src='/aureliendupaysdexemple-logo.png'
                    width={38}
                    height={38}
                    alt='logo'
                    priority
                  />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-sm font-semibold leading-4 tracking-tighter'>
                    Aurélien
                  </h1>
                  <span className='text-xs text-muted-foreground'>
                    {siteConfig.socialLinks.twitter.name}
                  </span>
                </div>
              </div>
              <TwitterSquareIcon className='size-6' />
            </div>
            <div className='flex w-full flex-auto flex-col gap-4'>
              <TwitterPostWidget />
            </div>
            <div className='relative flex w-full flex-row items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 p-1.5 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 max-md:p-1 max-md:text-[10px]'>
              <span className='text-xs font-semibold'>See my account</span>
              <PaperAirplaneIcon className='size-3' />
              <VFXBorderBeam
                /* eslint-disable-next-line prettier/prettier */
                className='vfx-border-beam-size-[52px] max-md:vfx-border-beam-size-10 vfx-border-beam-duration-[6s] vfx-border-beam-color-from-violet-400 vfx-border-beam-color-to-fuchsia-700 dark:vfx-border-beam-color-from-cyan-300 dark:vfx-border-beam-color-to-sky-600'
              />
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
