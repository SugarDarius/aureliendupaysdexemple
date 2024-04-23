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
          <div className='relative flex aspect-square h-full w-full flex-col'>
            <div className='absolute left-0 top-0 h-full w-full'>
              <Image
                src='/aureliendupaysdexemple-logo.png'
                fill
                alt='logo'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
                sizes='720px'
              />
            </div>
          </div>
        </BentoCard>
        <BentoCard className='col-span-3 row-span-1'>
          <div className='relative flex h-full w-full flex-col overflow-hidden'>
            <div className='absolute left-0 top-0 h-full w-full opacity-60'>
              <Image
                src='/mountains.jpg'
                fill
                alt='tokyo'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
                sizes='200px'
              />
            </div>
            <div className='flex h-full flex-col justify-between p-4 backdrop-blur-md'>
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
                    className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
                  >
                    <ReactIcon className='mr-1 inline-flex h-3 w-3' />
                    React
                  </a>{' '}
                  and{' '}
                  <a
                    href='https://nextjs.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
                  >
                    <NextJSIcon className='mr-1 inline-flex h-3 w-3' />
                    Next.js
                  </a>
                  .
                </p>
                <div className='flex flex-row items-center gap-2'>
                  <span className='inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background'>
                    frontend cloud 🧑🏻‍💻
                  </span>
                  <span className='inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background'>
                    remote club 🌎
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  )
}
