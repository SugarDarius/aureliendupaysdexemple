import Image from 'next/image'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

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
        <div className='group relative flex aspect-square h-full w-full flex-col'>
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
          <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-end bg-stone-900/65 p-4 opacity-0 transition-opacity duration-150 ease-linear group-hover:opacity-100'>
            <h1 className='text-md font-bold tracking-tighter text-background dark:text-foreground'>
              SugarDarius
            </h1>
            <div className='flex flex-row items-center gap-1 text-background dark:text-foreground'>
              <p className='text-xs underline'>Check my GitHub profile</p>
              <ArrowTopRightOnSquareIcon className='inline-flex h-3.5 w-3.5' />
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
