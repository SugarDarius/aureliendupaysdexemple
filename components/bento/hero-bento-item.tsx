'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { useUserAgent } from '@/hooks/use-user-agent'

import { ReactIcon } from '@/components/icons/react-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'

import { VFXWavingHand } from '@/components/ui-vfx/vfx-waving-hand'
import { VFXPresenceSurface } from '@/components/ui-vfx/vfx-presence-surface'

import { LiveblocksLogoIcon } from '@/components/icons/liveblocks-logo-icon'

import { BentoCard } from '@/components/grids/bento-card'
import { TagLink } from '@/components/content/tag-link'

const TagPill = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <span
    className={cn(
      'inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100',
      className
    )}
  >
    {children}
  </span>
)

export function HeroBentoItem() {
  const { isMobile } = useUserAgent()
  return (
    <BentoCard
      className='col-span-3 row-span-1 max-lg:min-h-[220px] max-md:min-h-[200px] max-sm:col-span-2'
      variant='grid'
    >
      <VFXPresenceSurface disabled={isMobile}>
        <div className='relative flex h-full w-full flex-col'>
          <div className='flex h-full flex-col p-4 max-sm:p-3'>
            <div className='flex flex-none flex-row items-center justify-between'>
              <h1 className='text-2xl font-semibold tracking-tighter max-sm:text-base'>
                Hey, I&apos;m{' '}
                <span className='bg-linear-to-r from-orange-500 to-purple-500 bg-clip-text font-bold text-transparent dark:from-amber-500 dark:to-pink-500'>
                  Aurélien Dupays Dexemple
                </span>{' '}
                <VFXWavingHand />
              </h1>
              <Image
                src='/medias/images/aureliendupaysdexemple-logo.webp'
                width={24}
                height={24}
                alt='logo'
                priority
              />
            </div>
            <div className='flex flex-auto' />
            <div className='flex flex-none flex-col gap-4 max-sm:gap-3 max-sm:text-sm'>
              <p>
                A creative software engineer from 🌲 🇫🇷 crafting interfaces and
                products <br className='max-md:hidden' />
                with{' '}
                <TagLink href='https://react.dev/' className='cursor-none'>
                  <ReactIcon className='mr-1 inline-flex h-3 w-3' />
                  React
                </TagLink>{' '}
                and{' '}
                <TagLink href='https://nextjs.org/' className='cursor-none'>
                  <NextJSSquareIcon className='mr-1 inline-flex h-3 w-3' />
                  Next.js
                </TagLink>{' '}
                <span className='mt-0 inline-flex items-center max-sm:mt-1 max-sm:flex'>
                  <span className='max-md:hidden'>-&nbsp;</span> Currently at
                  <TagLink
                    href='https://liveblocks.io/'
                    className='mx-1.5 cursor-none'
                  >
                    <LiveblocksLogoIcon className='mr-1 inline-flex size-3' />
                    Liveblocks
                  </TagLink>
                  🚀
                </span>
              </p>
              <div className='flex flex-row items-end justify-between gap-2 max-sm:items-center'>
                <div className='flex flex-auto flex-row items-center gap-1.5'>
                  <TagPill>frontend cloud 🧑🏻‍💻</TagPill>
                  <TagPill>remote club 🌎</TagPill>
                </div>
                <div className='flex flex-none flex-row items-center'>
                  <span className='text-[10px] leading-[10px]'>
                    &copy; 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VFXPresenceSurface>
    </BentoCard>
  )
}
