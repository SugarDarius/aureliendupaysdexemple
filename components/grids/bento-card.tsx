'use client'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { VFXBackgroundDot } from '@/components/ui-vfx/vfx-background-dot'

const bentoCardVariants = cva(
  'relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-stone-50 dark:border-neutral-800 dark:bg-stone-900',
  {
    variants: {
      variant: {
        grid: 'transform-gpu transition-transform duration-150 ease-linear hover:scale-[1.03]',
      },
    },
  }
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
    <div className={cn(bentoCardVariants({ variant, className }))}>
      <div className='relative flex size-full flex-col overflow-hidden'>
        <VFXBackgroundDot />
        <div className='relative z-[2] flex size-full flex-col'>{children}</div>
      </div>
    </div>
  )
}
