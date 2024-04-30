import Image from 'next/image'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'

import { BentoCard } from '@/components/grids/bento-card'

export function HeroBentoItem() {
  return (
    <BentoCard
      className='col-span-3 row-span-1 max-sm:col-span-2 max-sm:min-h-[240px]'
      variant='grid'
    >
      <div className='relative flex h-full w-full flex-col'>
        <div className='flex h-full flex-col justify-between p-4'>
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-2xl font-semibold tracking-tighter max-sm:text-lg'>
              Hey, I&apos;m Aurélien Dupays Dexemple 👋
            </h1>
            <Image
              src='/aureliendupaysdexemple-logo.png'
              width={24}
              height={24}
              alt='logo'
              priority
            />
          </div>
          <div className='flex flex-col gap-4'>
            <p>
              A senior and creative software engineer crafting interfaces and
              products with ❤️,{' '}
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
                <NextJSSquareIcon className='mr-1 inline-flex h-3 w-3' />
                Next.js
              </a>
            </p>
            <div className='flex flex-row items-center gap-1.5'>
              <span className='inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'>
                frontend cloud 🧑🏻‍💻
              </span>
              <span className='inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'>
                remote club 🌎
              </span>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
