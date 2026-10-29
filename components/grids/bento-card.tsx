'use client'

import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bentoCardVariants = cva(
  'group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-stone-200/80 bg-white/80 shadow-[0_12px_45px_-28px_rgba(28,25,23,0.35)] backdrop-blur-sm transition-colors dark:border-stone-800/80 dark:bg-stone-950/70',
  {
    variants: {
      variant: {
        grid: 'transform-gpu transition-transform duration-150 ease-linear hover:scale-[1.03]',
      },
    },
  },
)

type BentoCardProps = {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof bentoCardVariants>

export function BentoCard({
  variant,
  className = '',
  children,
}: BentoCardProps) {
  return (
    <div className={cn(bentoCardVariants({ className, variant }))}>
      <div className='relative flex size-full flex-col overflow-hidden'>
        <div className='relative z-2 flex size-full flex-col'>{children}</div>
      </div>
    </div>
  )
}
