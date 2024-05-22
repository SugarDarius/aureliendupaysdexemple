'use client'

import { getTimezoneOffset } from '@/lib/clock'
import { useClock } from '@/hooks/use-clock'

const timezoneOffset = getTimezoneOffset()

export function ClockWidget() {
  const [time, meridiem] = useClock()

  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='relative flex w-full flex-col gap-1'>
        <div className='flex w-full flex-row items-center justify-between px-1 text-sm leading-none text-muted-foreground'>
          <span>{meridiem}</span>
          <span>{timezoneOffset}</span>
        </div>
        <div className='flex w-full flex-col items-end'>
          <span className='font-mono text-[62px] font-medium leading-[60px] max-md:text-[46px] max-md:leading-[48px]'>
            {time}
          </span>
        </div>
      </div>
    </div>
  )
}
