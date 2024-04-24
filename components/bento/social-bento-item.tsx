import { cva, type VariantProps } from 'class-variance-authority'

import Image from 'next/image'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { BentoCard } from '@/components/grids/bento-card'

const gradientVariants = cva('bg-gradient-to-b', {
  variants: {
    variant: {
      github: 'from-stone-400/75 to-stone-700/75',
      twitter: 'from-sky-200/75 to-sky-500/75',
      linkedin: 'from-blue-200/75 to-blue-500/75',
    },
  },
  defaultVariants: {
    variant: 'github',
  },
})

type SocialBentoItemProps = {
  href: string
  imgSrc: string
  name: 'GitHub' | 'Twitter' | 'LinkedIn'
  accountName: string
  icon: React.ReactNode
  gradientClassName?: string
} & VariantProps<typeof gradientVariants>

export function SocialBentoItem({
  href,
  imgSrc,
  name,
  accountName,
  icon,
  variant,
}: SocialBentoItemProps) {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <div className='relative flex aspect-square flex-col'>
          <div className='absolute left-0 top-0 h-full w-full opacity-60'>
            <Image
              src={imgSrc}
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
          <div
            className={cn(
              'flex size-full flex-col justify-between p-4 text-background backdrop-blur-sm dark:text-foreground',
              gradientVariants({ variant })
            )}
          >
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-xl font-extrabold tracking-tighter'>
                {name}
              </h1>
              {icon}
            </div>
            <div className='flex flex-col'>
              <h1 className='text-md font-bold tracking-tighter'>
                {accountName}
              </h1>
              <div className='flex flex-row items-center gap-1'>
                <p className='text-xs underline'>Check my {name} profile</p>
                <ArrowTopRightOnSquareIcon className='inline-flex h-3.5 w-3.5' />
              </div>
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
