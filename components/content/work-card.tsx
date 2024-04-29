import { Fragment } from 'react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Separator } from '@/components/ui/separator'

const WorkCardSeparator = () => (
  <Separator className='w-4 bg-stone-800 dark:bg-stone-500' />
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
      <div className='relative flex h-full w-full flex-col overflow-hidden'>
        <div
          /* eslint-disable-next-line prettier/prettier */
          className='absolute bottom-0 left-0 right-0 top-0 -z-10 m-auto h-[86%] w-[86%] bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
        </div>
        <div className='flex h-full flex-col justify-between gap-6 p-6'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <AnchorComp {...anchorProps}>
                <h1 className='text-xl font-extrabold tracking-tighter'>
                  {companyName}
                </h1>
              </AnchorComp>
              <WorkCardSeparator />
              <span>{jobTitle}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <CalendarDaysIcon className='size-6' />
              <span>{startDate}</span>
              {endDate ? (
                <>
                  <WorkCardSeparator />
                  <span>{endDate}</span>
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
