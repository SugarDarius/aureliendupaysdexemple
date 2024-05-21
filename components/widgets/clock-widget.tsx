'use client'

import { getTimezoneOffset } from '@/lib/clock'
import { useClock } from '@/hooks/use-clock'

const timezoneOffset = getTimezoneOffset()

export function ClockWidget() {
  const [time, meridiem] = useClock()
  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='flex w-full flex-col'>
        <div className='flex w-full flex-row items-center justify-between px-1'>
          <span className='text-sm text-muted-foreground'>{meridiem}</span>
          <span className='text-sm text-muted-foreground'>
            {timezoneOffset}
          </span>
        </div>
        <span className='font-mono text-6xl font-medium max-lg:text-[46px]'>
          {time}
        </span>
      </div>
    </div>
  )
}
