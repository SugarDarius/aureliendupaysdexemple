import { Fragment } from 'react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

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
    <div className='flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-stone-50 dark:border-neutral-800 dark:bg-stone-900'>
      <div className='relative flex flex-col overflow-hidden'>
        <div
          /* eslint-disable-next-line prettier/prettier */
          className='absolute bottom-0 left-0 right-0 top-0 m-auto h-[86%] w-[86%] bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
        </div>
        <div className='z-10 flex h-full flex-col justify-between gap-6 p-6 max-sm:gap-3 max-sm:p-2'>
          <div className='flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:justify-start max-sm:gap-1'>
            <div className='flex flex-row items-center gap-2 max-sm:gap-1'>
              <AnchorComp {...anchorProps}>
                <h1 className='text-xl font-extrabold tracking-tighter max-sm:text-lg'>
                  {companyName}
                </h1>
              </AnchorComp>
              <WorkCardSeparator className='max-sm:w-3' />
              <span className='text-muted-foreground max-sm:text-sm'>
                {jobTitle}
              </span>
            </div>
            <div className='flex flex-row items-center gap-2 max-sm:gap-1'>
              <CalendarDaysIcon className='size-6 max-sm:size-4' />
              <span className='max-sm:text-xs'>{startDate}</span>
              {endDate ? (
                <>
                  <WorkCardSeparator className='max-sm:w-3' />
                  <span className='max-sm:text-xs'>{endDate}</span>
                </>
              ) : null}
            </div>
          </div>
          <div className='flex w-full flex-col'>{children}</div>
        </div>
      </div>
    </div>
  )
}
