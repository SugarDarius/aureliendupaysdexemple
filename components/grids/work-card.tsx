import { Fragment } from 'react'

import { BentoCard } from '@/components/grids/bento-card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const WorkCardSeparator = ({ className }: { className?: string }) => (
  <Separator className={cn('w-4! bg-stone-800 dark:bg-stone-500', className)} />
)

export function WorkCard({
  href,
  companyName,
  companyLogo,
  jobTitle,
  startDate,
  endDate,
  children,
}: {
  href?: string
  companyName: string
  companyLogo?: React.ReactNode
  jobTitle: string
  startDate: string
  endDate?: string
  children?: React.ReactNode
}) {
  const AnchorComp = href ? 'a' : Fragment
  const anchorProps = href
    ? {
        'aria-label': companyName,
        className: 'inline-flex underline-offset-2 hover:underline',
        href,
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {}

  return (
    <BentoCard>
      <div className='flex h-full flex-col justify-between gap-6 p-6 max-md:gap-4 max-md:p-4'>
        <div className='flex flex-row items-center justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-2'>
          <div className='flex flex-row items-center gap-2 max-md:flex-col max-md:items-start max-md:gap-0'>
            <div className='flex flex-row items-center gap-2'>
              {companyLogo}
              <AnchorComp {...anchorProps}>
                <h1 className='text-xl font-extrabold tracking-tighter max-md:text-lg'>
                  {companyName}
                </h1>
              </AnchorComp>
            </div>
            <WorkCardSeparator className='max-md:hidden' />
            <span className='text-muted-foreground font-semibold max-md:text-sm'>
              {jobTitle}
            </span>
          </div>
          <div className='flex flex-row items-center gap-2 rounded-full border border-neutral-200 bg-stone-50 px-2.5 py-1 font-mono text-sm text-neutral-900 no-underline max-md:gap-1 max-md:text-xs dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100'>
            {startDate}
            <WorkCardSeparator className='w-2 max-md:w-1' />
            {endDate ?? 'Now'}
          </div>
        </div>
        <div className='flex w-full flex-col'>{children}</div>
      </div>
    </BentoCard>
  )
}
