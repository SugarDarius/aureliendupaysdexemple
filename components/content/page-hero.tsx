'use client'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { VFXBackgroundRetroGrid } from '@/components/ui-vfx/vfx-background-retro-grid'

const variants = cva(
  'bg-clip-text py-0.5 text-6xl font-extrabold tracking-tighter text-transparent opacity-75 selection:bg-violet-400/50 dark:selection:bg-violet-700/50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-sky-200 to-sky-500',
        mdx: 'f bg-gradient-to-r from-orange-500 to-purple-500 dark:from-amber-500 dark:to-pink-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type PageHeroProps = {
  title: string
  description: string
  className?: string
} & VariantProps<typeof variants>

export function PageHero({
  title,
  description,
  className,
  variant,
}: PageHeroProps) {
  return (
    <div className={cn('relative flex w-full flex-col', className)}>
      <VFXBackgroundRetroGrid />
      <div className='z-[2] flex w-full flex-col gap-1'>
        <h1 className={cn(variants({ variant }), 'w-fit')}>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}
