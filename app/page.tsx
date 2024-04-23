import Image from 'next/image'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSIcon } from '@/components/icons/nextjs-icon'

import { BentoGrid } from '@/components/grids/bento-grid'
import { BentoCard } from '@/components/grids/bento-card'

export default function HomePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <BentoGrid>
        <BentoCard className='col-span-1 row-span-1'>
          <div className='flex h-full w-full flex-col items-center justify-center gap-2 p-4'>
            <Image
              src='/aureliendupaysdexemple-logo.png'
              width={160}
              height={160}
              alt='logo'
            />
          </div>
        </BentoCard>
        <BentoCard className='col-span-3 row-span-1'>
          <div className='relative flex h-full w-full flex-col justify-between p-4'>
            <h1 className='text-2xl font-semibold tracking-tighter'>
              Hey, I&apos;m Aurélien Dupays Dexemple 👋
            </h1>
            <div className='flex flex-col gap-2.5'>
              <p>
                I&apos;m a senior frontend and creative software engineer
                crafting interfaces and products with{' '}
                <a
                  href='https://react.dev/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
                >
                  <ReactIcon className='mr-1 inline-flex h-3 w-3' />
                  React
                </a>{' '}
                and{' '}
                <a
                  href='https://nextjs.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
                >
                  <NextJSIcon className='mr-1 inline-flex h-3 w-3' />
                  Next.js
                </a>
                .
              </p>
              <div className='flex flex-row items-center gap-2'>
                <span className='inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background'>
                  frontend cloud
                </span>
                <span className='inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background'>
                  remote club
                </span>
              </div>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  )
}
