import Image from 'next/image'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { siteConfig } from '@/config/site-config'
import { LinkedInSquareIcon } from '@/components/icons/linkedin-square-icon'
import { BentoCard } from '@/components/grids/bento-card'

export function LinkedInBentoItem() {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a
        href={siteConfig.socialLinks.linkedin.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='relative flex aspect-square size-full flex-col'>
          <div className='absolute left-0 top-0 h-full w-full opacity-60'>
            <Image
              src='/forest.jpg'
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
          <div className='flex size-full flex-col justify-between bg-gradient-to-b from-blue-200/75 to-blue-500/75 p-4 text-background backdrop-blur-sm dark:text-foreground'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-xl font-extrabold tracking-tighter'>
                LinkedIn
              </h1>
              <LinkedInSquareIcon className='size-6' />
            </div>
            <div className='flex flex-col'>
              <h1 className='text-md font-bold tracking-tighter'>Aurélien</h1>
              <div className='flex flex-row items-center gap-1'>
                <p className='text-xs underline'>Check my LinkedIn profile</p>
                <ArrowTopRightOnSquareIcon className='inline-flex h-3.5 w-3.5' />
              </div>
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
