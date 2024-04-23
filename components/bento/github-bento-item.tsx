import Image from 'next/image'

import { siteConfig } from '@/config/site-config'
import { BentoCard } from '@/components/grids/bento-card'

export function GitHubBentoItem() {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a
        href={siteConfig.socialLinks.github.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='relative flex aspect-square h-full w-full flex-col'>
          <div className='absolute left-0 top-0 h-full w-full opacity-60'>
            <Image
              src='/aureliendupaysdexemple-logo.png'
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
          <div className='flex h-full w-full flex-col items-center justify-center backdrop-blur-md'>
            <Image
              src='/aureliendupaysdexemple-logo.png'
              width={160}
              height={160}
              alt='logo'
              priority
            />
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
