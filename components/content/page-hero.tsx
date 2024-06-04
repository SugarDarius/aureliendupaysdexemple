'use client'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { VFXBackgroundRetroGrid } from '@/components/ui-vfx/vfx-background-retro-grid'

const variants = cva(
  'bg-clip-text text-6xl font-extrabold tracking-tighter text-transparent opacity-75',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-sky-200 to-sky-500',
        mdx: 'bg-gradient-to-r from-indigo-400 to-cyan-400 max-lg:text-4xl',
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
        <h1 className={cn(variants({ variant }))}>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}
