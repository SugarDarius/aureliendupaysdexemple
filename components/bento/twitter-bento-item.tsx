import Image from 'next/image'

import { siteConfig } from '@/config/site-config'
import { TwitterSquareIcon } from '@/components/icons/twitter-square-icon'
import { BentoCard } from '@/components/grids/bento-card'

export function TwitterBentoItem() {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a
        href={siteConfig.socialLinks.twitter.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='group relative flex aspect-square size-full flex-col'>
          <div className='absolute left-0 top-0 h-full w-full opacity-60'>
            <Image
              src='/tokyo.jpg'
              fill
              alt='logo'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                scale: 2,
              }}
              priority
              sizes='720px'
            />
          </div>
          <div className='flex size-full flex-col justify-between bg-gradient-to-b from-sky-200/75 to-sky-500/75 p-4 text-background backdrop-blur-sm dark:text-foreground'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-xl font-extrabold tracking-tighter'>
                Twitter (X)
              </h1>
              <TwitterSquareIcon className='size-6' />
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
