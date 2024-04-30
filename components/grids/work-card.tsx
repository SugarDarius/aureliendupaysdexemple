import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { BentoCard } from '@/components/grids/bento-card'

const WorkCardSeparator = ({ className }: { className?: string }) => (
  <Separator className={cn('w-4 bg-stone-800 dark:bg-stone-500', className)} />
)

export function WorkCard({
  href,
  companyName,
  jobTitle,
  startDate,
  endDate,
  children,
}: {
  href?: string
  companyName: string
  jobTitle: string
  startDate: string
  endDate?: string
  children?: React.ReactNode
}) {
  const AnchorComp = href ? 'a' : Fragment
  const anchorProps = href
    ? {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'inline-flex underline-offset-2 hover:underline',
      }
    : {}

  return (
    <BentoCard>
      <div className='flex h-full flex-col justify-between gap-6 p-6 max-sm:gap-4 max-sm:p-4'>
        <div className='flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:justify-start max-sm:gap-1'>
          <div className='flex flex-row items-center gap-2 max-sm:gap-1'>
            <AnchorComp {...anchorProps}>
              <h1 className='text-xl font-extrabold tracking-tighter max-sm:text-lg'>
                {companyName}
              </h1>
            </AnchorComp>
            <WorkCardSeparator className='max-sm:w-3' />
            <span className='font-semibold text-muted-foreground max-sm:text-sm'>
              {jobTitle}
            </span>
          </div>
          <div className='flex flex-row items-center gap-2 rounded-full border border-neutral-200 bg-stone-50 px-2.5 py-1 font-mono text-sm text-neutral-900 no-underline dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100 max-sm:gap-1 max-sm:text-xs'>
            {startDate}
            {endDate ? (
              <>
                <WorkCardSeparator className='max-sm:w-3' />
                {endDate}
              </>
            ) : null}
          </div>
        </div>
        <div className='flex w-full flex-col'>{children}</div>
      </div>
    </BentoCard>
  )
}
