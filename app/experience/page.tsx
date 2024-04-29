import type { Metadata } from 'next'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'

import { Separator } from '@/components/ui/separator'
import { Hero } from '@/components/content/hero'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Check my work experience',
}

export default function ExperiencePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 py-24 max-sm:px-4 min-[1025px]:px-0'>
        <Hero
          title='Experience'
          description='A look at my professional work experience.'
        />
        <Separator />
        <p>
          I love crafting interfaces and products with{' '}
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
          . Here&apos;s a look at my professional work experience.
        </p>
      </div>
    </div>
  )
}
