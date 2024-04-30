'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

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
      <div className='relative flex h-full w-full flex-col overflow-hidden'>
        <div
          /* eslint-disable-next-line prettier/prettier */
          className='absolute bottom-0 left-0 right-0 top-0 m-auto h-[86%] w-[86%] bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
        </div>
        <div className='relative z-[2] flex h-full w-full flex-col'>
          {children}
        </div>
      </div>
    </div>
  )
}
