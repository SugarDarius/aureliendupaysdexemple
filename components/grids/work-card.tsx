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
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'inline-flex underline-offset-2 hover:underline',
        'aria-label': companyName,
      }
    : {}

  return (
    <BentoCard>
      <div className='flex h-full flex-col justify-between gap-6 p-6 max-md:gap-4 max-md:p-4'>
        <div className='flex flex-row items-center justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-2'>
          <div className='flex flex-row items-center gap-2 max-md:flex-col max-md:items-start max-md:gap-0'>
            <div className='flex flex-row items-center gap-2'>
              {companyLogo ? companyLogo : null}
              <AnchorComp {...anchorProps}>
                <h1 className='text-xl font-extrabold tracking-tighter max-md:text-lg'>
                  {companyName}
                </h1>
              </AnchorComp>
            </div>
            <WorkCardSeparator className='max-md:hidden' />
            <span className='font-semibold text-muted-foreground max-md:text-sm'>
              {jobTitle}
            </span>
          </div>
          <div className='flex flex-row items-center gap-2 rounded-full border border-neutral-200 bg-stone-50 px-2.5 py-1 font-mono text-sm text-neutral-900 no-underline dark:border-neutral-700 dark:bg-stone-800 dark:text-neutral-100 max-md:gap-1 max-md:text-xs'>
            {startDate}
            {endDate ? (
              <>
                <WorkCardSeparator className='w-2 max-md:w-1' />
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
