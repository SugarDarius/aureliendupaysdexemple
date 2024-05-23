'use client'

import { getTimezoneOffset } from '@/lib/clock'
import { useClock } from '@/hooks/use-clock'

const timezoneOffset = getTimezoneOffset()

export function ClockWidget() {
  const [hours, minutes, meridiem] = useClock()

  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='flex w-full flex-auto flex-col items-center justify-center'>
        <span className='text-sm leading-none text-muted-foreground'>
          {meridiem}
        </span>
        <div className='relative flex flex-col items-center font-mono text-[80px] font-extrabold italic leading-[80px] tracking-tighter'>
          <span className='ml-[-40px]'>{hours}</span>
          <span className='mt-[-16px]'>{minutes}</span>
        </div>
        <span className='text-xs leading-none text-muted-foreground'>
          {timezoneOffset}
        </span>
      </div>
    </div>
  )
}
